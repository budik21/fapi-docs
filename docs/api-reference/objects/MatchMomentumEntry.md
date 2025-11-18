---
id: MatchMomentumEntry
title: MatchMomentumEntryObject
sidebar_label: "Match Momentum Entry"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
MatchMomentumEntry defines a single data point (values for a specific minute of the match) within the match momentum, including momentum values for both teams and a combined value for a specific time frame.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `timeFrame` | [MatchTimeFrame!](../objects/MatchTimeFrame) | Specifies the time frame of the match to which the momentum data point refers. |
| `homeValue` | `Float!` | The momentum value for the home team in a specific minute of the match. Represented as a decimal between 0 and 1, it expresses the probability of the home team scoring a goal during that time frame. |
| `awayValue` | `Float!` | The momentum value for the away team in a specific minute of the match. Represented as a decimal between 0 and 1, it expresses the probability of the away team scoring a goal during that time frame. |
| `combinedValue` | `Float!` | The momentum value calculated as the difference between the home and away momentum values. Represented as a decimal between -1 and 1 (inclusive), it indicates which team has a higher probability of scoring in a specific time frame. A value above 0 favors the home team, a value below 0 favors the away team, and a value of 0 means both teams have an equal probability of scoring—regardless of the actual value. |
