---
id: PassDistance
title: PassDistanceEnum
sidebar_label: "Pass Distance"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Describes all lengths of the pass attempt.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value. |
| `SHORT` | The pass attempt was made on the medium distance (&lt;10 m) |
| `MEDIUM` | The pass attempt was made on the short medium (10+ m; &lt;35 m) |
| `LONG` | The pass attempt was made on the long distance (35+ m) |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value."},{"value":"SHORT","description":"The pass attempt was made on the medium distance (&lt;10 m)"},{"value":"MEDIUM","description":"The pass attempt was made on the short medium (10+ m; &lt;35 m)"},{"value":"LONG","description":"The pass attempt was made on the long distance (35+ m)"}]} fileName="PassDistance" />
