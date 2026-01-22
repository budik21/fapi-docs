---
id: Season
title: SeasonObject
sidebar_label: "Season"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
The Season represents a specific season of a competition, typically spanning one year (e.g., 2024/2025).
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `id` | `ID!` |  |
| `localizedName` | [LocalizedText!](../objects/LocalizedText) | The localized name of the season (e.g., '2024/2025') |
| `startDate` | [Date](../scalars/Date) | Start date of the season |
| `endDate` | [Date](../scalars/Date) | End date of the season |
| `competition` | [Competition!](../objects/Competition) | The competition this season belongs to |
