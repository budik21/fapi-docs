---
id: PassType
title: PassTypeEnum
sidebar_label: "Pass Type"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Describes all possible types of the pass.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value. |
| `COMMON` | The common pass attempt was made |
| `CROSS` | The pass attempt was played through the air and the target was opponent's box |
| `TAP` | A short touch or quick pass over a small distance, often used in the setup of a free kick. |
| `CORNER_IN_SWINGER` | A corner kick played with a curve towards the goal. |
| `CORNER_OUT_SWINGER` | A corner kick played with a curve away from the goal. |
| `CORNER_STRAIGHT` | A corner kick played with little or no spin, resulting in a straight trajectory. |
| `CROSS_OVERHIT` | A cross that is hit too hard or too far, overshooting the intended target area. |
| `KEEPER_THROW` | A pass made by the goalkeeper by throwing the ball by hand to a teammate. |
| `FLICK_ON` | A first time pass (played with head or foot) when a player has their back to the opposition goal, intended to help the ball on to a team mate |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value."},{"value":"COMMON","description":"The common pass attempt was made"},{"value":"CROSS","description":"The pass attempt was played through the air and the target was opponent's box"},{"value":"TAP","description":"A short touch or quick pass over a small distance, often used in the setup of a free kick."},{"value":"CORNER_IN_SWINGER","description":"A corner kick played with a curve towards the goal."},{"value":"CORNER_OUT_SWINGER","description":"A corner kick played with a curve away from the goal."},{"value":"CORNER_STRAIGHT","description":"A corner kick played with little or no spin, resulting in a straight trajectory."},{"value":"CROSS_OVERHIT","description":"A cross that is hit too hard or too far, overshooting the intended target area."},{"value":"KEEPER_THROW","description":"A pass made by the goalkeeper by throwing the ball by hand to a teammate."},{"value":"FLICK_ON","description":"A first time pass (played with head or foot) when a player has their back to the opposition goal, intended to help the ball on to a team mate"}]} fileName="PassType" />
