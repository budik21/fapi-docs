---
id:         match-momentum
title:      Match Momentum
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Dependencies
Object `Momentum` is a child of `Match` object.

## Object description
See the [Match Momentum object](../../../api-reference/objects/MatchMomentum)

## Business purpose
:::info[no-header]
For any given minute of a match, the momentum expresses how likely it is that a specific team will score a goal. The data is relevant for `IN_MATCH` and `AFTER_MATCH` phase of the match.
:::

### Calculation & Frequency
The momentum data is calculated based on significant player activities (passes, runs, tackles, shots, etc.) and is published at **one-minute intervals** during the live phase of the match.

### Scale & Interpretation
The momentum scale **ranges from 0 to 1** and expresses the level of threat (0 = no threat, 1 = maximal threat). Higher values indicate greater pressure from a team and a statistically higher probability of scoring a goal during that minute. The values are normalized and do not require further adjustments.

### Data Representation
Momentum is provided per team (Home and Away). Additionally, the API provides a **combined value**, which expresses the difference between the home and away team momentum. A positive value indicates that the Home team is currently more dangerous, while a negative value favors the Away team.

:::tip[Momentum and match events relation]
Goals do not always correlate with high momentum values. A goal can occur when a team’s momentum is relatively low (or lower than the opponent’s), for example, during a fast counterattack while the opponent is applying pressure.
:::

### Data production

**The momentum data is published backward** - it means a minute of the game must be played first to generate a momentum values for this minute. The first data for a match is published a while after the first minute of the play is finished.

:::warning[Zero Values During Stoppages]
Momentum calculation relies on active gameplay. During significant match stoppages — such as **penalty kicks, goal celebrations, VAR reviews, or extensive injury treatments** — no actual momentum data is generated.

However, since the official match clock continues running during these events, the Football API populates these minutes with **zero values (`0`)**. This ensures that the momentum timeline remains fully synchronized with the real match time.

These zero values are temporary. Once play resumes, valid momentum data is **retroactively generated** for the stoppage period, and the initial zeros are replaced with actual business data.
:::

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


