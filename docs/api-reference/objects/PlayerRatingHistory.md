---
id: PlayerRatingHistory
title: PlayerRatingHistoryObject
sidebar_label: "Player Rating History"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Represents a snapshot of a player's rating and associated bonuses at a specific point in the match. Allows tracking the rating progression while the player was active on the pitch.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `timeFrame` | [MatchTimeFrame!](../objects/MatchTimeFrame) | The match clock value indicating when this rating was captured. |
| `value` | `Float!` | The rating value valid for this specific play time. |
| `bonuses` | [PlayerRatingBonuses!](../objects/PlayerRatingBonuses) | The specific bonuses assigned for this play time. |
