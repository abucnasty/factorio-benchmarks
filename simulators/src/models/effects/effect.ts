import { QualityEffect } from "../effects";
import { EfficiencyEffect } from "./efficiency-effect";
import { ProductivityEffect } from "./productivity-effect";
import { SpeedEffect } from "./speed-effect";

export type Effect = 
    SpeedEffect |
    QualityEffect |
    ProductivityEffect |
    EfficiencyEffect