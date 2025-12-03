---
id:         stats-player-match
title:      Match Player stats
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Dependencies
Object `playerstats` is a child of `Match` object.

## Object description
See [Player Match Stats](./../../../api-reference/objects/PlayerMatchStatsV2) chapter.

## Business purpose
:::info[no-header]
The `playerstats` object aggregates performance statistics for all players participating in a match. Each statistic is composed of a metric key (such as `SHOTS_TOTAL` or `GOALS_PREVENTED`) and its corresponding numeric value (integer or float).

For a complete list of supported metrics, please refer to the [Player Match Stats Enum](./../../../api-reference/enums/PlayerMatchMetric).

**Note:** Player match statistics are currently available for selected competitions only (200+ as of December 2025).
:::

## Ranking


## How to get the Player Match Stat data
### Simple player match stats structure
:::tip[Data ordering]
You can control the response order using the `order` parameter. This parameter accepts an array of metric and direction pairs, allowing for multi-level sorting.

If the primary sorting criterion results in a tie, the subsequent criteria in the array determine the final order.
:::
<Tabs>
    <TabItem value="query" label="Query" default>
    ```graphql showLineNumbers title="Query: Player match statistics with ordering" 
    query Match ($matchId: ID!) {
      match(id: $matchId) {    
        id
        homeTeam{
          localizedName {
            text
          }
        }
        awayTeam{
          localizedName {
            text
          }
        }
        playerStats (
          order: [
            {
              metric: SHOTS_TOTAL
              direction: DESC
            },
            {
              metric: SHOTS_ON_TARGET
                direction: DESC
            }
          ])
         {
          player {
            localizedName {
              text
            }
          }      
          shotsTotal {        
            value        
          }
          shotsOnTarget {      
            value        
          }
        }    
      }
    }
    ```
    </TabItem>
    <TabItem value="variables" label="Variables" default>
    ```json showLineNumbers title="Variables: ID of desired match"
    {
        //Premier League, Chelsea - Arsenal 1:1, 30.11.2025
        "matchId": "1935259480686333952"
    }
    ```
    </TabItem>
    <TabItem value="response" label="Response" default>
    ```json showLineNumbers title="Response: Ordered players by their stats"
    {
      "data": {
        "match": {
          "id": "1935259480686333952",
          "homeTeam": {
            "localizedName": {
              "text": "Chelsea"
            }
          },
          "awayTeam": {
            "localizedName": {
              "text": "Arsenal"
            }
          },
          "playerStats": [
            {
              "player": {
                "localizedName": {
                  "text": "Merino Zazon Mikel"
                }
              },
              "shotsTotal": {
                "value": 3
              },
              "shotsOnTarget": {
                "value": 2
              }
            },
            {
              "player": {
                "localizedName": {
                  "text": "Saka Bukayo"
                }
              },
              "shotsTotal": {
                "value": 3
              },
              "shotsOnTarget": {
                "value": 1
              }
            },
            {
              "player": {
                "localizedName": {
                  "text": "Neto Pedro"
                }
              },
              "shotsTotal": {
                "value": 3
              },
              "shotsOnTarget": {
                "value": 0
              }
            },
            "..."
            "..."
          ]
        }
      }
    }
    ```
    </TabItem>
</Tabs>

### Player match stats using ranking

