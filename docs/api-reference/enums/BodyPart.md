---
id: BodyPart
title: BodyPartEnum
sidebar_label: "Body Part"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Describes all possible body parts used by a player during the game
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value. |
| `FOOT` | Player used a foot for the action, but we don't know which one. |
| `LEFT_FOOT` | Player used the left foot for the action. |
| `RIGHT_FOOT` | Player used the right foot for the action. |
| `BODY` | Player used the body for the action (chest, hip, shoulder), but we don't know which one. |
| `CHEST` | Player used the chest for the action. |
| `SHOULDER` | Player used the shoulder for the action. |
| `HIP` | Player used the hip (CZ: bok) for the action. |
| `BACK` | Player used the back (CZ: záda) for the action. |
| `BACKSIDE` | Player used the backside (CZ: zadek) for the action. |
| `ABDOMEN` | Player used the abdomen (CZ: břicho) for the action. |
| `HAND` | Player used a hand for the action, but we don't know which one. |
| `LEFT_HAND` | Player used the left hand for the action. |
| `RIGHT_HAND` | Player used the right hand for the action. |
| `HANDS` | Player used both hands for the action. |
| `FEET` | Player used feet for the action. |
| `UNKNOWN` | Player used an unknown part of the body. |
| `HEAD` | Player used the head for the action. |
| `OTHER` | Player used another body part than feet or head for the action. |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value."},{"value":"FOOT","description":"Player used a foot for the action, but we don't know which one."},{"value":"LEFT_FOOT","description":"Player used the left foot for the action."},{"value":"RIGHT_FOOT","description":"Player used the right foot for the action."},{"value":"BODY","description":"Player used the body for the action (chest, hip, shoulder), but we don't know which one."},{"value":"CHEST","description":"Player used the chest for the action."},{"value":"SHOULDER","description":"Player used the shoulder for the action."},{"value":"HIP","description":"Player used the hip (CZ: bok) for the action."},{"value":"BACK","description":"Player used the back (CZ: záda) for the action."},{"value":"BACKSIDE","description":"Player used the backside (CZ: zadek) for the action."},{"value":"ABDOMEN","description":"Player used the abdomen (CZ: břicho) for the action."},{"value":"HAND","description":"Player used a hand for the action, but we don't know which one."},{"value":"LEFT_HAND","description":"Player used the left hand for the action."},{"value":"RIGHT_HAND","description":"Player used the right hand for the action."},{"value":"HANDS","description":"Player used both hands for the action."},{"value":"FEET","description":"Player used feet for the action."},{"value":"UNKNOWN","description":"Player used an unknown part of the body."},{"value":"HEAD","description":"Player used the head for the action."},{"value":"OTHER","description":"Player used another body part than feet or head for the action."}]} fileName="BodyPart" />
