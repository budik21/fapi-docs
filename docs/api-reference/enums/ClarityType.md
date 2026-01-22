---
id: ClarityType
title: ClarityTypeEnum
sidebar_label: "Clarity Type"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Describes all possibilities how many players, regardless of the team, were standing between the shooter and the goal
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value. |
| `EMPTY_GOAL` | The shot was taken at an empty goal with no goalkeeper or other players blocking it. |
| `FACING_GOALKEEPER_ONLY` | The shot was taken facing only the goalkeeper, with no other players blocking. |
| `ONE_AT_LEAST` | The shot was taken facing only the goalkeeper, with at least one other blocking players |
| `TWO_AT_LEAST` | The shot was taken facing only the goalkeeper, with at least two other blocking players |
| `MORE_THAN_TWO` | The shot was taken facing only the goalkeeper, with more than two other blocking players |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value."},{"value":"EMPTY_GOAL","description":"The shot was taken at an empty goal with no goalkeeper or other players blocking it."},{"value":"FACING_GOALKEEPER_ONLY","description":"The shot was taken facing only the goalkeeper, with no other players blocking."},{"value":"ONE_AT_LEAST","description":"The shot was taken facing only the goalkeeper, with at least one other blocking players"},{"value":"TWO_AT_LEAST","description":"The shot was taken facing only the goalkeeper, with at least two other blocking players"},{"value":"MORE_THAN_TWO","description":"The shot was taken facing only the goalkeeper, with more than two other blocking players"}]} fileName="ClarityType" />
