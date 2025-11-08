---
id: PlayerRating
title: PlayerRatingObject
sidebar_label: "Player Rating"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

## Fields

| Field | Type | Description |
|---|---|---|
| `player` | [Player!](../objects/Player) |  |
| `ratingConfigID` | `ID` |  |
| `ratingFinal` | `Float` |  |
| `ratingRaw` | `Float` |  |
| `ratingRawWithBonuses` | `Float` |  |
| `ratingRawAfterCorrections` | `Float` |  |
| `position` | `String` |  |
| `roles` | [[PlayerRole!]](../objects/PlayerRole) |  |
| `profiles` | [[PlayerProfile!]](../objects/PlayerProfile) |  |
| `bonusTotal` | `Float` |  |
| `bonuses` | [[PlayerBonus!]](../objects/PlayerBonus) |  |
| `corrections` | [[PlayerCorrection!]](../objects/PlayerCorrection) |  |
| `createdAt` | [DateTime](../scalars/DateTime) |  |
| `updatedAt` | [DateTime](../scalars/DateTime) |  |
