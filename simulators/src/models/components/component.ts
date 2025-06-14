export abstract class Component {
    abstract readonly componentType: ComponentType
    constructor() {}

    abstract clone(): Component
}

export const ComponentType = {
    "ITEM_INPUT": "item-input",
    "ITEM_OUTPUT": "item-output",
    "MODULE_CONTAINER": "module-container",
    "EFFECTS_CONTAINER": "effects-container",
    "OUTPUT_TRANSFORMER": "output-transformer"
} as const;

export type ComponentType = typeof ComponentType[keyof typeof ComponentType]