---
id: AggregatedPlayerStatsMetricCondition
title: AggregatedPlayerStatsMetricConditionInput
sidebar_label: "Aggregated Player Stats Metric Condition"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Condition on aggregated metric value (HAVING). Uses shared FloatOperatorsFilter for the value comparison.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `metric` | [PlayerMatchMetric!](../enums/PlayerMatchMetric) |  |
| `value` | [FloatOperatorsFilter!](../inputs/FloatOperatorsFilter) |  |
