---
id: PlayerRating
title: PlayerRatingObject
sidebar_label: "Player Rating"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Provides performance evaluations (ratings) for players who participated in the match using a standardised scale from 1 (worst performance) to 10 (best performance). If no playerIds are specified, the response returns ratings for all players who took part and met the criteria for rating calculation.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `player` | [Player!](../objects/Player) | The player being evaluated. |
| `ratingConfigID` | `ID!` | ID of the configuration ruleset applied to calculate this rating. |
| `value` | `Float!` | The final calculated rating, normalized and capped to the 1-10 scale. |
| `valueUncapped` | `Float!` | The raw rating value before capping. Useful for breaking ties when multiple players have the same final rating. |
| `bonuses` | [PlayerRatingBonuses!](../objects/PlayerRatingBonuses) | Breakdown of bonuses and penalties that contributed to the rating value. |
| `createdAt` | [DateTime!](../scalars/DateTime) | The timestamp of when the rating was created. ISO 8601 (RFC 3339). |
| `updatedAt` | [DateTime!](../scalars/DateTime) | The timestamp of when the rating was last updated. ISO 8601 (RFC 3339). |
| `ratingHistory` | [[PlayerRatingHistory!]!](../objects/PlayerRatingHistory) | Historical rating data for player throughout the match, sorted by minute in ascending order. |
