---
id: GoalDisallowedReason
title: GoalDisallowedReasonEnum
sidebar_label: "Goal Disallowed Reason"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Indicates the reason why a goal was disallowed by the referee.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value |
| `HANDBALL` | The goal was scored using a hand/arm (intentional or unintentional) |
| `OFFSIDE` | The goal was scored following an offside position |
| `FOUL` | The goal was scored after a foul committred by an opponent |
| `BALL_OUT_OF_PLAY` | The ball had crossed the goal line or touchline before the goal was scored |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value"},{"value":"HANDBALL","description":"The goal was scored using a hand/arm (intentional or unintentional)"},{"value":"OFFSIDE","description":"The goal was scored following an offside position"},{"value":"FOUL","description":"The goal was scored after a foul committred by an opponent"},{"value":"BALL_OUT_OF_PLAY","description":"The ball had crossed the goal line or touchline before the goal was scored"}]} fileName="GoalDisallowedReason" />
