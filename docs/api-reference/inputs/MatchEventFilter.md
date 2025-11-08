---
id: MatchEventFilter
title: MatchEventFilterInput
sidebar_label: "Match Event Filter"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info
Input object used to filter a list of match events. All fields are optional and are combined using AND logic.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `types` | [[MatchEventType!]](../enums/MatchEventType) | Filter by one or more specific event types. |
| `homeOrAway` | [TeamHomeAway](../enums/TeamHomeAway) | Filter events associated with either the home or away team. |
| `playerIDs` | `[String!]` | Filter events associated with specific player IDs. |
| `periods` | [[MatchPeriod!]](../enums/MatchPeriod) | Filter events that occurred during specific match periods (e.g., 1st half, 2nd half, Extra time). |
| `providerID` | `String` | Filter events by a specific data provider ID. |
