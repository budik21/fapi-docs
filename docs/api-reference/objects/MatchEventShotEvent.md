---
id: MatchEventShotEvent
title: ShotEventObject
sidebar_label: "Match Event > Shot Event"
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
| `shooterPlayer` | [Player](../objects/Player) | Player who took the shot |
| `shooterTeam` | [Team](../interfaces/Team) | Team of the player who took the shot |
| `shotOutcome` | [ShotOutcome](../enums/ShotOutcome) | The outcome of the shot attempt |
| `target` | [ShotTarget](../enums/ShotTarget) | The zone of the goal or vicinity where the shot was directed |
| `xG` | `Float` | Expected Goals - probability that the shot will result in a goal |
| `xGOT` | `Float` | Expected Goals On Target - xG value adjusted for shots on target |
| `isGoalShot` | `Boolean` | Whether the shot resulted in a goal |
| `isFirstTouchShot` | `Boolean` | Whether the shot was taken with the first touch |
| `isWoodworkShot` | `Boolean` | Whether the shot hit the woodwork (post or crossbar) |
| `isVolleyShot` | `Boolean` | Whether the shot was a volley |
| `matchSituation` | [MatchSituation](../enums/MatchSituation) | The match situation in which the shot was taken |
| `bodyPart` | [BodyPart](../enums/BodyPart) | The body part used to take the shot |
| `coordX` | `Float` | The horizontal coordinate on the pitch indicating the location from which the shot was taken, measured along the X-axis running parallel to the goal line |
| `coordY` | `Float` | The vertical coordinate on the pitch indicating the location from which the shot was taken, measured along the Y-axis running parallel to the touchline |
| `length` | `Float` | The distance of the shot in meters |
| `boxArea` | [BoxArea](../enums/BoxArea) | The area where the shot was taken regarding to the boxes |
| `pressureOnShooter` | [PressureType](../enums/PressureType) | The level of pressure from opposing players on the shooter |
| `clarity` | [ClarityType](../enums/ClarityType) | The number of players between the shooter and the goal |
| `pitchZone` | [PitchZone](../enums/PitchZone) | The zone of the pitch where the shot was taken |
| `pitchZoneDetail` | [PitchZoneDetail](../enums/PitchZoneDetail) | The detailed zone of the pitch where the shot was taken |
| `isBigChance` | `Boolean` | Whether the shot was a big chance |
| `goalmouthCoordY` | `Float` | The Y-coordinate (0-100) of where the shot/ball crossed/was projected to cross the goal line |
| `goalmouthCoordZ` | `Float` | The Z-coordinate (0-100) of where the shot/ball crossed/was projected to cross the goal line |
