---
id: MatchEventSubstitutionEvent
title: SubstitutionEventObject
sidebar_label: "Match Event > Substitution Event"
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
| `subsInPlayer` | [Player](../objects/Player) | Player who was substituted in |
| `subsInTeam` | [Team](../interfaces/Team) | Team of the player who was substituted in |
| `subsOutPlayer` | [Player](../objects/Player) | Player who was substituted out |
| `subsOutTeam` | [Team](../interfaces/Team) | Team of the player who was substituted out |
| `periodLength` | [MatchPeriodLength](../enums/MatchPeriodLength) | The length of the period when the substitution occurred |
| `substitutionReason` | [SubstitutionReason](../enums/SubstitutionReason) | The reason for the substitution |
