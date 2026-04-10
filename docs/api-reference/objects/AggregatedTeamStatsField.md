---
id: AggregatedTeamStatsField
title: AggregatedTeamStatsFieldObject
sidebar_label: "Aggregated Team Stats Field"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Aggregated metric values exposed as direct fields. Only types supported by the metric are non-null.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `metric` | [TeamMatchMetric!](../enums/TeamMatchMetric) |  |
| `sum` | `Float` | Sum of the metric across matches. |
| `avg` | `Float` | Average of the metric per match. |
| `count` | `Int` | Count (e.g. matches played for this metric). |
| `per90Avg` | `Float` | Per-90 average. |
| `weightedAvg` | `Float` | Weighted average. |
