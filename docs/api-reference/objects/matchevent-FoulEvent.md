---
id: matchevent-FoulEvent
title: FoulEventObject
sidebar_label: "Match Event > Foul Event"
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
| `committedPlayer` | [Player](../objects/Player) | Player who committed the foul |
| `committedTeam` | [Team](../interfaces/Team) | Team of the player who committed the foul |
| `sufferedPlayer` | [Player](../objects/Player) | Player who suffered the foul |
| `sufferedTeam` | [Team](../interfaces/Team) | Team of the player who suffered the foul |
| `pitchZone` | [PitchZone](../enums/PitchZone) | The zone of the pitch where the foul was committed |
| `foulType` | [FoulType](../enums/FoulType) | Description of the type of the player's behavior resulting in a foul |
| `foulCategory` | [FoulCategory](../enums/FoulCategory) | Offensive or defensive foul |
| `foulContext` | [FoulContext](../enums/FoulContext) | Captures the context in which the foul occurred |
| `punishmentKickType` | [PunishmentKickType](../enums/PunishmentKickType) | The type of kick awarded as a consequence of a foul |
| `isFastBreakFoul` | `Boolean` | Was the foul committed during a fast break action or during normal play? |
| `executorPlayer` | [Player](../objects/Player) | Player who will execute the kick awarded as the consequence of the foul |
| `executorTeam` | [Team](../interfaces/Team) | Team of the player who will execute the kick awarded as the consequence of the foul |
| `cardEvent` | [CardEvent](../objects/CardEvent) | The card event which the foul was awarded by a referee (if any) |
| `boxArea` | [BoxArea](../enums/BoxArea) | The area where the foul was committed regarding to the boxes |
| `coordX` | `Float` | The horizontal coordinate on the pitch indicating the location from which a foul was committed, measured along the X-axis running parallel to the goal line |
| `coordY` | `Float` | The vertical coordinate on the pitch indicating the location from which a foul was committed, measured along the Y-axis running parallel to the touchline |
| `hasStoppedScoringOpportunity` | `Boolean` | The foul committed by a player denied the opponent a clear goal-scoring opportunity |
