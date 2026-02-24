---
id: TeamsFilter
title: TeamsFilterInput
sidebar_label: "Teams Filter"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

## Fields

| Field | Type | Description |
|---|---|---|
| `ids` | `[ID!]` | Filter by team IDs |
| `name` | [TeamNameFilter](../inputs/TeamNameFilter) | Filter by team name |
| `country` | [[CountryCode!]](../enums/CountryCode) | Filter by country codes |
| `ageCategory` | [[AgeGroup!]](../enums/AgeGroup) | Filter by age categories |
| `gender` | [[Gender!]](../enums/Gender) | Filter by genders (men/women) |
| `teamType` | [[TeamType!]](../enums/TeamType) | Filter by team types (club/national team) |
