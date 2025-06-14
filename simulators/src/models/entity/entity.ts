import { ComponentRegistry, ComponentType, Module, ModuleComponent, ReadableComponentRegistry, WritableComponentRegistry } from "../components";
import { v4 as uuidv4 } from 'uuid';
import { EffectsComponent } from "../components/effects-component";
import { Effect } from "../effects";

export type EntityId = string

export interface Entity {
    components: ReadableComponentRegistry
    name: string
    id: EntityId
    prettyName: string
}


export abstract class AbstractEntity implements Entity {
    public abstract readonly name: string
    protected readonly _components: WritableComponentRegistry = new ComponentRegistry()
    public readonly id: string = uuidv4()
    constructor() {}

    public get components(): ReadableComponentRegistry {
        return this._components
    }

    public get modules(): Module[] {
        const moduleComponent = this.components.get(ComponentType.MODULE_CONTAINER)
        if (moduleComponent instanceof ModuleComponent) {
            return moduleComponent.modules
        } else {
            console.warn("attempting to retrieve modules from an entity that contains no module component")
            return []
        }
    }

    public get effects(): readonly Effect[] {
        const effectComponent = this.components.get(ComponentType.EFFECTS_CONTAINER)
        if (effectComponent instanceof EffectsComponent) {
            return effectComponent.effects
        } else {
            console.warn("attempting to retrieve effects from an entity that contains no effect component")
            return []
        }
    }

    public get prettyName(): string {
        return `${this.name}:${this.id}`
    }
}