---
id: MatchEventCardEvent
title: CardEventObject
sidebar_label: "Match Event > Card Event"
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
| `punishedPlayer` | [Player](../objects/Player) | Player who was punished by the card |
| `punishedTeam` | [Team](../interfaces/Team) | Team of the player who was punished by the card |
| `pitchZone` | [PitchZone](../enums/PitchZone) | The zone of the pitch where the card was issued |
| `cardType` | [CardType](../enums/CardType) | Type of card issued to the player as punishment |
| `cardReason` | [CardReason](../enums/CardReason) | The reason for issuing the card |
| `foulEvent` | [FoulEvent](../objects/MatchEventFoulEvent) | The foul event which let to the card being issued |
| `isOutOfPitch` | `Boolean` | The card was awarded a player or another person out of the pitch (on the bench) |
