---
id:         season-stage
title:      Season stage
---
## Dependecies
Object `SeasonSatge` is a child object of the `Season` object. A specific season stage is in all cases related to just one [Season](season).

## Business purpose
:::info[no-header]
The `SeasonStage` object encompasses all data for a specific phase of a `Season`. While many competitions (such as the **English Premier League**) consist of a single stage, others (like the **UEFA Champions League**) divide a single season into multiple distinct stages (e.g., Qualifying Round, League Phase, Knockout Phase). 
:::
:::tip[Competition > Season > Season Stage]
Understanding the distinction between `Competition`, `Season`, and `Season Stage` objects is crucial.

While the `Competition` is, for example, the **English Premier League**, the `Season` represents the specific campaign, e.g., *2025/2026* (starting August 15th, 2025, and ending May 14th, 2026). The Premier League operates on a single-stage model where all teams play each other twice; therefore, this specific season contains only one Season Stage.

Another example is the *UEFA Champions League (UCL)*. Like the Premier League, the UCL consists of annual seasons (e.g., the 2024/2025 season won by Paris St. Germain). However, unlike the Premier League, the UCL is divided into three distinct Season Stages:
1.  **Qualifying** (play-off system)
2.  **League Phase** (special league system)
3.  **Play-offs** (knockout system)
:::
