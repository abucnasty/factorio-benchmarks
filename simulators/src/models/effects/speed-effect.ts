export class SpeedEffect {

    public static fromPercent(speedPercent: number) {
        return new SpeedEffect(speedPercent / 100)
    }

    public static fromDecimal(speed: number) {
        return new SpeedEffect(speed)
    }

    constructor(public readonly speed: number) {}
}