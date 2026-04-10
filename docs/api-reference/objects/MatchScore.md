---
id: MatchScore
title: MatchScoreObject
sidebar_label: "Match Score"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
All score information for a match, including overall score, aggregate score for multi-leg matches, and detailed breakdown by period (halfFirst, halfSecond, extraTimeFirst, extraTimeSecond, penaltyShootout). All scores are live: they are available and update in real time during the relevant period, not only after the period ends.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `overall` | [Score](../objects/Score) | The overall match score (regular time + extra time if played). Does NOT include penalty shootout goals. - null: Match has not started yet - Live: Updates in real time during the match |
| `aggregate` | [Score](../objects/Score) | Aggregate score across multiple legs (for two-leg or multi-leg matches). - null: Not a multi-leg match, or aggregate not applicable - Sum of overall scores across all legs Example: Champions League knockout - Leg 1: Team A 2-1 Team B - Leg 2: Team B 1-0 Team A - Aggregate: Team A 2-2 Team B (Team B advances on away goals) |
| `halfFirst` | [PeriodScore](../objects/PeriodScore) | First half score. Updates in real time as the half is played. - null: First half has not started yet - home/away = goals in first half only; cumulative = running total at current point in the half |
| `halfSecond` | [PeriodScore](../objects/PeriodScore) | Second half / fulltime score. Updates in real time as the half is played. - null: Second half has not started yet - home/away = goals in second half only; cumulative = running total (fulltime when second half ends) |
| `extraTimeFirst` | [PeriodScore](../objects/PeriodScore) | First extra time period score. Updates in real time as the period is played. - null: First extra time period has not started yet - home/away = goals in first ET only; cumulative = running total at current point |
| `extraTimeSecond` | [PeriodScore](../objects/PeriodScore) | Second extra time period score. Updates in real time as the period is played. - null: Second extra time period has not started yet - home/away = goals in second ET only; cumulative = running total at end of extra time |
| `penaltyShootout` | [Score](../objects/Score) | Penalty shootout score (goals in the shootout only). Updates in real time as the shootout is played. - null: No penalty shootout (yet or at all) |
