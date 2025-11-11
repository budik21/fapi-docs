---
id: PitchZone
title: PitchZoneEnum
sidebar_label: "Pitch Zone"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info
Defines a high-level segment or area on the pitch where a specific event took place. This categorization divides the field into two main halves and further segments the attacking half for more detailed location tracking.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value. |
| `DEFENDING_HALF` | The event occured on the defending half |
| `ATTACKING_HALF` | The event occured on the attacking half |
| `ATTACKING_HALF_CENTER` | The event occured in the central part of the attacking half |
| `ATTACKING_HALF_LEFT` | The event occured on the left part of the attacking half |
| `ATTACKING_HALF_RIGHT` | The event occured on the right part of the attacking half |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value."},{"value":"DEFENDING_HALF","description":"The event occured on the defending half"},{"value":"ATTACKING_HALF","description":"The event occured on the attacking half"},{"value":"ATTACKING_HALF_CENTER","description":"The event occured in the central part of the attacking half"},{"value":"ATTACKING_HALF_LEFT","description":"The event occured on the left part of the attacking half"},{"value":"ATTACKING_HALF_RIGHT","description":"The event occured on the right part of the attacking half"}]} fileName="PitchZone" />
