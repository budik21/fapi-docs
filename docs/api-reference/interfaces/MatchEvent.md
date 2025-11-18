---
id: MatchEvent
title: MatchEventInterface
sidebar_label: "Match Event"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Interface defining the common properties shared by all match events. Specific event types (e.g., GoalEvent, CardEvent) would implement this and would add event specific attributes.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `id` | `ID!` | The unique identifier for the event. |
| `type` | [MatchEventType!](../enums/MatchEventType) | Enumerated type of the event (e.g., GOAL, CARD). |
| `timestamp` | [DateTime!](../scalars/DateTime) | The exact date and time the event occurred. |
| `timeFrame` | [MatchTimeFrame!](../objects/MatchTimeFrame) | Information about when the event happened within the match (match phase, match period, match minute). |
| `homeOrAway` | [TeamHomeAway](../enums/TeamHomeAway) | Indicates whether the event is associated with the home or away team. |
| `team` | [Team](../interfaces/Team) | The team linked to this event, if applicable, as some events are not associated with any team. |
| `player` | [Player](../objects/Player) | The player linked to this event, if applicable, as some events are not associated with any player. |
