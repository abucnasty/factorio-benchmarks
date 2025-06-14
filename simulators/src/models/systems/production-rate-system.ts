import { cloneDeep } from "lodash";
import { Item } from "../../recipes";
import { ComponentType, ItemInputComponent, ItemOutputComponent, OutputTransformerComponent } from "../components";
import { EffectsComponent } from "../components/effects-component";
import { InputRate, ItemRate, ItemRateMap, ItemRateMapFactory, OutputRate } from "../crafting";
import { ItemRateTransformer } from "../crafting/transformers/item-rate-transformer";
import { CompositeEffect } from "../effects";
import { Entity, EntityId } from "../entity";
import { Recycler } from "../entity/recycler";
import { QualityLevel } from "../quality";


export interface EntityLink {
    entity: EntityId
}


export class ProductionRateSystem {
    computeOutputRate(entity: Entity): OutputRate[] {        
        const outputComponent = entity.components.getOrThrow<ItemOutputComponent>(ComponentType.ITEM_OUTPUT)
        const outputTransformerComponent = entity.components.getOrThrow<OutputTransformerComponent>(ComponentType.OUTPUT_TRANSFORMER)

        return outputTransformerComponent.transformOutputComponent(outputComponent.outputRates)
    }

    computeThrottledOutputRateForEntities(producer: Entity, receiver: Entity): OutputRate[] {
        const producerOutputRates = this.computeOutputRate(producer)
        const receiverInputRates = this.computeInputRate(receiver)
        const receiverOutputRates = this.computeOutputRate(receiver)

        const matchedInputRate = receiverInputRates.find(inputRate => {
            const producerOutputRate = producerOutputRates.find(outputRate => outputRate.item.name == inputRate.item.name)
            if(!producerOutputRate) {
                return
            }

            const outputItemRate = producerOutputRate.rateMap[inputRate.qualityLevel]
            
            if (outputItemRate.rate > inputRate.rate) {
                console.warn(`output rate ${outputItemRate.rate} is greater than ${inputRate.rate}`)
                return
            }

            return inputRate
        })

        if(!matchedInputRate) {
            throw Error(`IO mismatch on producer ${producer.prettyName} -> ${receiver.prettyName}`)
        }

        const producerOutputRate = producerOutputRates.find(outputRate => outputRate.item.name == matchedInputRate.item.name)!!

        const throttleConstant = matchedInputRate.rate / producerOutputRate.rateMap[matchedInputRate.qualityLevel].rate

        return receiverOutputRates.map(outputRate => ({
            item: outputRate.item,
            rateMap: ItemRateMapFactory.divide(outputRate.rateMap, throttleConstant)
        }))
    }

    entitiesRequiredToConsumeInputFrom(item: Item, producer: Entity, receiver: Entity): number {
        const producerOutputRate = this.computeOutputRate(producer).find(it => it.item.name == item.name)
        const receiverInputRate = this.computeInputRate(receiver).find(it => it.item.name == item.name)


        if(!producerOutputRate) {
            throw Error(`no producer output found in ${producer.prettyName} for item ${item.name}`)
        }

        if(!receiverInputRate) {
            throw Error(`no receiver input found in ${producer.prettyName} for item ${item.name}`)
        }

        const inputQualityLevel = receiverInputRate.qualityLevel

        const outputItemRate = producerOutputRate.rateMap[inputQualityLevel]

        if (outputItemRate.rate <= 0) {
            throw Error("output item rate must be greater than 0")
        }

        return Math.min(1, Math.ceil(outputItemRate.rate / receiverInputRate.rate))
    }

    

    computeInputRate(entity: Entity): InputRate[] {
        const inputComponent = entity.components.getOrThrow<ItemInputComponent>(ComponentType.ITEM_INPUT)
        const effectsComponent = entity.components.getOrThrow<EffectsComponent>(ComponentType.EFFECTS_CONTAINER)
        const compositeEffect = CompositeEffect.fromEffects(effectsComponent.effects)

        return inputComponent.inputRates.map(inputRate => inputRate.copy({
            quantity: inputRate.quantity + inputRate.quantity * compositeEffect.speed
        }))
    }

    recycleFromProducerRecursively(producer: Entity, recycler: Recycler, item: Item, until: number): {
        outputRate: OutputRate,
        passes: number
    } {
        const producerOutputRate = this.computeOutputRate(producer).find(rate => rate.item.name == item.name)
        if (!producerOutputRate) {
            throw Error(`producer ${producer.prettyName} does not have an output for item ${item.name}`)
        }
        return this.recycleSpecificQualityUntil(recycler, producerOutputRate, until)
    }

    recycleSpecificQualityUntil(recycler: Recycler, outputRate: OutputRate, until: number, passes: number = 1): { outputRate: OutputRate, passes: number } {
        
        const item = outputRate.item
        const baseItemRateMap = outputRate.rateMap

        const baseRecyclerInputRate = this.computeInputRate(recycler).find(rate => rate.item.name == item.name)
        const baseRecyclerOutputRate = this.computeOutputRate(recycler).find(rate => rate.item.name == item.name)
        if (!baseRecyclerInputRate || !baseRecyclerOutputRate) {
            throw Error(`input recycler ${recycler.prettyName} does not have an input or output for item ${item.name}`)
        }

        const recyclerInputQualityLevel = baseRecyclerInputRate.qualityLevel
        

        const outputItemRate = baseItemRateMap[recyclerInputQualityLevel]
        const rateMapRemainder = ItemRateMapFactory.removeQualityLevel(baseItemRateMap, recyclerInputQualityLevel)        

        const shadowRecycler = recycler.clone()

        // throttle recycler if it can go faster than the output of the producer entity
        const throttledRate = baseRecyclerInputRate.rate / outputItemRate.rate
        if (baseRecyclerInputRate.rate > outputItemRate.rate) {
            shadowRecycler.throttleByDivisor(throttledRate)
        }

        const recycledOutputRate = this.computeOutputRate(shadowRecycler)[0]

        const mergedRateMap = ItemRateMapFactory.add(
            rateMapRemainder,
            recycledOutputRate.rateMap,
        )

        const mergedOutputRate: OutputRate = {
            item,
            rateMap: mergedRateMap
        }

        if (mergedRateMap[recyclerInputQualityLevel].rate <= until) {
            return {
                outputRate: mergedOutputRate,
                passes
            }
        }
        return this.recycleSpecificQualityUntil(
            recycler, 
            mergedOutputRate,
            until,
            passes+1
        )
        
    }
}