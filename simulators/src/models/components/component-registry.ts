import { ComponentType, Component } from "./component"

export interface ReadableComponentRegistry {
    get<T extends Component>(componentType: ComponentType): T | null
    getOrThrow<T extends Component>(componentType: ComponentType): T
}

export interface WritableComponentRegistry extends ReadableComponentRegistry {
    set(component: Component): void
}

export class ComponentRegistry implements WritableComponentRegistry {
    private readonly map: Map<ComponentType, Component> = new Map()

    set(component: Component): void {
        this.map.set(component.componentType, component)
    }
    get<T>(componentType: ComponentType): T | null {
        return this.map.get(componentType) as T ?? null
    }
    getOrThrow<T extends Component>(componentType: ComponentType): T {
        const component = this.get<T>(componentType)
        if(!component) {
            throw Error(`component of type ${componentType} is not registered`)
        }
        return component
    }
}