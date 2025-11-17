---
id: BoxArea
title: BoxAreaEnum
sidebar_label: "Box Area"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Represents the location on the pitch where the match event occurred, described in relation to the penalty areas of both teams.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value. |
| `OPPONENTS_SIX_YARD_BOX` | The event occured inside of the six-yard box of the opponent |
| `OPPONENTS_PENALTY_BOX` | The event occured inside of the penalty box of the opponent, but was outside of the six-yard box |
| `OWN_SIX_YARD_BOX` | The event occured inside of the six-yard box of the own team |
| `OWN_PENALTY_BOX` | The event occured inside of the penalty box of the own team, but was outside of the six-yard box |
| `BETWEEN_PENALTY_BOXES` | The event occured anywhere between both penalty boxes |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value."},{"value":"OPPONENTS_SIX_YARD_BOX","description":"The event occured inside of the six-yard box of the opponent"},{"value":"OPPONENTS_PENALTY_BOX","description":"The event occured inside of the penalty box of the opponent, but was outside of the six-yard box"},{"value":"OWN_SIX_YARD_BOX","description":"The event occured inside of the six-yard box of the own team"},{"value":"OWN_PENALTY_BOX","description":"The event occured inside of the penalty box of the own team, but was outside of the six-yard box"},{"value":"BETWEEN_PENALTY_BOXES","description":"The event occured anywhere between both penalty boxes"}]} fileName="BoxArea" />
