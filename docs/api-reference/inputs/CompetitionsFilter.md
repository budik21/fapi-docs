---
id: CompetitionsFilter
title: CompetitionsFilterInput
sidebar_label: "Competitions Filter"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

## Fields

| Field | Type | Description |
|---|---|---|
| `ids` | `[ID!]` | Filter by competition IDs |
| `name` | [CompetitionNameFilter](../inputs/CompetitionNameFilter) | Filter by competition name |
| `country` | [[CountryCode!]](../enums/CountryCode) | Filter by country codes |
| `region` | [[Region!]](../enums/Region) | Filter by regions |
| `gender` | [[Gender!]](../enums/Gender) | Filter by genders (men/women) |
| `ageCategory` | [[AgeGroup!]](../enums/AgeGroup) | Filter by age categories |
| `type` | [[CompetitionType!]](../enums/CompetitionType) | Filter by competition types |
