export class ProductivityEffect {

    public static fromPercent(productivityPercent: number): ProductivityEffect {
        return new ProductivityEffect(productivityPercent / 100)
    }

    public static fromDecimal(productivity: number): ProductivityEffect {
        return new ProductivityEffect(productivity)
    }

    constructor(public readonly productivity: number) {}
}