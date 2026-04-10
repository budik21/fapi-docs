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
| `seasonStages` | [SeasonStagesResult!](../objects/SeasonStagesResult) | Season stages of this season with filter and pagination |
| `currentSeasonStage` | [SeasonStage](../objects/SeasonStage) | Current season stage (startDate &lt;= now and endDate &gt;= now) |
