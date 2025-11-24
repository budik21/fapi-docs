---
id:         match
title:      Match
---

## Dependencies
The `Match` object is a child of the `SeasonStage` object.

Due to the strict hierarchy — where a specific `SeasonStage` belongs to a single `Season` and a `Season` belongs to a single `Competition` — these relationships ensure that knowing the `MatchID` allows you to fully resolve the context of the related `SeasonStage`, `Season`, and `Competition`.

## Business purpose
:::info[no-header]
Object `Match` provides all data for a specific match using the provided `MatchId`. This includes details such as the teams involved, their lineups, team and player statistics, match momentum, and other related data (see the list of all available child objects).

Several other objects linked to a match provide access to the most granular data available in the Football API.
:::
:::tip[Competition > Season > Season Stage]
Understanding the distinction between `Competition`, `Season`, and `Season Stage` objects is crucial.

While the `Competition` is, for example, the **English Premier League**, the `Season` represents the specific campaign, e.g., *2025/2026* (starting August 15th, 2025, and ending May 14th, 2026). The Premier League operates on a single-stage model where all teams play each other twice; therefore, this specific season contains only one Season Stage.

Another example is the *UEFA Champions League (UCL)*. Like the Premier League, the UCL consists of annual seasons (e.g., the 2024/2025 season won by Paris St. Germain). However, unlike the Premier League, the UCL is divided into three distinct Season Stages:
1.  **Qualifying** (play-off system)
2.  **League Phase** (special league system)
3.  **Play-offs** (knockout system)
:::


## How to get Match ID?
There are two basic scenarios:

* You have the **StatsPerform** or **Datacore (Livesport) ID** for the match.
    * In this case, use the **MappingService** to retrieve the Snowflake ID (Football API ID).
* You have your **own internal ID** (which does not correspond to StatsPerform / Datacore ID) or **no ID** at all.
    * In this case, use **Search Queries** to find the match in list of competitions / seasons / matches. 

