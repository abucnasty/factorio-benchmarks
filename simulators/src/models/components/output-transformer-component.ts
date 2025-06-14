import { cloneDeep } from "lodash";
import { ItemRateTransformer } from "../crafting/transformers/item-rate-transformer";
import { Component, ComponentType } from "./component";
import { ItemOutputComponent } from "./item-output-component";
import { ItemRate, OutputRate } from "../crafting";
import { QualityRecipe } from "../../recipes";

export class OutputTransformerComponent extends Component {
    componentType: ComponentType = ComponentType.OUTPUT_TRANSFORMER


    constructor(
        public readonly qualityRecipe: QualityRecipe,
        public readonly transformer: ItemRateTransformer
    ) {
        super()
    }

    transformOutputComponent = (outputRates: OutputRate[]): OutputRate[] => {
        return outputRates.map(outputRate => this.transformItemOutput(outputRate))
    }


    private transformItemOutput(outputRate: OutputRate): OutputRate {
        const rateMap = outputRate.rateMap
        const itemRate = rateMap[this.qualityRecipe.qualityLevel]
        return this.transformer.transform(itemRate)
    }

    clone(): OutputTransformerComponent {
        return new OutputTransformerComponent(this.qualityRecipe, this.transformer)
    }
}