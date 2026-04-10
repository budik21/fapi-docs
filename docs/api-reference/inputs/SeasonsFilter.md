---
id: SeasonsFilter
title: SeasonsFilterInput
sidebar_label: "Seasons Filter"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

## Fields

| Field | Type | Description |
|---|---|---|
| `id` | `[ID!]` | Filter by season IDs |
| `competitionID` | `[ID!]` | Filter by competition IDs |
| `gender` | [[Gender!]](../enums/Gender) | Filter by genders (men/women) |
| `ageCategory` | [[AgeGroup!]](../enums/AgeGroup) | Filter by age categories |
| `startDate` | [DateFilter](../inputs/DateFilter) | Filter by season start date range |
| `endDate` | [DateFilter](../inputs/DateFilter) | Filter by season end date range |
