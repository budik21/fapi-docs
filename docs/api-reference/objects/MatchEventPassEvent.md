---
id: MatchEventPassEvent
title: PassEventObject
sidebar_label: "Match Event > Pass Event"
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
| `attempterPlayer` | [Player](../objects/Player) | Player who attempted the pass |
| `attempterTeam` | [Team](../interfaces/Team) | Team of the player who attempted the pass |
| `receiverPlayer` | [Player](../objects/Player) | Player who was intended to receive the pass |
| `receiverTeam` | [Team](../interfaces/Team) | Team of the player who was intended to receive the pass |
| `passOutcome` | [PassOutcome](../enums/PassOutcome) | The outcome of the pass attempt |
| `passType` | [PassType](../enums/PassType) | The type of pass attempt |
| `distance` | [PassDistance](../enums/PassDistance) | The distance category of the pass attempt |
| `length` | `Float` | The length of the pass in meters |
| `matchSituation` | [MatchSituation](../enums/MatchSituation) | The match situation in which the pass was made |
| `bodyPart` | [BodyPart](../enums/BodyPart) | The body part used to make the pass |
| `pitchZone` | [PitchZone](../enums/PitchZone) | The zone of the pitch where the pass was made |
| `direction` | [PassDirection](../enums/PassDirection) | The directional movement of the pass |
| `purpose` | [PassPurpose](../enums/PassPurpose) | The tactical intent of the pass |
| `goalAssist` | `Boolean` | Whether the pass was a goal assist |
| `startCoordX` | `Float` | The horizontal coordinate on the pitch indicating the start location of the pass, measured along the X-axis running parallel to the goal line |
| `startCoordY` | `Float` | The vertical coordinate on the pitch indicating the start location of the pass, measured along the Y-axis running parallel to the touchline |
| `endCoordX` | `Float` | The horizontal coordinate on the pitch indicating the end location of the pass, measured along the X-axis running parallel to the goal line |
| `endCoordY` | `Float` | The vertical coordinate on the pitch indicating the end location of the pass, measured along the Y-axis running parallel to the touchline |
| `createdBigChance` | `Boolean` | Whether the pass created a big chance |
| `goalAssistOrder` | [PassGoalAssistOrder](../enums/PassGoalAssistOrder) | The order of the assist, if the pass was a goal assist |
| `expectedAssist` | `Float` | Expected Assist - probability that the pass will result in a goal |
| `pitchZoneDetail` | [PitchZoneDetail](../enums/PitchZoneDetail) | The detailed zone of the pitch where the pass was made |
