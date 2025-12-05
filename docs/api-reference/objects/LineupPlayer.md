---
id: LineupPlayer
title: LineupPlayerObject
sidebar_label: "Lineup Player"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
LineupPlayer represents a single player entry within a specific match lineup. It links the base Player entity to match-specific details.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `player` | [Player!](../objects/Player) | The player in the lineup. |
| `lineupPosition` | [LineupPosition](../enums/LineupPosition) | The position of the player in the lineup (if the player is in the starting lineup, null otherwise). |
| `inStartingLineup` | `Boolean!` | Indicates if the player is designated as a starter (true) or a substitute (false). |
| `isCaptain` | `Boolean!` | Indicates if this player holds the captain's armband for this match. Valid only at the moment of the match kick-off, the changes during the match are not reflected. |
| `shirtNumber` | `Int` | The jersey number of the player. |
