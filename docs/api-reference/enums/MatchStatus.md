---
id: MatchStatus
title: MatchStatusEnum
sidebar_label: "Match Status"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Represents the current status of a football match.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `SCHEDULED` | Match is scheduled but has not started. |
| `IN_PROGRESS` | Match is currently in progress. |
| `SUSPENDED` | Match is suspended (temporarily stopped). |
| `FINISHED` | Match has finished. |
| `CANCELLED` | Match has been cancelled. |

<JsonExportButton data={[{"value":"SCHEDULED","description":"Match is scheduled but has not started."},{"value":"IN_PROGRESS","description":"Match is currently in progress."},{"value":"SUSPENDED","description":"Match is suspended (temporarily stopped)."},{"value":"FINISHED","description":"Match has finished."},{"value":"CANCELLED","description":"Match has been cancelled."}]} fileName="MatchStatus" />
