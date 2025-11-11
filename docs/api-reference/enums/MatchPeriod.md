---
id: MatchPeriod
title: MatchPeriodEnum
sidebar_label: "Match Period"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info
Represents the official chronological phases or periods of a football (soccer) match. This includes defined playing times (e.g., halves and extra time periods) as well as significant non-playing intervals (e.g., half-time breaks and pre-game states) and final resolution phases.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `HALF_FIRST` | First period of the match. Usually a timeframe 0-45 min. of the match |
| `HALF_SECOND` | Second period of the match. Usually a timeframe 46-90 min. of the match |
| `EXTRATIME_FIRST` | First period of the extra time. Usually a timeframe 91-105 min. of the match |
| `EXTRATIME_SECOND` | Second period of the extra time. Usually a timeframe 106-120 min. of the match |
| `PENALTY_SHOOTOUT` | A phase of the match where no time frame is applied and which comes after the second extra time, if needed |
| `HALF_TIME` | A phase of the match which is between the regular halves |
| `HALF_TIME_EXTRA_TIME` | A phase of the match which is between the extra time halves |
| `BEFORE_EXTRA_TIME` | A phase before the initial kick-off of the match |
| `BEFORE_PENALTY_SHOOTOUT` | A phase before the initial kick-off of the first extra time |
| `MATCH_OVERALL` | Overall view of the match, no specific period |

<JsonExportButton data={[{"value":"HALF_FIRST","description":"First period of the match. Usually a timeframe 0-45 min. of the match"},{"value":"HALF_SECOND","description":"Second period of the match. Usually a timeframe 46-90 min. of the match"},{"value":"EXTRATIME_FIRST","description":"First period of the extra time. Usually a timeframe 91-105 min. of the match"},{"value":"EXTRATIME_SECOND","description":"Second period of the extra time. Usually a timeframe 106-120 min. of the match"},{"value":"PENALTY_SHOOTOUT","description":"A phase of the match where no time frame is applied and which comes after the second extra time, if needed"},{"value":"HALF_TIME","description":"A phase of the match which is between the regular halves"},{"value":"HALF_TIME_EXTRA_TIME","description":"A phase of the match which is between the extra time halves"},{"value":"BEFORE_EXTRA_TIME","description":"A phase before the initial kick-off of the match"},{"value":"BEFORE_PENALTY_SHOOTOUT","description":"A phase before the initial kick-off of the first extra time"},{"value":"MATCH_OVERALL","description":"Overall view of the match, no specific period"}]} fileName="MatchPeriod" />
