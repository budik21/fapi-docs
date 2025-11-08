---
id: WinProbabilityEntry
title: WinProbabilityEntryObject
sidebar_label: "Win Probability Entry"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

## Fields

| Field | Type | Description |
|---|---|---|
| `timeFrame` | [MatchTimeFrame!](../objects/MatchTimeFrame) | Specifies the time frame of the match to which the win probability data point refers. |
| `homeValue` | `Float!` | The probability that the home team will win the match at a specific point in time. Represented as a decimal between 0 and 1, it reflects the likelihood of a home win based on the current state and development of the match. |
| `awayValue` | `Float!` | The probability that the away team will win the match at a specific point in time. Represented as a decimal between 0 and 1, it reflects the likelihood of a home win based on the current state and development of the match. |
| `drawValue` | `Float!` | The probability that the match will end in a draw at a specific point in time. Represented as a decimal between 0 and 1, it reflects the likelihood of a draw based on the current state and development of the match. |
