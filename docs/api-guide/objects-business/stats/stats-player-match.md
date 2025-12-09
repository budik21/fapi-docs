---
id:         stats-player-match
title:      Match Player stats
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Dependencies
Object `playerStats` is a child of `Match` object.

## Object description
See [Player Match Stats](./../../../api-reference/objects/PlayerMatchStatsV2) chapter.

## Business purpose
:::info[no-header]
The `playerStats` object aggregates performance statistics for all players participating in a match. Each statistic is composed of a metric key (such as `SHOTS_TOTAL` or `GOALS_PREVENTED`) and its corresponding numeric value (integer or float).

For a complete list of supported metrics, please refer to the [Player Match Stats Enum](./../../../api-reference/enums/PlayerMatchMetric).

**Note:** Player match statistics are currently available for selected competitions only (200+ as of December 2025).
:::

## Ranking

In addition to the raw metric value, ranking attributes are available for each metric. These attributes allow you to determine the position of a specific metric value relative to all other available values (players). This helps identify the best or worst performers for a specific metric within the entire match or within a specific team.

The following attributes are available:

* **rankOverall** - The rank of the player among all players in the match based on the specific metric value. If two or more players share the same value, they are assigned the same rank.
* **rankOverallComposite** - Similar to `rankOverall`, but uses a secondary metric to resolve ties (where applicable). For example, if two or more players have the same number of `PASSES_ACCURATE`, the player with the lower `PASSES_TOTAL` receives the higher rank (because they have better passes accuracy). If no secondary metric is applicable, `rankOverallComposite` returns the same rank as `rankOverall`. 
* **rankInTeam** - The rank of the player within their own team based on the metric value. If two or more players share the same value, they are assigned the same rank. 
* **rankInTeamComposite** - The same logic as `rankOverallComposite` (resolving ties via secondary metrics), but applied only within the player's team. If no secondary metric is applicable, `rankOverallTeampComposite` returns the same rank as `rankTeamOverall`.

### Tie-Breaking Criteria

The following lists detail metrics that utilize a secondary criterion to resolve ranking ties.

#### Lower Secondary Metric
For positive statistics (e.g., accuracy, won duels), a player receives a better ranking if they have a **lower value** in the secondary metric. This implies higher efficiency (same success count with fewer total attempts).

* `PASSES_ACCURATE` (secondary metric: `PASSES_TOTAL`)
* `PASSES_FINAL_THIRD_ACCURATE` (secondary metric: `PASSES_FINAL_THIRD_TOTAL`)
* `LONG_BALLS_ACCURATE` (secondary metric: `LONG_BALLS_TOTAL`)
* `CROSSES_ACCURATE` (secondary metric: `CROSSES_TOTAL`)
* `PASSES_THROUGH_ACCURATE` (secondary metric: `PASSES_THROUGH_TOTAL`)
* `SHOTS_ON_TARGET` (secondary metric: `SHOTS_TOTAL`)
* `KEEPER_SWEEPER_ACCURATE` (secondary metric: `KEEPER_SWEEPER_TOTAL`)
* `GOAL_KICKS_ACCURATE` (secondary metric: `GOAL_KICKS_TOTAL`)
* `KEEPER_THROWS_ACCURATE` (secondary metric: `KEEPER_THROWS_TOTAL`)
* `DUELS_WON` (secondary metric: `DUELS_TOTAL`)
* `TACKLES_WON` (secondary metric: `TACKLES_TOTAL`)
* `DRIBBLES_WON` (secondary metric: `DRIBBLES_TOTAL`)
* `DUELS_AERIAL_WON` (secondary metric: `DUELS_AERIAL_TOTAL`)
* `DUELS_GROUND_WON` (secondary metric: `DUELS_GROUND_TOTAL`)

#### Higher Secondary Metric
For negative statistics (e.g., lost duels), the logic is inverted. A player receives a better ranking if they have a **higher value** in the secondary metric. This implies a lower error rate (same error count relative to a higher volume of actions).

