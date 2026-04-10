---
id: MatchesFilter
title: MatchesFilterInput
sidebar_label: "Matches Filter"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

## Fields

| Field | Type | Description |
|---|---|---|
| `ids` | `[ID!]` | Filter by match IDs |
| `seasonStageIDs` | `[ID!]` | Filter by season stage IDs |
| `teamID` | `ID` | Filter by team ID |
| `opponentTeamID` | `ID` | Filter by opponent team ID |
| `side` | [TeamHomeAway](../enums/TeamHomeAway) | Filter by team side (home/away) relative to teamID. Use side only together with teamID. |
| `startTime` | [DateTimeFilter](../inputs/DateTimeFilter) | Filter by match start time range |
