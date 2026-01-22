---
id: Competition
title: CompetitionObject
sidebar_label: "Competition"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
The Competition represents a football competition or league (e.g., Premier League, Champions League, World Cup).
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `id` | `ID!` |  |
| `localizedName` | [LocalizedText!](../objects/LocalizedText) | The localized name of the competition (e.g., 'Premier League', 'Chance liga') |
| `country` | [CountryCode](../enums/CountryCode) | The country code for domestic competitions (e.g., CZECH_REPUBLIC, ENGLAND) |
| `region` | [Region](../enums/Region) | The region for international/continental competitions (e.g., 'Europe', 'World') |
| `ageGroup` | [AgeGroup](../enums/AgeGroup) | The age group category |
| `gender` | [Gender](../enums/Gender) | The gender category |
