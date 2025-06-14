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
                console.warn(`no producer output found in ${producer.prettyName}`)
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

    

    computeInputRate(entity: Entity): InputRate[] {
        const inputComponent = entity.components.getOrThrow<ItemInputComponent>(ComponentType.ITEM_INPUT)
        const effectsComponent = entity.components.getOrThrow<EffectsComponent>(ComponentType.EFFECTS_CONTAINER)
        const compositeEffect = CompositeEffect.fromEffects(effectsComponent.effects)

        return inputComponent.inputRates.map(inputRate => inputRate.copy({
            quantity: inputRate.quantity + inputRate.quantity * compositeEffect.speed
        }))
    }

    recycleFromProducerUntil(producer: Entity, recycler: Recycler, item: Item, qualityLevel: QualityLevel, quantity: number): {
        outputRate: OutputRate,
        passes: number
    } {

        const producerOutputRates = this.computeOutputRate(producer)
        const producerOutputRate = producerOutputRates.find(rate => rate.item.name == item.name)
        if (!producerOutputRate) {
            throw Error(`producer ${producer.prettyName} does not have an output for item ${item.name}`)
        }

        const recyclerInputRate = this.computeInputRate(recycler).find(rate => rate.item.name == item.name)
        const recyclerOutputRate = this.computeOutputRate(recycler).find(rate => rate.item.name == item.name)

        if (!recyclerInputRate || !recyclerOutputRate) {
            throw Error(`recycler ${producer.prettyName} does not have an input or output for item ${item.name}`)
        }

        const outputItemRate = producerOutputRate.rateMap[qualityLevel]

        const shadowRecycler = recycler.clone()
        // throttle recycler if it can go faster than the output of the producer entity
        const throttledRate = recyclerInputRate.rate / outputItemRate.rate
        if (recyclerInputRate.rate > outputItemRate.rate) {
            shadowRecycler.throttleByDivisor(throttledRate)
        }

        const recyclerOutputTransformer = shadowRecycler.components.getOrThrow<OutputTransformerComponent>(ComponentType.OUTPUT_TRANSFORMER)

        const recycledPass = this.computeOutputRate(shadowRecycler)

        return {
            outputRate: {} as any,
            passes: 0
        }
    }

    recycleSpecifQualityUntil(recycler: Recycler, outputRate: OutputRate, qualityLevel: QualityLevel, passes: number = 0): ItemRateMap {
        throw Error("notimplemented")
        // const baseItemRateMap = outputRate.rateMap
        // const item = outputRate.item

        // const outputItemRate = baseItemRateMap[qualityLevel]
        // const rateMapRemainder = ItemRateMapFactory.removeQualityLevel(baseItemRateMap, qualityLevel)

        // const baseRecyclerInputRate = this.computeInputRate(recycler).find(rate => rate.item.name == item.name)
        // const baseRecyclerOutputRate = this.computeOutputRate(recycler).find(rate => rate.item.name == item.name)
        // if (!baseRecyclerInputRate || !baseRecyclerOutputRate) {
        //     throw Error(`input recycler ${recycler.prettyName} does not have an input or output for item ${item.name}`)
        // }

        // const shadowRecycler = recycler.clone()

        // // throttle recycler if it can go faster than the output of the producer entity
        // const throttledRate = baseRecyclerInputRate.rate / outputItemRate.rate
        // if (baseRecyclerInputRate.rate > outputItemRate.rate) {
        //     shadowRecycler.throttleByDivisor(throttledRate)
        // }

        // const recycledOutputRate = this.computeOutputRate(shadowRecycler)[0]

        // const compositeRateMap = ItemRateMapFactory.add(
        //     rateMapRemainder,
        //     recycledOutputRate.rateMap,
        // )

        // // const newOutputRate: OutputRate = {
        // //     item,
        // //     rateMap
        // // }


        // // if (compositeRateMap[qualityLevel].rate > 1) {
        // //     return recycleSpecifQualityUntil(
        // //         recycler, 
        // //     )
        // // }
    }
}