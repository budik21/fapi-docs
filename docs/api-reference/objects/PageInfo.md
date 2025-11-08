---
id: PageInfo
title: PageInfoObject
sidebar_label: "Page Info"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info
Contains pagination information for cursor-based pagination.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `timestamp` | [DateTime!](../scalars/DateTime) | Timestamp used for time-based cursor pagination. |
| `cursor` | `String` | The opaque cursor string used to fetch the next set of results. |
