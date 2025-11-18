---
id: MatchEventsResult
title: MatchEventsResultObject
sidebar_label: "Match Events Result"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Represents a paginated result set of match events.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `pageInfo` | [PageInfo!](../objects/PageInfo) | Information about the current page and cursors. |
| `entries` | [[MatchEvent!]!](../interfaces/MatchEvent) | The list of match events on the current page. |
