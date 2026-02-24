---
id:         stats-player-aggregated
title:      Aggregated Players' statistics
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Dependencies
There is no strict dependency on any existing object.

However, the `seasonStagePlayerStats` object is typically used in conjunction with the [SeasonStage](./../seasonStage.md) or [Season](./../season.md) object, as this is the most common way to aggregate players' stats.

## Business purpose
:::info[no-header]
The `seasonStagePlayerStats` object **aggregates players' stats data** for one or more [SeasonStages](./../seasonStage.md). If all stages of a specific season are included, the data represents the statistics for the entire [Season](./../season.md).

The aggregation **involves summing or averaging all individual players' metrics recorded for the player in matches played within the specified Season Stage(s).**
:::

:::warning[Future Scope]
It will be also possible to slice aggregated data by scopes other than `Season Stage`, for example, by a player's full Career or all seasons within a single Club. Please note that **this functionality is not currently implemented (as of February 2026)** and will be available in a future release.
:::

### Supported metrics
**Aggregation can be performed on [any metric defined](./../../../api-reference/enums/PlayerMatchMetric.md) as a player metric.**

In the vast majority of cases, the **SUM** aggregation function is used. However, for metrics where summation is not logical, an appropriate alternative is applied. For example, the [Rating](./../match/player-rating.md) metric is calculated as an **AVERAGE**.

### Data Slicing (Filters)
Aggregated statistics can be **sliced to refine the input data used for calculation**. Slicing acts as a filter applied before aggregation, ensuring that only data matching specific criteria is processed.

Currently, there are four fundamental dimensions available for slicing:

* **Nationalities:** Filters players based on their nationality. This enables the creation of an ordered list of the best players in a competition from one (or more) countries. See the [full list of country codes used for nationalities](./../../../api-reference/enums/CountryCode.md).
* **PlayerIDs:** Restricts the aggregation to a specific list of players (or a single player).
* **Positions:** Filters data based on **common player positions**. As of February 2026, **only the four common positions** are supported: `GOALKEEPER`, `DEFENDER`, `MIDFIELDER`, and `ATTACKER` (specific lineup positions are not supported yet). This allows for ranking the best players in a competition by specific position.
* **Side:** Distinguishes between matches played at **Home** versus **Away**. This enables the generation of rankings based on performance in (only) home or (only) away matches.

By default, all filters are empty, meaning no slicing is applied.

