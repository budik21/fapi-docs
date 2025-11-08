---
id: CardType
title: CardTypeEnum
sidebar_label: "Card Type"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info
Indicates the type (yellow or red) of card awarded to a player or coach.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value |
| `YELLOW_CARD` | Represents a caution issued to a player for unsportsmanlike behavior or a minor foul. |
| `RED_CARD_DIRECT` | Represents a dismissal from the match, given for a serious foul without any previous caution. The player is sent-off and must leave both the pitch and bench area. |
| `RED_CARD_INDIRECT` | Represents a dismissal from the match due to a second yellow card. The player is sent-off and must leave both the pitch and bench area. |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value"},{"value":"YELLOW_CARD","description":"Represents a caution issued to a player for unsportsmanlike behavior or a minor foul."},{"value":"RED_CARD_DIRECT","description":"Represents a dismissal from the match, given for a serious foul without any previous caution. The player is sent-off and must leave both the pitch and bench area."},{"value":"RED_CARD_INDIRECT","description":"Represents a dismissal from the match due to a second yellow card. The player is sent-off and must leave both the pitch and bench area."}]} fileName="CardType" />
