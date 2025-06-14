export const QualityLevel = {
    "COMMON": "Q1",
    "UNCOMMON": "Q2",
    "RARE": "Q3",
    "EPIC": "Q4",
    "LEGENDARY": "Q5"
} as const;

export type QualityLevel = typeof QualityLevel[keyof typeof QualityLevel];

export type QualityMetadata = {
    qualityLevel: QualityLevel
}

export const AllQualityLevels: readonly QualityLevel[] = Object.values(QualityLevel)