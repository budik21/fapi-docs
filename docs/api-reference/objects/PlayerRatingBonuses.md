---
id: PlayerRatingBonuses
title: PlayerRatingBonusesObject
sidebar_label: "Player Rating Bonuses"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Aggregates all bonuses and penalties that impacted the player's calculated rating.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `entries` | [[PlayerRatingBonus!]!](../objects/PlayerRatingBonus) | List of individual bonus entries |
| `total` | `Float!` | Total sum of all bonuses and penalties |
