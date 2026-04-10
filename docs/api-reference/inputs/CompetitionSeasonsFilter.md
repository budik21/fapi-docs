---
id: CompetitionSeasonsFilter
title: CompetitionSeasonsFilterInput
sidebar_label: "Competition Seasons Filter"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Filter for seasons field on Competition (competitionId is implicit from parent).
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `gender` | [[Gender!]](../enums/Gender) | Filter by genders (men/women) |
| `ageCategory` | [[AgeGroup!]](../enums/AgeGroup) | Filter by age categories |
| `startDate` | [DateFilter](../inputs/DateFilter) | Filter by season start date range |
| `endDate` | [DateFilter](../inputs/DateFilter) | Filter by season end date range |
