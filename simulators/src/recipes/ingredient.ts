import { QualityLevel } from "../models/quality"
import { Item } from "./item"

export interface Ingredient {
    item: Item
    quantity: number
}