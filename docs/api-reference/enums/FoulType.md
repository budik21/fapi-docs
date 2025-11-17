---
id: FoulType
title: FoulTypeEnum
sidebar_label: "Foul Type"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Specifies the type of foul committed during a football match, categorizing rule violations by their nature and severity.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents NULL or UNKNOWN value. |
| `COMMON` | The common foul was made. |
| `HANDBALL` | The player violates the rule and played the ball with the hand. |
| `TRIPPING` | When a player uses their leg to make an opponent fall. |
| `PUSHING` | Using hands or body forcefully to shove an opponent. |
| `HOLDING` | Grabbing an opponent's body or kit to prevent movement. |
| `CHARGING` | Colliding into an opponent unfairly, often when not challenging for the ball. |
| `HIGH_FOOT` | Raising a foot dangerously near an opponent's head or upper body. |
| `SIX_SECOND_VIOLATION` | The goalkeeper holds the ball more than six seconds (DEPRECATED after the rules have changed in 2025). |
| `DANGEROUS_PLAY` | Any action that endangers another player, such as attempting a kick in a dangerous position. |
| `BACK_PASS` | A deliberate back pass (illegal pass) that is picked up or handled by the goalkeeper. |
| `SIMULATION` | The player violated the rule against unsportsmanlike behavior by simulating being fouled. |
| `OBSTRUCTION` | The foul committed was for obstruction. |
| `ELBOWING` | A foul where a player strikes an opponent with the arm, usually during an aerial duel. |
| `REFEREE_ABUSE` | A foul is awarded due to inappropriate behavior of the player towards the referee. |
| `DISSENT` | Showing disagreement with the referee, often verbally or through gestures. |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents NULL or UNKNOWN value."},{"value":"COMMON","description":"The common foul was made."},{"value":"HANDBALL","description":"The player violates the rule and played the ball with the hand."},{"value":"TRIPPING","description":"When a player uses their leg to make an opponent fall."},{"value":"PUSHING","description":"Using hands or body forcefully to shove an opponent."},{"value":"HOLDING","description":"Grabbing an opponent's body or kit to prevent movement."},{"value":"CHARGING","description":"Colliding into an opponent unfairly, often when not challenging for the ball."},{"value":"HIGH_FOOT","description":"Raising a foot dangerously near an opponent's head or upper body."},{"value":"SIX_SECOND_VIOLATION","description":"The goalkeeper holds the ball more than six seconds (DEPRECATED after the rules have changed in 2025)."},{"value":"DANGEROUS_PLAY","description":"Any action that endangers another player, such as attempting a kick in a dangerous position."},{"value":"BACK_PASS","description":"A deliberate back pass (illegal pass) that is picked up or handled by the goalkeeper."},{"value":"SIMULATION","description":"The player violated the rule against unsportsmanlike behavior by simulating being fouled."},{"value":"OBSTRUCTION","description":"The foul committed was for obstruction."},{"value":"ELBOWING","description":"A foul where a player strikes an opponent with the arm, usually during an aerial duel."},{"value":"REFEREE_ABUSE","description":"A foul is awarded due to inappropriate behavior of the player towards the referee."},{"value":"DISSENT","description":"Showing disagreement with the referee, often verbally or through gestures."}]} fileName="FoulType" />
