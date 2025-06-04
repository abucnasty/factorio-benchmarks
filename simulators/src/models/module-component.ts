import { EfficiencyModule } from "./efficiency-module"
import { Module } from "./module"
import { ProductivityModule } from "./productivity-module"
import { QualityModule } from "./quality-module"
import { SpeedModule } from "./speed-module"

export type ModuleSlot<T extends Module> = {
    module: T
}

export type ComponentModule = SpeedModule | ProductivityModule | EfficiencyModule | QualityModule

export type ModuleSlotContainer2<T extends ComponentModule> = [T, T]
export type ModuleSlotContainer3<T extends ComponentModule> = [T, T, T]
export type ModuleSlotContainer4<T extends ComponentModule> = [T, T, T, T]
export type ModuleSlotContainer5<T extends ComponentModule> = [T, T, T, T, T]

export type ModuleSlotContainer<T extends ComponentModule> = ModuleSlot<T>[]
    

export interface ModuleComponent<T extends ComponentModule = ComponentModule> {
    modules: ModuleSlotContainer<T>
}