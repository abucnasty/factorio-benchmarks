import { Module } from "../../components"
import { SpeedEffect, ProductivityEffect, QualityEffect, CompositeEffect, Effect } from "../../effects"
import { CompositeEffectItemRateTransformer } from "./composite-effect-item-rate-transformer"
import { CompositeOutputRateTransformer } from "./composite-output-rate-transformer"
import { ItemRateTransformer } from "./item-rate-transformer"
import { OutputRateTransformer } from "./output-rate-transformer"
import { ProductivityEffectItemRateTransformer } from "./productivity-effect-item-rate-transformer"
import { QualityEffectItemRateTransformer } from "./quality-effect-item-rate-transformer"
import { RecyclerItemRateTransformer } from "./recycler-item-rate-transformer"
import { SpeedEffectOutputRateTransformer } from "./speed-effect-output-rate-transformer"
import { ThrottledItemRateTransformer } from "./throttled-item-rate-transformer"

export class ItemRateTransformerFactory {
    static speed(effect: SpeedEffect): OutputRateTransformer {
        return new SpeedEffectOutputRateTransformer(effect)
    }

    static productivity(effect: ProductivityEffect): OutputRateTransformer {
        return new ProductivityEffectItemRateTransformer(effect)
    }

    static quality(effect: QualityEffect): ItemRateTransformer {
        return new QualityEffectItemRateTransformer(effect)
    }

    static recycler(): ItemRateTransformer {
        return new RecyclerItemRateTransformer()
    }

    static fromCompositeEffect(compositeEffect: CompositeEffect): ItemRateTransformer {
        return new CompositeEffectItemRateTransformer(compositeEffect)
    }

    static throttle(transformer: ItemRateTransformer, divisor: number): ItemRateTransformer {
        return new ThrottledItemRateTransformer(transformer, divisor)
    }

    static compositeOutput(transformers: OutputRateTransformer[]): OutputRateTransformer {
        return new CompositeOutputRateTransformer(transformers)
    }
}