* `DRIBBLES_LOST` (secondary metric: `DRIBBLES_TOTAL`)
* `TACKLES_LOST` (secondary metric: `TACKLES_TOTAL`)
* `DUELS_AERIAL_LOST` (secondary metric: `DUELS_AERIAL_TOTAL`)
* `DUELS_GROUND_LOST` (secondary metric: `DUELS_GROUND_TOTAL`)

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
:::tip[Difference between Ranking and Composite Ranking]
The example below illustrates the distinction between standard `rank` and `rankComposite`.

Four players share the same `LONG_PASS_ACCURATE` value of 2: James Reece, Cucurella Marc, Rice Declan, and Chalobah Trevoh. Based solely on this metric, they all share **4th place** (indicated by `rankOverall`).

However, `rankComposite` resolves ties by incorporating a secondary metric: `LONG_PASSES_TOTAL`. In this context, a lower total count implies higher long pass accuracy.
* **James and Cucurella** remain tied for **4th place**, as they both have 3 total long passes.
* **Rice** is ranked **6th** (4 total long passes, lower accuracy as James and Cucurella).
* **Chalobah** is ranked **7th** (5 total long passes, lower accuracy as Rice).
:::

<Tabs>
    <TabItem value="query1" label="Query" default>
    ```graphql showLineNumbers title="Query: Player match statistics using ranking"
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
                metric: LONG_BALLS_ACCURATE
                direction: DESC
              }          
            ]){
              player {
                localizedName {
                  text
                }
              }      
              longBallsAccurate {
                value
                rankOverall
                rankOverallComposite        
              }
              longBallsTotal {            
                value 
                rankOverall
                rankOverallComposite               
              }
            }    
          }
        }    
    ```
    </TabItem>
    <TabItem value="variables1" label="Variables" default>
    ```json showLineNumbers title="Variables: ID of desired match"
    {
        //Premier League, Chelsea - Arsenal 1:1, 30.11.2025
        "matchId": "1935259480686333952"
    }
    ```
    </TabItem>
    <TabItem value="response1" label="Response" default>
    ```json showLineNumbers title="Response: Diffeerence between rankOverall and rankOverallComposite"
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
                                "text": "James Reece"
                            }
                        },
                        "longBallsAccurate": {
                            "value": 2,
                            "rankOverall": 4,
                            "rankOverallComposite": 4
                        },
                        "longBallsTotal": {
                            "value": 3,
                            "rankOverall": 7,
                            "rankOverallComposite": 7
                        }
                    },
                    {
                        "player": {
                            "localizedName": {
                                "text": "Cucurella Marc"
                            }
                        },
                        "longBallsAccurate": {
                            "value": 2,
                            "rankOverall": 4,
                            "rankOverallComposite": 4
                        },
                        "longBallsTotal": {
                            "value": 3,
                            "rankOverall": 7,
                            "rankOverallComposite": 7
                        }
                    },
                    {
                        "player": {
                            "localizedName": {
                                "text": "Rice Declan"
                            }
                        },
                        "longBallsAccurate": {
                            "value": 2,
                            "rankOverall": 4,
                            "rankOverallComposite": 6
                        },
                        "longBallsTotal": {
                            "value": 4,
                            "rankOverall": 6,
                            "rankOverallComposite": 6
                        }
                    },
                    {
                        "player": {
                            "localizedName": {
                                "text": "Chalobah Trevoh"
                            }
                        },
                        "longBallsAccurate": {
                            "value": 2,
                            "rankOverall": 4,
                            "rankOverallComposite": 7
                        },
                        "longBallsTotal": {
                            "value": 9,
                            "rankOverall": 3,
                            "rankOverallComposite": 3
                        }
                    }
                ]
            }
        }
    }
    ```
    </TabItem>
</Tabs>