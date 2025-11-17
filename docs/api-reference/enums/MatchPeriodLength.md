---
id: MatchPeriodLength
title: MatchPeriodLengthEnum
sidebar_label: "Match Period Length"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Defines the standard duration, in minutes, for a specific period of a match, most commonly representing the length of a single half or an extra time segment.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value. |
| `LENGTH_30` | One half of the match durates 30 minutes (e.g., often used in youth or minor league games). |
| `LENGTH_35` | One half of the match durates 35 minutes (e.g., often used in youth or minor league games). |
| `LENGTH_40` | One half of the match durates 40 minutes (e.g., common in women's football or specific youth categories). |
| `LENGTH_45` | One half of the match durates 45 minutes (The standard duration for one half in senior professional football). |
| `LENGTH_10` | Duration of the period is 10 minutes (Often the length of a single extra time half in some competitions). |
| `LENGTH_15` | Duration of the period is 15 minutes (The standard length of a single extra time half in senior professional football, or half-time break). |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value."},{"value":"LENGTH_30","description":"One half of the match durates 30 minutes (e.g., often used in youth or minor league games)."},{"value":"LENGTH_35","description":"One half of the match durates 35 minutes (e.g., often used in youth or minor league games)."},{"value":"LENGTH_40","description":"One half of the match durates 40 minutes (e.g., common in women's football or specific youth categories)."},{"value":"LENGTH_45","description":"One half of the match durates 45 minutes (The standard duration for one half in senior professional football)."},{"value":"LENGTH_10","description":"Duration of the period is 10 minutes (Often the length of a single extra time half in some competitions)."},{"value":"LENGTH_15","description":"Duration of the period is 15 minutes (The standard length of a single extra time half in senior professional football, or half-time break)."}]} fileName="MatchPeriodLength" />
