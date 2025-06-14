import { Effect } from "../effects";
import { Component, ComponentType } from "./component";

export class EffectsComponent extends Component {
    
    public static fromEffects(effects: Effect[]) {
        return new EffectsComponent(effects)
    }
    
    public readonly componentType: ComponentType = ComponentType.EFFECTS_CONTAINER

    constructor(public effects: readonly Effect[]) {
        super()
    }

    public addEffect(effect: Effect): void {
        this.effects = [...this.effects, effect]
    }

    public removeEffect(effect: Effect): void {
        this.effects = this.effects.filter(it => it != effect)
    }

    clone(): EffectsComponent {
        return new EffectsComponent(this.effects)
    }
}