---
id: MatchEventPeriodStartEndEvent
title: PeriodStartEndEventObject
sidebar_label: "Match Event > Period Start End Event"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

## Fields

| Field | Type | Description |
|---|---|---|
| `id` | `ID!` |  |
| `type` | [MatchEventType!](../enums/MatchEventType) |  |
| `timestamp` | [DateTime!](../scalars/DateTime) |  |
| `timeFrame` | [MatchTimeFrame!](../objects/MatchTimeFrame) |  |
| `homeOrAway` | [TeamHomeAway](../enums/TeamHomeAway) |  |
| `team` | [Team](../interfaces/Team) |  |
| `player` | [Player](../objects/Player) |  |
| `refereeAction` | [RefereeAction](../enums/RefereeAction) | Type of the referee's action |
| `suspensionReason` | [PeriodSuspensionReason](../enums/PeriodSuspensionReason) | Reason for the period suspension |
| `periodLength` | [MatchPeriodLength](../enums/MatchPeriodLength) | Length of the period |
