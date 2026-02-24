---
id:         match
title:      Match
---

## Dependencies
The `Match` object is a child of the `SeasonStage` object.

## Business purpose
:::info[no-header]
Object `Match` provides all data for a specific match using the provided `MatchId`. This includes details such as the teams involved, their lineups, team and player statistics, match momentum, and other related data (see the list of all available child objects).

Several other objects linked to a match provide access to the most granular data available in the Football API.
:::

### Match object hierarchy
Each `Match` belongs to a specific `Season Stage`, the `Season Stage` belongs to a specific `Season`, which in turn belongs to a specific `Competition`. This hierarchical structure allows for precise categorization and retrieval of match data based on the context of the competition and season.

While the `Competition` is, for example, the **English Premier League**, the `Season` represents the specific campaign, e.g., *2025/2026* (starting August 15th, 2025, and ending May 14th, 2026). The Premier League operates on a single-stage model where all teams play each other twice; therefore, this specific season contains only one `Season Stage`.

Another example is the *UEFA Champions League (UCL)*. Like the Premier League, the UCL consists of annual seasons (e.g., the 2024/2025 season won by Paris St. Germain). However, unlike the Premier League, the UCL is divided into three distinct `Season Stages`:
1.  **Qualifying** (play-off system)
2.  **League Phase** (special league system)
3.  **Play-offs** (knockout system)


### Match Status and Live Timing
To understand the current situation of a match, the `Match` object provides **two key information**:

* **`status`:** This attribute defines **the exact state of the match at a specific moment** (for example, whether it is yet to start, running, or already over). For a complete list of allowed values, please see the [MatchStatusEnum](./../../../api-reference/enums/MatchStatus.md). This attribute answers questions like: *"What is the current status of the match? Has it started, or is it currently playing? Is the match already over?"*
* **`clock`:** During the live phase of a match, the `clock` object becomes available. It shows **the exact played time and identifies which period is currently being played**. See details in the [Clock object](./../../objects-common/matchClock.md). This object answers questions like: *"What is the current play time of the match? Which period is currently being played?"*

## How to get Match ID?
There are two basic scenarios:

* You have the **StatsPerform** or **Datacore (Livesport) ID** for the match.
    * In this case, use the **MappingService** to retrieve the Snowflake ID (Football API ID).
* You have your **own internal ID** (which does not correspond to StatsPerform / Datacore ID) or **no ID** at all.
    * In this case, use **Search Queries** to find the match in list of competitions / seasons / matches. 

