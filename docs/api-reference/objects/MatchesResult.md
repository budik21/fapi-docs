---
id: MatchesResult
title: MatchesResultObject
sidebar_label: "Matches Result"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Represents a paginated result set of matches.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `items` | [[Match!]!](../objects/Match) | The list of matches on the current page. |
| `pageInfo` | [PageInfo!](../objects/PageInfo) | Information about the current page and cursors. |
