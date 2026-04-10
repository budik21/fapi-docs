---
id: PeriodScore
title: PeriodScoreObject
sidebar_label: "Period Score"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Score for a specific period: goals in that period (home/away) and optional cumulative score. All values are live and update during the period.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `home` | `Int!` | Goals scored by the home team in this period only. |
| `away` | `Int!` | Goals scored by the away team in this period only. |
| `cumulative` | [Score](../objects/Score) | Cumulative score (running total) at the current point in the match. For first half, typically equals home/away; for later periods, sum of all goals up to that point. |
