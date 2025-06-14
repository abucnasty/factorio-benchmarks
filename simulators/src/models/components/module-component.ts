import { ModuleMetadata } from "../entity/modules/module"
import { SpeedModule } from "../entity/modules/speed-module"
import { Component, ComponentType } from "./component"
import { EfficiencyModule } from "../entity/modules/efficiency-module"
import { ProductivityModule } from "../entity/modules/productivity-module"
import { QualityModule } from "../entity/modules/quality-module"

export type ModuleSlot<T extends ModuleMetadata> = {
    module: T
}

export type Module = SpeedModule | ProductivityModule | EfficiencyModule | QualityModule

export type ModuleSlotContainer<T extends Module> = ModuleSlot<T>[]

export const componentModuleArrayToString = (modules: Module[]): string => {
    return modules.map(it => it.name).join("|")
}


export class ModuleComponent extends Component {

    public static fromModules(modules: Module[]) {
        return new ModuleComponent(modules)
    }

    componentType: ComponentType = ComponentType.MODULE_CONTAINER

    private constructor(public readonly modules: Module[]) {
        super()
    }

    public toString() {
        return this.modules.map(it => it.name).join("|")
    }

    clone(): ModuleComponent {
        return new ModuleComponent([...this.modules])
    }
}