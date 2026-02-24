---
id: PeriodScore
title: PeriodScoreObject
sidebar_label: "Period Score"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Represents score information for a specific period, including both period-specific goals and cumulative aggregated score.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `periodScore` | [Score!](../objects/Score) | Goals scored in this specific period only. For example, if first half ended 1-0 and second half added 1 more goal, halftime.periodScore = 1-0, fulltime.periodScore = 1-0 (second half only). |
| `score` | [Score!](../objects/Score) | Cumulative score at the end of this period (aggregated up to this point). For example, if first half ended 1-0 and second half added 1 more goal, halftime.score = 1-0, fulltime.score = 2-0. |
