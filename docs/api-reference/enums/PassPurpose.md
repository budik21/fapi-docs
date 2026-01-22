---
id: PassPurpose
title: PassPurposeEnum
sidebar_label: "Pass Purpose"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Categorization of passes by their tactical intent, highlighting their role in creating opportunities, advancing play, or maintaining possession.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value. |
| `COMMON` | A standard pass aimed at maintaining possession or connecting teammates. |
| `THROUGH` | A pass that cuts through the defense, intended for a teammate running into space. |
| `KEY` | A pass that creates a significant scoring opportunity, setting up a potential shot. |
| `LAY_OFF` | A pass where player passed the ball into the path of a teammate's run (Czech: Přihrávka do běhu). |
| `PROGRESSIVE` | A pass that advances the play significantly towards the opponent's goal. |
| `SWITCH` | A pass that moves the play across the field, usually from one wing to the other. |
| `FAST_BREAK` | A pass made to a teammate breaking into open space, initiating a rapid counterattack. |
| `ZONE_GAIN` | A pass that advances into a new zone of the field, not directed at a specific player. |
| `FLICK_ON` | A headed pass redirecting the ball backward, typically intended for a teammate behind. |
| `BOX_OUT` | A pass directed out from the attacking penalty area. |
| `FAIR_PLAY` | A deliberate pass into touch to stop play and allow treatment for an injured player. |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value."},{"value":"COMMON","description":"A standard pass aimed at maintaining possession or connecting teammates."},{"value":"THROUGH","description":"A pass that cuts through the defense, intended for a teammate running into space."},{"value":"KEY","description":"A pass that creates a significant scoring opportunity, setting up a potential shot."},{"value":"LAY_OFF","description":"A pass where player passed the ball into the path of a teammate's run (Czech: Přihrávka do běhu)."},{"value":"PROGRESSIVE","description":"A pass that advances the play significantly towards the opponent's goal."},{"value":"SWITCH","description":"A pass that moves the play across the field, usually from one wing to the other."},{"value":"FAST_BREAK","description":"A pass made to a teammate breaking into open space, initiating a rapid counterattack."},{"value":"ZONE_GAIN","description":"A pass that advances into a new zone of the field, not directed at a specific player."},{"value":"FLICK_ON","description":"A headed pass redirecting the ball backward, typically intended for a teammate behind."},{"value":"BOX_OUT","description":"A pass directed out from the attacking penalty area."},{"value":"FAIR_PLAY","description":"A deliberate pass into touch to stop play and allow treatment for an injured player."}]} fileName="PassPurpose" />
