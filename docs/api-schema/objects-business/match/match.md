---
id:         match
title:      Match
---

## Dependencies
Object `Match` is a child of the `Season` object. A specific match is in all cases related to just one [season](../season).

## Business purpose
:::info[no-header]
Object `Match` provides all data for a specific match using the provided `MatchId`. This includes details such as the teams involved, their lineups, team and player statistics, match momentum, and other related data (see the list of all available child objects).
:::

## How to get Match ID?
There are two basic scenarios:

* You have the **StatsPerform** or **Datacore (Livesport) ID** for the match.
    * In this case, use the **MappingService** to retrieve the Snowflake ID (Football API ID).
* You have your **own internal ID** (which does not correspond to StatsPerform / Datacore ID) or **no ID** at all.
    * In this case, use **Search Queries** to find the match in list of competitions / seasons / matches. 

