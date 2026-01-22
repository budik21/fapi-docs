---
id: MatchEventGoalEvent
title: GoalEventObject
sidebar_label: "Match Event > Goal Event"
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
| `status` | [EventStatus](../enums/EventStatus) | The status of the goal event |
| `scorerPlayer` | [Player](../objects/Player) | Player who scored the goal |
| `scorerTeam` | [Team](../interfaces/Team) | Team of the player who scored the goal |
| `isOwnGoal` | `Boolean` | Whether the goal was an own goal |
| `shotEvent` | [ShotEvent](../objects/MatchEventShotEvent) | The shot event that resulted in the goal |
| `assist1Event` | [PassEvent](../objects/MatchEventPassEvent) | The first assist for the goal |
| `assist2Event` | [PassEvent](../objects/MatchEventPassEvent) | The second assist for the goal |
| `goalDisallowedReason` | [GoalDisallowedReason](../enums/GoalDisallowedReason) | The reason why the goal was disallowed (if applicable) |
