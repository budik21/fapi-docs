---
id: Lineup
title: LineupObject
sidebar_label: "Lineup"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Represents the complete squad configuration for one team in a single match.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `team` | [Team!](../interfaces/Team) | Team the lineup belongs to. |
| `formation` | [LineupFormation](../enums/LineupFormation) | Formation of the lineup (e.g., 4-4-2, 4-3-3). |
| `lineupPlayers` | [[LineupPlayer!]!](../objects/LineupPlayer) | List of all players in the lineup with their positions and other details. |
