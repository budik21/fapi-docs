---
id: PassOutcome
title: PassOutcomeEnum
sidebar_label: "Pass Outcome"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Describes all possible outcomes of a pass attempt.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value. |
| `SUCCESS` | The pass reaches its intended target (receiver) without interception, allowing the team to maintain possession. |
| `INTERCEPTED` | The pass is intercepted by an opponent, disrupting the play and resulting in a loss of possession. |
| `OUT_OF_BOUND` | The pass goes out of bounds, leading to a throw-in, corner kick, or goal kick, depending on where it left the field. |
| `NOT_COMPLETED` | The pass does not reach its intended target (receiver) from any reason |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value."},{"value":"SUCCESS","description":"The pass reaches its intended target (receiver) without interception, allowing the team to maintain possession."},{"value":"INTERCEPTED","description":"The pass is intercepted by an opponent, disrupting the play and resulting in a loss of possession."},{"value":"OUT_OF_BOUND","description":"The pass goes out of bounds, leading to a throw-in, corner kick, or goal kick, depending on where it left the field."},{"value":"NOT_COMPLETED","description":"The pass does not reach its intended target (receiver) from any reason"}]} fileName="PassOutcome" />
