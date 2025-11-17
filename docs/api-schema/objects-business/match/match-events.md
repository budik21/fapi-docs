---
id:         match-events
title:      Match Events
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Dependencies
Object `MatchEvents` is a child of `Match` object.

## Business purpose
:::info[no-header]
Represents all events occurring during a match—such as shots, passes, fouls, and more—captured with a highly detailed set of data. This level of granularity allows a clear understanding of what is happening (or has happened) during the match.
The data is relevant for `IN_MATCH` and `AFTER_MATCH` phase of the match.
:::

Each event is described by one unique enumerated [event type](../../../api-reference/enums/MatchEventType) which express what has happened followed by set of [common attributes](../../../api-reference/objects/MatchEventsResult)

Additionally, each event type has its own specific attributes that extend the common ones. 

## Object attributes
See the [Match Event object](../../../api-reference/objects/MatchEventsResult)

## How to get match event data: FOUL
<Tabs>
    <TabItem value="queryFOUL" label="Query" default>
        ```graphql showLineNumbers title="Query: Match Event data, event FOUL" 
        query Match {
          match(id: $matchId) {
            momentum {
              entries {
                timeFrame {
                  phase
                  period
                  elapsedMinute
                  elapsedSecond
                  displayMinute
                  displayMinuteAdditional
                }
                homeValue
                awayValue
                combinedValue
              }
            }
          }
        }
        ```
    </TabItem>
    <TabItem value="variablesFOUL" label="Variables" default>
        ```json showLineNumbers title="Variables: Match Event data, event FOUL"
        {
            //Snowflake ID for Czech 1st League Match Sparta Prague vs. Slavia Prague 
            "matchId": "1934986921185116160"
        }
        ```
    </TabItem>
    <TabItem value="responseFOUL" label="Response" default>
        ```json showLineNumbers title="Response: Match Event data, event FOUL"
        {
          "data": {
            "match": {
              "momentum": {
                "entries": [
                  {
                    "timeFrame": {
                      "phase": "IN_MATCH",
                      "period": "HALF_FIRST",
                      "elapsedMinute": 0,
                      "elapsedSecond": 59,
                      "displayMinute": 1,
                      "displayMinuteAdditional": 0
                    },
                    "homeValue": 0.040481,
                    "awayValue": 0.012409,
                    "combinedValue": 0.028072
                  },
                  {
                    "timeFrame": {
                      "phase": "IN_MATCH",
                      "period": "HALF_FIRST",
                      "elapsedMinute": 1,
                      "elapsedSecond": 59,
                      "displayMinute": 2,
                      "displayMinuteAdditional": 0
                    },
                    "homeValue": 0.037515,
                    "awayValue": 0.037522,
                    "combinedValue": -0.000007
                  },
                  ...		  
                  {
                    "timeFrame": {
                      "phase": "IN_MATCH",
                      "period": "HALF_SECOND",
                      "elapsedMinute": 94,
                      "elapsedSecond": 59,
                      "displayMinute": 90,
                      "displayMinuteAdditional": 5
                    },
                    "homeValue": 0.23536,
                    "awayValue": 0.004815,
                    "combinedValue": 0.230545
                  },
                  {
                    "timeFrame": {
                      "phase": "IN_MATCH",
                      "period": "HALF_SECOND",
                      "elapsedMinute": 95,
                      "elapsedSecond": 59,
                      "displayMinute": 90,
                      "displayMinuteAdditional": 6
                    },
                    "homeValue": 0.512482,
                    "awayValue": 0.029995,
                    "combinedValue": 0.482486
                  }
                ]
              }
            }
          }
        }
        ```
    </TabItem>
</Tabs>

## How to get match event data: CARD
<Tabs>
    <TabItem value="queryCARD" label="Query" default>
        ```graphql showLineNumbers title="Query: Match Event data, event CARD" 
        query Match {
          match(id: $matchId) {
            momentum {
              entries {
                timeFrame {
                  phase
                  period
                  elapsedMinute
                  elapsedSecond
                  displayMinute
                  displayMinuteAdditional
                }
                homeValue
                awayValue
                combinedValue
              }
            }
          }
        }
        ```
    </TabItem>
    <TabItem value="variablesCARD" label="Variables" default>
        ```json showLineNumbers title="Variables: Match Event data, event CARD"
        {
            //Snowflake ID for Czech 1st League Match Sparta Prague vs. Slavia Prague 
            "matchId": "1934986921185116160"
        }
        ```
    </TabItem>
    <TabItem value="responseCARD" label="Response" default>
        ```json showLineNumbers title="Response: Match Event data, event CARD"
        {
          "data": {
            "match": {
              "momentum": {
                "entries": [
                  {
                    "timeFrame": {
                      "phase": "IN_MATCH",
                      "period": "HALF_FIRST",
                      "elapsedMinute": 0,
                      "elapsedSecond": 59,
                      "displayMinute": 1,
                      "displayMinuteAdditional": 0
                    },
                    "homeValue": 0.040481,
                    "awayValue": 0.012409,
                    "combinedValue": 0.028072
                  },
                  {
                    "timeFrame": {
                      "phase": "IN_MATCH",
                      "period": "HALF_FIRST",
                      "elapsedMinute": 1,
                      "elapsedSecond": 59,
                      "displayMinute": 2,
                      "displayMinuteAdditional": 0
                    },
                    "homeValue": 0.037515,
                    "awayValue": 0.037522,
                    "combinedValue": -0.000007
                  },
                  ...		  
                  {
                    "timeFrame": {
                      "phase": "IN_MATCH",
                      "period": "HALF_SECOND",
                      "elapsedMinute": 94,
                      "elapsedSecond": 59,
                      "displayMinute": 90,
                      "displayMinuteAdditional": 5
                    },
                    "homeValue": 0.23536,
                    "awayValue": 0.004815,
                    "combinedValue": 0.230545
                  },
                  {
                    "timeFrame": {
                      "phase": "IN_MATCH",
                      "period": "HALF_SECOND",
                      "elapsedMinute": 95,
                      "elapsedSecond": 59,
                      "displayMinute": 90,
                      "displayMinuteAdditional": 6
                    },
                    "homeValue": 0.512482,
                    "awayValue": 0.029995,
                    "combinedValue": 0.482486
                  }
                ]
              }
            }
          }
        }
        ```
    </TabItem>
</Tabs>


