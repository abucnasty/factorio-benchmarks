export const MetricEnum = {
    WHOLE_UPDATE: {
        name: "wholeUpdate",
        description: "Whole Update"
    },
    LATENCY_UPDATE: {
        name: "latencyUpdate",
        description: "Latency Update"
    },
    GAME_UPDATE: {
        name: "gameUpdate",
        description: "Game Update"
    },
    PLANETS_UPDATE: {
        name: "planetsUpdate",
        description: "Planets Update"
    },
    CONTROL_BEHAVIOR_UPDATE: {
        name: "controlBehaviorUpdate",
        description: "Control Behavior Update"
    },
    TRANSPORT_LINES_UPDATE: {
        name: "transportLinesUpdate",
        description: "Transport Lines Update"
    },
    ELECTRIC_HEAT_FLUID_CIRCUIT_UPDATE: {
        name: "electricHeatFluidCircuitUpdate",
        description: "Electric/Heat/Fluid Circuit Update"
    },
    ELECTRIC_NETWORK_UPDATE: {
        name: "electricNetworkUpdate",
        description: "Electric Network Update"
    },
    HEAT_NETWORK_UPDATE: {
        name: "heatNetworkUpdate",
        description: "Heat Network Update"
    },
    FLUID_FLOW_UPDATE: {
        name: "fluidFlowUpdate",
        description: "Fluid Flow Update"
    },
    ENTITY_UPDATE: {
        name: "entityUpdate",
        description: "Entity Update"
    },
    LIGHTNING_UPDATE: {
        name: "lightningUpdate",
        description: "Lightning Update"
    },
    TILE_HEATING_UPDATE: {
        name: "tileHeatingUpdate",
        description: "Tile Heating Update"
    },
    PARTICLE_UPDATE: {
        name: "particleUpdate",
        description: "Particle Update"
    },
    MAP_GENERATOR: {
        name: "mapGenerator",
        description: "Map Generator"
    },
    MAP_GENERATOR_BASIC_TILES_SUPPORT_COMPUTE: {
        name: "mapGeneratorBasicTilesSupportCompute",
        description: "Map Generator Basic Tiles Support Compute"
    },
    MAP_GENERATOR_BASIC_TILES_SUPPORT_APPLY: {
        name: "mapGeneratorBasicTilesSupportApply",
        description: "Map Generator Basic Tiles Support Apply"
    },
    MAP_GENERATOR_CORRECTED_TILES_PREPARE: {
        name: "mapGeneratorCorrectedTilesPrepare",
        description: "Map Generator Corrected Tiles Prepare"
    },
    MAP_GENERATOR_CORRECTED_TILES_COMPUTE: {
        name: "mapGeneratorCorrectedTilesCompute",
        description: "Map Generator Corrected Tiles Compute"
    },
    MAP_GENERATOR_CORRECTED_TILES_APPLY: {
        name: "mapGeneratorCorrectedTilesApply",
        description: "Map Generator Corrected Tiles Apply"
    },
    MAP_GENERATOR_VARIATIONS: {
        name: "mapGeneratorVariations",
        description: "Map Generator Variations"
    },
    MAP_GENERATOR_ENTITIES_PREPARE: {
        name: "mapGeneratorEntitiesPrepare",
        description: "Map Generator Entities Prepare"
    },
    MAP_GENERATOR_ENTITIES_COMPUTE: {
        name: "mapGeneratorEntitiesCompute",
        description: "Map Generator Entities Compute"
    },
    MAP_GENERATOR_ENTITIES_APPLY: {
        name: "mapGeneratorEntitiesApply",
        description: "Map Generator Entities Apply"
    },
    SPACE_PLATFORMS: {
        name: "spacePlatforms",
        description: "Space Platforms"
    },
    COLLECTOR_NAV_MESH: {
        name: "collectorNavMesh",
        description: "Collector Nav Mesh"
    },
    COLLECTOR_NAV_MESH_PATHFINDING: {
        name: "collectorNavMeshPathfinding",
        description: "Collector Nav Mesh Pathfinding"
    },
    COLLECTOR_NAV_MESH_RAYCAST: {
        name: "collectorNavMeshRaycast",
        description: "Collector Nav Mesh Raycast"
    },
    CRC_COMPUTATION: {
        name: "crcComputation",
        description: "Crc Computation"
    },
    CONSISTENCY_SCRAPER: {
        name: "consistencyScraper",
        description: "Consistency Scraper"
    },
    LOGISTIC_MANAGER_UPDATE: {
        name: "logisticManagerUpdate",
        description: "Logistic Manager Update"
    },
    CONSTRUCTION_MANAGER_UPDATE: {
        name: "constructionManagerUpdate",
        description: "Construction Manager Update"
    },
    PATH_FINDER: {
        name: "pathFinder",
        description: "Path Finder"
    },
    TRAINS: {
        name: "trains",
        description: "Trains"
    },
    TRAIN_PATH_FINDER: {
        name: "trainPathFinder",
        description: "Train Path Finder"
    },
    COMMANDER: {
        name: "commander",
        description: "Commander"
    },
    CHART_REFRESH: {
        name: "chartRefresh",
        description: "Chart Refresh"
    },
    LUA_GARBAGE_INCREMENTAL: {
        name: "luaGarbageIncremental",
        description: "Lua Garbage Incremental"
    },
    CHART_UPDATE: {
        name: "chartUpdate",
        description: "Chart Update"
    },
    SCRIPT_UPDATE: {
        name: "scriptUpdate",
        description: "Script Update"
    },
    OTHER: {
        name: "other",
        description: "Other"
    }
} as const;

export type MetricEnum = typeof MetricEnum[keyof typeof MetricEnum];