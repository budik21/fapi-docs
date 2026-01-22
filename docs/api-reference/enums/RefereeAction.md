---
id: RefereeAction
title: RefereeActionEnum
sidebar_label: "Referee Action"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Defines the key actions performed by the referee that officially mark the beginning or end of a specific match period (half, extra time, etc.).
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value. |
| `PERIOD_START` | The referee starts the period |
| `PERIOD_END` | The referee ends the period |
| `PERIOD_SUSPENSION_START` | The referee stops the period due to extraordinary circumstances. The match is suspended from this moment. |
| `PERIOD_SUSPENSION_END` | The referee restarts the period after it was stopped due to extraordinary circumstances. The match is resumed from this moment. |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value."},{"value":"PERIOD_START","description":"The referee starts the period"},{"value":"PERIOD_END","description":"The referee ends the period"},{"value":"PERIOD_SUSPENSION_START","description":"The referee stops the period due to extraordinary circumstances. The match is suspended from this moment."},{"value":"PERIOD_SUSPENSION_END","description":"The referee restarts the period after it was stopped due to extraordinary circumstances. The match is resumed from this moment."}]} fileName="RefereeAction" />
