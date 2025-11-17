---
id: MatchEventType
title: MatchEventTypeEnum
sidebar_label: "Match Event Type"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Enumeration of all possible types of events that can occur during a match.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `CARD` | A disciplinary action where the referee shows a player a yellow or red card for rule violations, indicating a warning or ejection from the game. |
| `FOUL` | An action by a player that violates the rules, resulting in disciplinary action by the referee. Handball is a specific kind of the foul. |
| `GOAL` | An event where the ball completely crosses the goal line between the goalposts and beneath the crossbar, without any fouls or rule violations, resulting in a score change for the attacking team. |
| `PASS` | An attempt by a player to transfer the ball to a teammate to maintain possession or advance play. |
| `PERIOD_START_END` | An event triggered by the referee to start, end, or temporarily suspend a specific period of play. |
| `SAVE` | An action by the goalkeeper to prevent the ball from entering the goal by legally blocking, catching, or deflecting a shot. |
| `SHOT` | An attempt by a player to score by striking the ball toward the opponent’s goal, regardless of accuracy or outcome. |
| `SUBSTITUTION` | An event in which one player is replaced by another on the field. |

<JsonExportButton data={[{"value":"CARD","description":"A disciplinary action where the referee shows a player a yellow or red card for rule violations, indicating a warning or ejection from the game."},{"value":"FOUL","description":"An action by a player that violates the rules, resulting in disciplinary action by the referee. Handball is a specific kind of the foul."},{"value":"GOAL","description":"An event where the ball completely crosses the goal line between the goalposts and beneath the crossbar, without any fouls or rule violations, resulting in a score change for the attacking team."},{"value":"PASS","description":"An attempt by a player to transfer the ball to a teammate to maintain possession or advance play."},{"value":"PERIOD_START_END","description":"An event triggered by the referee to start, end, or temporarily suspend a specific period of play."},{"value":"SAVE","description":"An action by the goalkeeper to prevent the ball from entering the goal by legally blocking, catching, or deflecting a shot."},{"value":"SHOT","description":"An attempt by a player to score by striking the ball toward the opponent’s goal, regardless of accuracy or outcome."},{"value":"SUBSTITUTION","description":"An event in which one player is replaced by another on the field."}]} fileName="MatchEventType" />
