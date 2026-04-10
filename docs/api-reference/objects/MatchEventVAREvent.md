---
id: MatchEventVAREvent
title: VAREventObject
sidebar_label: "Match Event > VAREvent"
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
| `situationType` | [VARSituationType](../enums/VARSituationType) | Which type of situation is under review |
| `decisionType` | [VARDecisionType](../enums/VARDecisionType) | Decision made by VAR |
| `goalEvent` | [GoalEvent](../objects/MatchEventGoalEvent) | The relation to the goal event which is under review (if any) |
| `foulEvent` | [FoulEvent](../objects/MatchEventFoulEvent) | The relation to the foul event which is under review (if any) |
| `cardEvent` | [CardEvent](../objects/MatchEventCardEvent) | The relation to the card event which is under review (if any). Not all card given must be related to a foul |
| `passEvent` | [PassEvent](../objects/MatchEventPassEvent) | The relation to the pass event which is under review (if any). An offside pass is related when the on-pitch decision is goal not awarded because of previous offside |