See the query [example using data slicing](#example-slicing).

### Sorting & Ranking
To facilitate the **creation of player rankings and leaderboards**, the API supports a flexible sorting strategy. This logic is based on an ordered list of metrics, where each metric is assigned a specific sort direction: **Ascending (ASC)** or **Descending (DESC)**.

The order in which metrics are listed determines their priority. The first metric serves as the primary sort key. If players have identical values for the primary metric, the system uses the subsequent metrics in the list to resolve the tie. 

Consequently, defining a more comprehensive list of metrics results in a more precise and deterministic final ranking (leaderboard).

#### Example: Top Scorer Efficiency
Consider a scenario where you want to rank players based on their goal-scoring efficiency. The sorting logic would be defined as follows:

1.  **Goals (DESC):** Primary metric. Players with the highest number of goals are ranked at the top.
2.  **Assists (DESC):** Secondary tie-breaker. If two players have the same number of goals, the player with more assists is ranked higher.
3.  **Minutes Played (ASC):** Tertiary tie-breaker. If both goals and assists are identical, the player who achieved these stats in fewer minutes (higher efficiency) takes precedence.

This is just one possible configuration. You can define any sorting criteria that suit your specific use case. Keep in mind that the `sort` parameter is independent of the `fields` requested in the query; you can sort by any available metric, even if it is not included in the response payload.

See the query [example using sorting](#example-sorting).

## How to get player aggregated data
### Basic Request {#example-basic}
:::info[no-icon]
The following example demonstrates a basic request to retrieve aggregated data for all players in a specific Season Stage (e.g., English Premier League, 2025/2026) for `POINTS`, `GOALS`, `ASSISTS_GOAL`, `MATCH_MINUTES_PLAYED`.
:::
:::danger[Avoid empty field list]
While the system allows queries with no fields defined, **we strongly discourage this practice**. Omitting the field list results in a response containing *all* available metrics, leading to large payloads and potential performance degradation. Always explicitly specify the exact list of fields required for your use case.
:::

<Tabs>
    <TabItem value="query" label="Query" default>
    ```graphql showLineNumbers title="Query: Aggregated Player Data - Basic" 
        query getAggPlayerStatsBySeasonStage(
          $seasonStages: [ID!]!
          $fields: [PlayerMatchMetric!]!
        ) {
          seasonStagePlayerStats(            
            seasonStageIDs: $seasonStages
            fields: $fields
          ) {
            items {
              player {
                id
                localizedName {
                  text
                }
                position
                nationality
              }
              fields {
                metric
                value
              }
            }
          }
        }
    ```
    </TabItem>    
    <TabItem value="variables" label="Variables" default>
    ```json showLineNumbers title="Variables: ID of desired season stage and list of fields"
    {
        //English Premier League 2025/2026 Main (and only one) Stage ID
        "seasonStages": ["1943251371516239872"],
        //Metrics definition
        "fields": ["POINTS", "GOALS", "ASSISTS_GOAL","MATCH_MINUTES_PLAYED"]
    }
    ```
    </TabItem>
    <TabItem value="response" label="Response" default>
    ```json showLineNumbers title="Response: Aggregated Player Data - Basic (no sorting)"
    {
      "data": {
        "seasonStagePlayerStats": {
          "items": [
            {
              "player": {
                "id": "1897744245415215104",
                "localizedName": {
                  "text": "Lucca Lorenzo"
                },
                "position": "ATTACKER",
                "nationality": "ITALY"
              },
              "fields": [
                {
                  "metric": "POINTS",
                  "value": 1
                },                
                {
                  "metric": "GOALS",
                  "value": 1
                },
                {
                  "metric": "ASSISTS_GOAL",
                  "value": 0
                },
                {
                  "metric": "MATCH_MINUTES_PLAYED",
                  "value": 107
                }
              ]
            },
            {
              "player": {
                "id": "1897695832191533056",
                "localizedName": {
                  "text": "Patterson Nathan"
                },
                "position": "DEFENDER",
                "nationality": "SCOTLAND"
              },
              "fields": [
                {
                  "metric": "POINTS",
                  "value": 0
                },
                {
                  "metric": "GOALS",
                  "value": 0
                },
                {
                  "metric": "ASSISTS_GOAL",
                  "value": 0
                },
                {
                  "metric": "MATCH_MINUTES_PLAYED",
                  "value": 239
                }
              ]
            },
            ...
            ...
            ...
            {
              "player": {
                "id": "1897699831326179328",
                "localizedName": {
                  "text": "Arokodare Toluwalase"
                },
                "position": "ATTACKER",
                "nationality": "NIGERIA"
              },
              "fields": [
                {
                  "metric": "POINTS",
                  "value": 2
                },
                {
                  "metric": "GOALS",
                  "value": 2
                },
                {
                  "metric": "ASSISTS_GOAL",
                  "value": 0
                },
                {
                  "metric": "MATCH_MINUTES_PLAYED",
                  "value": 1024
                }
              ]
            }
          ]
        }
      }
    }
    ```
    </TabItem>
</Tabs>
:::tip
Please note that the order of players in the response is not guaranteed, as no specific sorting logic is applied in this basic example. If you require a specific order (e.g., ranking by goals scored), you should implement the appropriate sorting logic as described in the [Sorted Query Example](#example-sorting) section.
:::

### Filtered Query (Slicing) {#example-slicing}
:::info[no-icon]
The following example demonstrates how to retrieve aggregated data filtered by specific criteria (slicing). In this request, we filter for players participating in the **English Premier League 2025/2026**, who are of **Brazilian or Argentinian nationality** and play as **Midfielders** and return the aggregated data for `POINTS`, `GOALS`, `ASSISTS_GOAL`, `MATCH_MINUTES_PLAYED`.
:::

<Tabs>
    <TabItem value="query-slicing" label="Query" default>
    ```graphql showLineNumbers title="Query: Aggregated Player Data - Data Slicing - Nationalities/Common Positions" 
        query getAggPlayerStatsBySeasonStage(
          $seasonStages: [ID!]!
          $fields: [PlayerMatchMetric!]!  
          $filter: AggregatedPlayerStatsFilter
        ) {
          seasonStagePlayerStats(
            seasonStageIDs: $seasonStages
            fields: $fields
            filter: $filter
          ) {
            items {
              player {
                id
                localizedName {
                  text
                }
                position
                nationality
              }
              fields {
                metric
                value
              }
            }
          }
        }
    ```
    </TabItem>
    <TabItem value="variables-slicing" label="Variables" default>
    ```json showLineNumbers title="Variables: ID of desired season stage"
    {
        //English Premier League 2025/2026 Main (and only one) Stage ID
        "seasonStages": ["1943251371516239872"],
        //Metrics definition
        "fields": ["POINTS","GOALS","ASSISTS_GOAL","MATCH_MINUTES_PLAYED"],
        //Filter group: List of desired player nationalities and common position
        "filter": {      
          "nationalities": ["BRAZIL", "ARGENTINA"],
          "positions": ["MIDFIELDER"]
        }
    }
    ```
    </TabItem>
    <TabItem value="response-slicing" label="Response" default>
    ```json showLineNumbers title="Response: Aggregated Player Data - Filtered by Nationality & Position"
        {
          "data": {
            "seasonStagePlayerStats": {
              "items": [
                {
                  "player": {
                    "id": "1897703858084511746",
                    "localizedName": {
                      "text": "Santos Andrey"
                    },
                    "position": "MIDFIELDER",
                    "nationality": "BRAZIL"
                  },
                  "fields": [
                    {
                      "metric": "POINTS",
                      "value": 0
                    },                    
                    {
                      "metric": "GOALS",
                      "value": 0
                    },
                    {
                      "metric": "ASSISTS_GOAL",
                      "value": 0
                    },
                    {
                      "metric": "MATCH_MINUTES_PLAYED",
                      "value": 802
                    }
                  ]
                },
                {
                  "player": {
                    "id": "1897735221265301504",
                    "localizedName": {
                      "text": "Joelinton"
                    },
                    "position": "MIDFIELDER",
                    "nationality": "BRAZIL"
                  },
                  "fields": [
                    {
                      "metric": "POINTS",
                      "value": 2
                    },
                    {
                      "metric": "GOALS",
                      "value": 2
                    },
                    {
                      "metric": "ASSISTS_GOAL",
                      "value": 0
                    },
                    {
                      "metric": "MATCH_MINUTES_PLAYED",
                      "value": 1366
                    }
                  ]
                },
                ...
                ...
                ...
                {
                  "player": {
                    "id": "1897693260714082306",
                    "localizedName": {
                      "text": "Mac Allister Alexis"
                    },
                    "position": "MIDFIELDER",
                    "nationality": "ARGENTINA"
                  },
                  "fields": [
                    {
                      "metric": "POINTS",
                      "value": 2
                    },
                    {
                      "metric": "GOALS",
                      "value": 0
                    },
                    {
                      "metric": "ASSISTS_GOAL",
                      "value": 2
                    },
                    {
                      "metric": "MATCH_MINUTES_PLAYED",
                      "value": 1735
                    }
                  ]
                }
              ]
            }
          }
        }
    ```
    </TabItem>
</Tabs>

### Multiple season stages {#example-multiple-stages}
:::info[no-icon]
The following example demonstrates how to retrieve aggregated data for more than one season stages (all season stages of one season, in this case **UEFA Champions league 2025/2026 - Qualification, League Stage, Play-off)**. The output data is for `POINTS`, `GOALS`, `ASSISTS_GOAL`, `MATCH_MINUTES_PLAYED`

The only difference from previous example is what is provided in the `seasonStageIDs` field - in this case, instead of one stage ID, we provide a list of three stage IDs. The response contains aggregated data for all three stages combined (equivalent to season-level aggregation).
:::

<Tabs>
    <TabItem value="query-multiple-stages" label="Query" default>
    ```graphql showLineNumbers title="Query: Aggregated Player Data - Multiple stages" 
        query getAggPlayerStatsBySeasonStage(
          $seasonStages: [ID!]!
          $fields: [PlayerMatchMetric!]!
        ) {
          seasonStagePlayerStats(
            seasonStageIDs: $seasonStages
            fields: $fields
          ) {
            items {
              player {
                id
                localizedName {
                  text
                }
                position
                nationality
              }
              fields {
                metric
                value
              }
            }
          }
        }
    ```
    </TabItem>
    <TabItem value="variables-multiple-stages" label="Variables" default>
    ```json showLineNumbers title="Variables: ID of desired season stage"
    {
        //UEFA Champion League 2025/2026 - Qualification, League Stage, Play-off IDs
        "seasonStages": ["1943251377560240128","1942584739643002880","1943251377291788288"],
        //Metrics definition
        "fields": ["POINTS","GOALS","ASSISTS_GOAL","MATCH_MINUTES_PLAYED"]    
    }
    ```
    </TabItem>
    <TabItem value="response-multiple-stages" label="Response" default>
    ```json showLineNumbers title="Response: Live rating"
    {
      "data": {
        "seasonStagePlayerStats": {
          "items": [
            {
              "player": {
                "id": "1897731979152195585",
                "localizedName": {
                  "text": "Trossard Leandro"
                },
                "position": "ATTACKER",
                "nationality": "BELGIUM"
              },
              "fields": [
                {
                  "metric": "POINTS",
                  "value": 3
                },
                {
                  "metric": "GOALS",
                  "value": 1
                },
                {
                  "metric": "ASSISTS_GOAL",
                  "value": 2
                },
                {
                  "metric": "MATCH_MINUTES_PLAYED",
                  "value": 287
                }
              ]
            },
            {
              "player": {
                "id": "1897686989709508608",
                "localizedName": {
                  "text": "Locatelli Manuel"
                },
                "position": "MIDFIELDER",
                "nationality": "ITALY"
              },
              "fields": [
                {
                  "metric": "POINTS",
                  "value": 0
                },
                {
                  "metric": "GOALS",
                  "value": 0
                },
                {
                  "metric": "ASSISTS_GOAL",
                  "value": 0
                },
                {
                  "metric": "MATCH_MINUTES_PLAYED",
                  "value": 447
                }
              ]
            },
            ...
            ...
            {
              "player": {
                "id": "1897746179647864832",
                "localizedName": {
                  "text": "Otvos Bence"
                },
                "position": "MIDFIELDER",
                "nationality": "HUNGARY"
              },
              "fields": [
                {
                  "metric": "POINTS",
                  "value": 1
                },
                {
                  "metric": "GOALS",
                  "value": 0
                },
                {
                  "metric": "ASSISTS_GOAL",
                  "value": 1
                },
                {
                  "metric": "MATCH_MINUTES_PLAYED",
                  "value": 448
                }
              ]
            }        
          ]
        }
      }
    }
    ```
    </TabItem>
</Tabs>

### Sorted Query (Leaderboards) {#example-sorting}
:::info[no-icon]
The following example demonstrates how to retrieve data for a leaderboard using specific sorting metrics. The results are ordered primarily by **Points (DESC), followed by Goals (DESC), Assists (DESC), and finally Minutes Played (ASC)** as a tie-breaker.

Note that we use **the same query** as in the previous example, but **with the `sort` parameter added.** 

You are not limited to the metrics defined in the `field` parameter; you can sort by metrics without including them in the final output. This is particularly useful for building correctly ranked leaderboards while minimizing the response payload size.
:::

<Tabs>
    <TabItem value="query" label="Query" default>
    ```graphql showLineNumbers title="Query: Aggregated Player Data - Sorted (Leaderboard)" 
    query getAggPlayerStatsBySeasonStage(
          $seasonStages: [ID!]!
          $fields: [PlayerMatchMetric!]!
          $sort: [AggregatedPlayerStatsSortItem!]
        ) {
          seasonStagePlayerStats(            
            seasonStageIDs: $seasonStages
            fields: $fields
            sort: $sort
          ) {
            items {
              player {
                id
                localizedName {
                  text
                }
                position
                nationality
              }
              fields {
                metric
                value
              }
            }
          }
        }
    ```
    </TabItem>
    <TabItem value="variables" label="Variables" default>
    ```json showLineNumbers title="Variables: ID of desired season stages, fields and sort criterion"
    {
        //UEFA Champion League 2025/2026 - Qualification, League Stage, Play-off IDs
        "seasonStages": ["1943251377560240128","1942584739643002880","1943251377291788288"],
        //Metrics definition
        "fields": ["POINTS","GOALS","ASSISTS_GOAL","MATCH_MINUTES_PLAYED"],
        //Key to success: Set of sorting metrics with defined direction makes the ranking possible (leaderboard).
        "sort": [
          {"metric": "POINTS",                  "direction": "DESC"},
          {"metric": "GOALS",                   "direction": "DESC"},
          {"metric": "ASSISTS_GOAL",            "direction": "DESC"},
          {"metric": "MATCH_MINUTES_PLAYED",    "direction": "ASC"}
        ]
    }
    ```
    </TabItem>
    <TabItem value="response" label="Response" default>
    ```json showLineNumbers title="Response: Aggregated Player Data - Sorted (Leaderboard)"
    {
      "data": {
        "seasonStagePlayerStats": {
          "items": [            
            ...
            ...    
            {
              "player": {
                "id": "1897737822778163205",
                "localizedName": {
                  "text": "Rashford Marcus"
                },
                "position": "ATTACKER",
                "nationality": "ENGLAND"
              },
              "fields": [
                {
                  "metric": "POINTS",
                  "value": 8
                },
                {
                  "metric": "GOALS",
                  "value": 5
                },
                {
                  "metric": "ASSISTS_GOAL",
                  "value": 3
                },
                {
                  "metric": "MATCH_MINUTES_PLAYED",
                  "value": 464
                }
              ]
            },
            {
              "player": {
                "id": "1897751875852435457",
                "localizedName": {
                  "text": "Fermín"
                },
                "position": "MIDFIELDER",
                "nationality": "SPAIN"
              },
              "fields": [
                {
                  "metric": "POINTS",
                  "value": 8
                },
                {
                  "metric": "GOALS",
                  "value": 5
                },
                {
                  "metric": "ASSISTS_GOAL",
                  "value": 3
                },
                {
                  "metric": "MATCH_MINUTES_PLAYED",
                  "value": 533
                }
              ]
            }
            ...
            ...
          ]
        }
      }
    }
    ```
    </TabItem>
</Tabs>
:::tip
The output data demonstrates a tie-break scenario between two players. The first three metrics (POINTS, GOALS, ASSISTS_GOAL) result in a draw as both players share identical values. The tie is ultimately broken by the fourth metric, MATCH_MINUTES_PLAYED, which ranks the player with fewer minutes higher. In this case, **Rashford is ranked above Fermín** due to the ASC (ascending) sorting parameter.
:::