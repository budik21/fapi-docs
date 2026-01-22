---
id: ShotOutcome
title: ShotOutcomeEnum
sidebar_label: "Shot Outcome"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Describes all possible outcomes of a shot attempt.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value. |
| `ON_TARGET` | A shot that is directed toward the goal and would result in a goal if not stopped by the goalkeeper or blocked by a defender |
| `OFF_TARGET` | A shot that is directed toward the goal but misses, either going wide or over the crossbar |
| `BLOCKED` | A shot that is intercepted by a defender before it reaches the goal, preventing it from being on target or off target. |
| `DEFLECTED` | The shot is redirected by a player (teammate or opponent), altering its original path, which can still lead to any of the outcomes above (goal, save, miss, etc.). |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value."},{"value":"ON_TARGET","description":"A shot that is directed toward the goal and would result in a goal if not stopped by the goalkeeper or blocked by a defender"},{"value":"OFF_TARGET","description":"A shot that is directed toward the goal but misses, either going wide or over the crossbar"},{"value":"BLOCKED","description":"A shot that is intercepted by a defender before it reaches the goal, preventing it from being on target or off target."},{"value":"DEFLECTED","description":"The shot is redirected by a player (teammate or opponent), altering its original path, which can still lead to any of the outcomes above (goal, save, miss, etc.)."}]} fileName="ShotOutcome" />
