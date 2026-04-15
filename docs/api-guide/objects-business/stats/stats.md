---
id:         stats
title:      Metrics
---

There is no real GraphQL object called `Metrics`.

The Football API allows you to query metrics at multiple levels of detail. We distinguish between granular data (related to a specific match) and aggregated metrics (season totals, player careers). The majority of metrics are segmented to provide insights at both the team level and the individual player level.

## Granular match metrics

The most granular metrics are provided at the match level.

See the [Player Match Stats](/api-guide/objects-business/stats/stats-player-match) documentation for details on how to get **player metrics for a specific match**.

See the [Team Match Stats](/api-guide/objects-business/stats/stats-team-match) documentation for details on how to get **team metrics for a specific match**.

## Aggregated metrics

Aggregated metrics are available at the team and player level, and can be filtered across multiple dimensions such as season stage or player career.

Multiple queries are available to retrieve aggregated metrics for teams and players, with different levels of granularity and not all of them are available at the moment. We will be adding more queries in the future to cover more types of aggregated metrics.

These metrics are useful for analyzing performance trends over time, comparing players or teams, and gaining insights into overall performance.

### Team metrics
!!! TBD !!!
#### Per Season
!!! TBD !!!

### Player metrics
#### Per Season/Season Stage
!!! TBD !!!

#### Per Career
!!! TBD !!!
