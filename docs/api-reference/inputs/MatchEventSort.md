---
id: MatchEventSort
title: MatchEventSortInput
sidebar_label: "Match Event Sort"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Input object defining the sorting criteria for a query.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `field` | [MatchEventSortField!](../enums/MatchEventSortField) | The field to sort the results by. |
| `direction` | [SortDirection!](../enums/SortDirection) | The direction of the sort (e.g., ASCENDING or DESCENDING). |
