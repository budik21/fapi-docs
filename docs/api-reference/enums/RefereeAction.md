---
id: RefereeAction
title: RefereeActionEnum
sidebar_label: "Referee Action"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info
Defines the key actions performed by the referee that officially mark the beginning or end of a specific match period (half, extra time, etc.).
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value. |
| `PERIOD_START` | The referee starts the period |
| `PERIOD_END` | The referee ends the period |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value."},{"value":"PERIOD_START","description":"The referee starts the period"},{"value":"PERIOD_END","description":"The referee ends the period"}]} fileName="RefereeAction" />
