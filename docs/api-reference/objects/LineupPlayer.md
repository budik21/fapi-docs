---
id: LineupPlayer
title: LineupPlayerObject
sidebar_label: "Lineup Player"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

## Fields

| Field | Type | Description |
|---|---|---|
| `player` | [Player!](../objects/Player) | The player in the lineup |
| `lineupPosition` | [LineupPosition](../enums/LineupPosition) | The position of the player in the lineup |
| `inStartingLineup` | `Boolean!` | Whether the player is in the starting lineup |
| `isCaptain` | `Boolean!` | Whether the player is the captain |
| `shirtNumber` | `Int` | The shirt number of the player |
