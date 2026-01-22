---
id: MatchSituation
title: MatchSituationEnum
sidebar_label: "Match Situation"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Describes all possible situations that can occur during the game, each of which can start an event.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value. |
| `OPEN_PLAY` | The game is in regular motion, outside of set-piece situations |
| `FREE_KICK` | A stationary ball due to a foul or other rule infringement |
| `CORNER_KICK` | A stationary ball in a corner area because the ball crosses the goal line, last touched by a defending player |
| `GOAL_KICK` | A stationary ball in a goal area after the opposing team has played the ball over the goal line. |
| `THROW_IN` | Throwing the ball in from the touchline after it has left the field. |
| `KICK_OFF` | A stationary ball in the center circle to start or restart the game after a goal. |
| `PENALTY_KICK` | A stationary ball placed 11 meters from the goal line, awarded as a result of a foul by the opposing team within their own penalty box. In this context, if related to a pass, it means that the penalty did not result in a typical shot but rather a pass to a teammate attempting to score |
| `DROP_BALL` | The referee restarts play by dropping the ball between players after a stoppage due to a neutral reason, such as an injury or external interference. The ball is dropped at the spot where play was stopped, allowing both teams an equal chance to regain possession |
| `CORNER_KICK_SHOT` | A shot was taken or the goal was scored directly from a corner kick |
| `GOALKEEPER_START` | Pass events after the goalkeeper collects the ball with their hands and then puts it on the ground |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value."},{"value":"OPEN_PLAY","description":"The game is in regular motion, outside of set-piece situations"},{"value":"FREE_KICK","description":"A stationary ball due to a foul or other rule infringement"},{"value":"CORNER_KICK","description":"A stationary ball in a corner area because the ball crosses the goal line, last touched by a defending player"},{"value":"GOAL_KICK","description":"A stationary ball in a goal area after the opposing team has played the ball over the goal line."},{"value":"THROW_IN","description":"Throwing the ball in from the touchline after it has left the field."},{"value":"KICK_OFF","description":"A stationary ball in the center circle to start or restart the game after a goal."},{"value":"PENALTY_KICK","description":"A stationary ball placed 11 meters from the goal line, awarded as a result of a foul by the opposing team within their own penalty box. In this context, if related to a pass, it means that the penalty did not result in a typical shot but rather a pass to a teammate attempting to score"},{"value":"DROP_BALL","description":"The referee restarts play by dropping the ball between players after a stoppage due to a neutral reason, such as an injury or external interference. The ball is dropped at the spot where play was stopped, allowing both teams an equal chance to regain possession"},{"value":"CORNER_KICK_SHOT","description":"A shot was taken or the goal was scored directly from a corner kick"},{"value":"GOALKEEPER_START","description":"Pass events after the goalkeeper collects the ball with their hands and then puts it on the ground"}]} fileName="MatchSituation" />
