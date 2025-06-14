export class QualityEffect {

    public static fromPercent(qualityPercent: number): QualityEffect {
        return new QualityEffect(qualityPercent / 100)
    }

    public static fromDecimal(quality: number): QualityEffect {
        return new QualityEffect(quality)
    }

    constructor(public readonly quality: number) {}
}