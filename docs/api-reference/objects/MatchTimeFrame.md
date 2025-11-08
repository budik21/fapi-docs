---
id: MatchTimeFrame
title: MatchTimeFrameObject
sidebar_label: "Match Time Frame"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

## Fields

| Field | Type | Description |
|---|---|---|
| `phase` | [MatchPhase!](../enums/MatchPhase) | The phase of the match the data refers to. Represented as an enumerated value. |
| `period` | [MatchPeriod](../enums/MatchPeriod) | The period of the match the data refers to. Represented as an enumerated value. |
| `elapsedMinute` | `Int` | The minute of the match the data refers to. Additional (stoppage) time is included. For instance, the play time '49:15' of 1st half is recorded as '49'. |
| `elapsedSecond` | `Int` | The second within the minute of the match the data refers to, regardless of whether the minute is a part of regular or additional (stoppage) time. |
| `displayMinute` | `Int` | The ongoing minute within the period, capped by the maximum length of the period, which the data refers to. Additional (stoppage) time is not included. A display minute starts at 0 seconds of each minute (0:00 = 1st minute). For example, a play time of 0:15 is recorded as '1' (1st minute), and a play time of 49:15 in the first half is recorded as '45' (45th minute; due to the cap at the standard 45-minute length). |
| `displayMinuteAdditional` | `Int` | The minute within the period, added over the regular period length, which the data point refers to. For example, a play time of '49:15' in the 1st half is recorded as '5' (assuming a period length of 45 minutes). If regular minute is referred, the value is '0'. |
