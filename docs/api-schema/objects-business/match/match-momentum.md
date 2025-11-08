---
id:         match-momentum
title:      Match Momentum
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Dependencies
Object `Momentum` is a child of `Match` object.

## Business purpose
:::info
For any given minute of a match, the momentum expresses how likely it is that a specific team will score a goal. The data is relevant for `IN_MATCH` and `AFTER_MATCH` phase of the match.
:::

Higher values indicate greater pressure from a team and a higher probability of scoring a goal during that minute.

The momentum scale **ranges from 0 to 1** and expresses the level of threat (0 = no threat, 1 = maximal threat) and do not need any other adjustments. Keep in mind, the goals are sometimes scored in moments when a team’s momentum value is relatively low (or lower than the opponent’s). This can occur, for example, during a fast counterattack while the opponent is applying pressure. 

The momentum data is calculated based on players’ activities (passes, runs, tackles, shots, etc.) during the game and is published at one-minute intervals during the live phase of the match.

The momentum data is published backward - it means a minute of the game must be played first to generate a momentum values for this minute. The first data for a match  is published od the end of 1st minute of the game (at time 0:59).

## Object attributes
See the [Match Momentum object](../../../api-reference/objects/MatchMomentum)

## How to get momentum data
<Tabs>
    <TabItem value="query" label="Query" default>
        ```graphql showLineNumbers title="Query: Match Momentum Data" 
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
    <TabItem value="variables" label="Variables" default>
        ```json showLineNumbers title="Variables: Match Momentum Data"
        {
            //Snowflake ID for Czech 1st League Match Sparta Prague vs. Slavia Prague 
            "matchId": "1934986921185116160"
        }
        ```
    </TabItem>
    <TabItem value="response" label="Response" default>
        ```json showLineNumbers title="Response: Match Momentum Data"
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


