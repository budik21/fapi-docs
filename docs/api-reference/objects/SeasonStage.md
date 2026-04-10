---
id: SeasonStage
title: SeasonStageObject
sidebar_label: "Season Stage"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
The SeasonStage represents a specific stage or phase within a season, such as Regular Season, Playoffs, or Group Stage.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `id` | `ID!` |  |
| `stageType` | [SeasonStageType!](../enums/SeasonStageType) | Normalized type of the season stage (e.g. main, relegation, play-off). |
| `startDate` | [Date](../scalars/Date) | Start date of the season stage |
| `endDate` | [Date](../scalars/Date) | End date of the season stage |
| `season` | [Season!](../objects/Season) | The season this stage belongs to |
| `matches` | [MatchesResult!](../objects/MatchesResult) | Matches of this season stage with filter and pagination |
| `pastMatches` | [MatchesResult!](../objects/MatchesResult) | Past matches (startTime &lt; now) |
| `upcomingMatches` | [MatchesResult!](../objects/MatchesResult) | Upcoming matches (startTime &gt; now) |
