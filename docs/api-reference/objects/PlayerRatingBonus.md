---
id: PlayerRatingBonus
title: PlayerRatingBonusObject
sidebar_label: "Player Rating Bonus"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
List of all bonuses that contributed to the rating value including their type (indicating the specific activity generating the bonus) and subtype (indicating performance level: excellent, normal, or poor)." type (indicating the specific activity generating the bonus) and subtype (indicating performance level: excellent, normal, or poor)."
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `type` | `String!` | Type of the bonus or penalty |
| `subtype` | `String` | Subtype providing level of the bonus, if available |
| `value` | `Float!` | Numeric value of the bonus (positive) or penalty (negative) |
