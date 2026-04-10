---
id: SeasonStageMatchesFilter
title: SeasonStageMatchesFilterInput
sidebar_label: "Season Stage Matches Filter"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Filter for matches/pastMatches/upcomingMatches on SeasonStage (seasonStageID is implicit from parent). For pastMatches/upcomingMatches, startTime is set implicitly.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `teamID` | `ID` | Filter by team ID |
| `opponentTeamID` | `ID` | Filter by opponent team ID |
| `side` | [TeamHomeAway](../enums/TeamHomeAway) | Filter by team side (home/away) relative to teamID. Use side only together with teamID. |
| `startTime` | [DateTimeFilter](../inputs/DateTimeFilter) | Filter by match start time range (used only for matches; ignored for pastMatches/upcomingMatches) |
