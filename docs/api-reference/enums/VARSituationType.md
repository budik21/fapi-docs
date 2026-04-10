---
id: VARSituationType
title: VARSituationTypeEnum
sidebar_label: "VARSituation Type"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | The VAR situation type is not specified |
| `GOAL_UNDER_REVIEW` | A goal was awarded by an on-pitch decision. VAR is reviewing whether the goal was scored in accordance with the rules (Decision confirmed: Goal stands; Decision cancelled: Goal disallowed). |
| `CHECKING_DISALLOWED_GOAL` | A goal was scored but disallowed by an on-pitch decision. VAR is reviewing the referee's decision to disallow the goal (Decision confirmed: Goal remains disallowed; Decision cancelled: Goal is awarded). |
| `PENALTY_UNDER_REVIEW` | A penalty kick was awarded by an on-pitch decision. VAR is reviewing the referee's decision to award the penalty kick (Decision confirmed: Penalty stands; Decision cancelled: No penalty). |
| `POSSIBLE_PENALTY` | No penalty was awarded by an on-pitch decision. VAR is investigating the suspicious situation to determine if it should result in a penalty kick (Decision confirmed: No penalty; Decision cancelled: Penalty awarded). |
| `POSSIBLE_RED_CARD` | No red card was issued by an on-pitch decision. VAR is investigating the suspicious situation to determine if it should result in a red card (Decision confirmed: No red card; Decision cancelled: Red card awarded). |
| `RED_CARD_UNDER_REVIEW` | A red card was issued by an on-pitch decision. VAR is reviewing the referee's decision to send off a player (Decision confirmed: Red card stands; Decision cancelled: Red card reverted). |
| `POSSIBLE_MISTAKEN_IDENTITY` | VAR is investigating the suspicious situation of a possible mistaken identity in the sending-off of a player (Decision confirmed: No mistaken; Decision cancelled: Identity was mistaken). |
| `OTHER_REASON` | VAR is being used for other reason |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"The VAR situation type is not specified"},{"value":"GOAL_UNDER_REVIEW","description":"A goal was awarded by an on-pitch decision. VAR is reviewing whether the goal was scored in accordance with the rules (Decision confirmed: Goal stands; Decision cancelled: Goal disallowed)."},{"value":"CHECKING_DISALLOWED_GOAL","description":"A goal was scored but disallowed by an on-pitch decision. VAR is reviewing the referee's decision to disallow the goal (Decision confirmed: Goal remains disallowed; Decision cancelled: Goal is awarded)."},{"value":"PENALTY_UNDER_REVIEW","description":"A penalty kick was awarded by an on-pitch decision. VAR is reviewing the referee's decision to award the penalty kick (Decision confirmed: Penalty stands; Decision cancelled: No penalty)."},{"value":"POSSIBLE_PENALTY","description":"No penalty was awarded by an on-pitch decision. VAR is investigating the suspicious situation to determine if it should result in a penalty kick (Decision confirmed: No penalty; Decision cancelled: Penalty awarded)."},{"value":"POSSIBLE_RED_CARD","description":"No red card was issued by an on-pitch decision. VAR is investigating the suspicious situation to determine if it should result in a red card (Decision confirmed: No red card; Decision cancelled: Red card awarded)."},{"value":"RED_CARD_UNDER_REVIEW","description":"A red card was issued by an on-pitch decision. VAR is reviewing the referee's decision to send off a player (Decision confirmed: Red card stands; Decision cancelled: Red card reverted)."},{"value":"POSSIBLE_MISTAKEN_IDENTITY","description":"VAR is investigating the suspicious situation of a possible mistaken identity in the sending-off of a player (Decision confirmed: No mistaken; Decision cancelled: Identity was mistaken)."},{"value":"OTHER_REASON","description":"VAR is being used for other reason"}]} fileName="VARSituationType" />
