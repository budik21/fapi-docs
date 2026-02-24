---
id: MatchScore
title: MatchScoreObject
sidebar_label: "Match Score"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
All score information for a match, including overall score, aggregate score for multi-leg matches, and detailed breakdown by period (halftime, fulltime, extra time, penalties).
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `overall` | [Score](../objects/Score) | The overall match score (regular time + extra time if played). Does NOT include penalty shootout goals. - null: Match has not started yet - Live score: During match (updates in real-time) - Final score: After match ends Returns Score directly. |
| `aggregate` | [Score](../objects/Score) | Aggregate score across multiple legs (for two-leg or multi-leg matches). - null: Not a multi-leg match, or aggregate not applicable - Aggregate score: Sum of scores across all legs Example: Champions League knockout round - Leg 1: Team A 2-1 Team B - Leg 2: Team B 1-0 Team A - Aggregate: Team A 2-2 Team B (Team B advances on away goals) |
| `halftime` | [PeriodScore](../objects/PeriodScore) | Score during or at the end of the first half. - null: First half has not started yet - Live score: Available DURING first half (shows current score) - Halftime score: Available AFTER first half ends (shows score at halftime break) 'score' = aggregated score (cumulative up to end of first half) 'periodScore' = goals scored in first half only |
| `fulltime` | [PeriodScore](../objects/PeriodScore) | Score at the end of 90 minutes (fulltime). - null: Second half has not completed yet - Fulltime score: Available AFTER second half ends 'score' = aggregated score (cumulative up to end of second half = fulltime) 'periodScore' = goals scored in second half only |
| `afterExtraTimeFirst` | [PeriodScore](../objects/PeriodScore) | Score after the first extra time period. - null: First extra time period has not completed yet - After ET1 score: Available AFTER first extra time period ends 'score' = aggregated score (cumulative up to end of first ET) 'periodScore' = goals scored in first ET period only |
| `afterExtraTimeSecond` | [PeriodScore](../objects/PeriodScore) | Score after the second extra time period (end of extra time). - null: Second extra time period has not completed yet - After ET2 score: Available AFTER second extra time period ends 'score' = aggregated score (cumulative up to end of second ET) 'periodScore' = goals scored in second ET period only |
| `penalties` | [PeriodScore](../objects/PeriodScore) | Penalty shootout score. - null: No penalty shootout occurred - Penalty score: Available AFTER penalty shootout completes 'score' = penalty shootout score (goals in shootout only) 'periodScore' = same as score (penalties are not aggregated with match goals) |
