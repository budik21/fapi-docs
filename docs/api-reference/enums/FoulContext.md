---
id: FoulContext
title: FoulContextEnum
sidebar_label: "Foul Context"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info
Classifies a foul based on the context or situation in which it was committed during the match.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents NULL or UNKNOWN value. |
| `TACKLE` | The foul was commited during the tackling the opponent player (on the ground) |
| `AERIAL_DUEL` | The foul was commited during the aerial duel |
| `OFF_THE_BALL` | Foul committed away from where the ball is being played |
| `OFF_THE_PLAY` | Foul committed when the play is interrupted (a foul before corner kick, throw-in, free kick etc.) |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents NULL or UNKNOWN value."},{"value":"TACKLE","description":"The foul was commited during the tackling the opponent player (on the ground)"},{"value":"AERIAL_DUEL","description":"The foul was commited during the aerial duel"},{"value":"OFF_THE_BALL","description":"Foul committed away from where the ball is being played"},{"value":"OFF_THE_PLAY","description":"Foul committed when the play is interrupted (a foul before corner kick, throw-in, free kick etc.)"}]} fileName="FoulContext" />
