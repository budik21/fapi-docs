---
id: Lineup
title: LineupObject
sidebar_label: "Lineup"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

## Fields

| Field | Type | Description |
|---|---|---|
| `team` | [Team!](../interfaces/Team) | Team the lineup belongs to |
| `formation` | [LineupFormation](../enums/LineupFormation) | Formation of the lineup (e.g., 4-4-2, 4-3-3) |
| `players` | [[Player!]!](../objects/Player) | Players in the lineup |
| `lineupPlayers` | [[LineupPlayer!]!](../objects/LineupPlayer) | List of all players in the lineup with their positions |
