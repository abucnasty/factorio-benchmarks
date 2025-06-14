import { QualityLevel } from "../../quality";
import { ItemRate } from "../item-rate";
import { AbstractItemRateTransformer } from "./abstract-item-rate-transformer";

export class RecyclerItemRateTransformer extends AbstractItemRateTransformer {
    transformer = (_: QualityLevel, itemRate: ItemRate): ItemRate => {
        return itemRate.copy({
            quantity: itemRate.quantity * 0.25
        })
    }
}