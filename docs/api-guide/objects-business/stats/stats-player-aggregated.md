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

The aggregation **is performed using various statistical methods (such as weighted averages, per90 minutes averages, or totals)** based on individual players' metrics recorded in matches played within the specified Season Stage(s).
:::

:::tip[Future Scope]
It will be also possible to slice aggregated data by scopes other than `Season Stage`, for example, by a player's full Career or all seasons within a single Club. Please note that **this functionality is not currently implemented (as of March 2026)** and will be available in a future release.
:::

### Supported metrics
Aggregation can be performed on [any metric defined](./../../../api-reference/enums/PlayerMatchMetric.md) as a player metric.

While **SUM** is the most common aggregation method for counting total outputs (such as goals or passes), the system applies the most statistically appropriate method for each specific metric. For instance, aggregating the [Rating](./../match/player-rating.md) metric as a simple sum is illogical; instead, it is calculated as a **Weighted Average** based on minutes played to ensure a fair representation of a player's performance.

See [how the multiple aggregations work](#example-multiple-aggregations).

### Supported Aggregations
There are several ways to aggregate player statistics. However, **not all aggregation methods are available for every metric**, as the calculation must make sense within a sporting context.

For instance, while a player's goals can be summed to get a season total, a player's "Rating" cannot be summed across matches because a total rating value carries no statistical meaning. Instead, the "Rating" is typically aggregated using an  **Average** or **Weighted Average** based on minutes played.

:::warning
The API allows you to request any aggregation function for any metric. However, the system only supports combinations that are statistically valid.

If a requested combination is not supported (e.g., requesting a **Weighted Average** for goals or a **Sum** for player ratings), the API request will still execute successfully and return data, but the value for the unsupported combination will be `null`.
:::

#### Sum
The most fundamental aggregation pattern. It calculates a simple **arithmetic total** of all values recorded for a specific metric across all selected matches in a season stage/all season stages.
* **Example:** If a player scores 3 goals in one match and 1 goal in another, the `sum` for goals in the season will be **4**.

#### Count
Returns the total number of matches where the player recorded a **non-zero value** for a specific metric. This allows you to identify how many matches a player was "active" in a certain category.
* **Example:** If a player scores 3 goals in one match and 1 goal in another (the same situation as described above), the `count` for goals in the season will be **2** (representing the two separate matches in which they scored).

#### Average
Calculates the **average value per match**. This is the simple arithmetic mean of the values recorded in each match where the player appeared.
* **Example:** If a player makes **40 passes** in Match A and **60 passes** in Match B, the average for these two matches will be **50 passes** per match. If the player appears in the next match and records **0 passes**, the average will drop to **33.3 passes** per match, as the total of 100 passes is then divided by 3 matches.

#### Weighted Average
Calculates the average by assigning different weights (importance) to individual data points. This is primarily used for **Rating**, where the weight is the **number of minutes played** in each match. This ensures that a performance in a full 90-minute match has more impact on the final average than a short 10-minute appearance.
* **Example:** If a player has a **9.0 rating** for a 10-minute appearance but a **6.0 rating** for a full 90-minute match, the `Weighted Average` will be much closer to **6.0** than to the simple average of 7.5.

:::info
The algorithm calculates a weighted average by multiplying each match stat by the minutes played, then dividing by the total minutes across all matches. This ensures that a player's performance in a full 90-minute game has a greater statistical impact than a brief appearance.
:::

#### per90 Minutes Average (Per90Avg)
Normalizes the metric to a standard 90-minute football match duration. This allows for a fair comparison of efficiency between players, regardless of how many matches they appeared in or how many minutes they played.

* **Example:** Consider two players who both appeared in 4 matches:
    * **Player A:** Scored **3 goals** in **150 minutes**. Their `Per90Avg` is **1.8** ($3 / 150 \times 90$).
    * **Player B:** Scored **4 goals** but needed **300 minutes**. Their `Per90Avg` is **1.2** ($4 / 300 \times 90$).
* Even though Player B has a higher `Sum` of goals (and a higher arithmetic average per match), Player A ranks higher in `Per90Avg` because they are statistically more efficient per minute played.

### Data Slicing (Filters)
Aggregated statistics can be **sliced to refine the input data used for calculation**. Slicing acts as a filter applied before aggregation, ensuring that only data matching specific criteria is processed.

Currently, there are five fundamental dimensions available for slicing:

* **Nationalities:** Filters players based on their nationality. This enables the creation of an ordered list of the best players in a competition from one (or more) countries. See the [full list of country codes used for nationalities](./../../../api-reference/enums/CountryCode.md).
* **PlayerIDs:** Restricts the aggregation to a specific list of players (or a single player).
* **Positions:** Filters data based on **common player positions**. As of February 2026, **only the four common positions** are supported: `GOALKEEPER`, `DEFENDER`, `MIDFIELDER`, and `ATTACKER` (specific lineup positions are not supported yet). This allows for ranking the best players in a competition by specific position.
* **Side:** Distinguishes between matches played at **Home** versus **Away**. This enables the generation of rankings based on performance in (only) home or (only) away matches.
* **TeamIDs:** Restricts the aggregation to players belonging to one or more specific teams. This is particularly useful for building team-scoped leaderboards — for example, ranking the top scorers within a single club, or comparing the best players across two teams in a head-to-head analysis.

By default, all filters are empty, meaning no slicing is applied.

See the query [example using data slicing](#example-slicing) or the [head-to-head team filter example](#example-team-filter).

### Sorting & Ranking
To facilitate the **creation of player rankings and leaderboards**, the API supports a flexible, multi-level sorting strategy. This logic is based on an ordered list of criteria, where each item combines a specific **metric** (e.g., Shots Total), an **aggregation type** (e.g., per90 Average), and a **sort direction** (Ascending or Descending).

The priority of the sort is determined by the order of the provided list. The first item serves as the primary sort key. If players have identical values for this primary calculation, the system sequentially uses the subsequent metrics and their respective aggregation types to resolve ties.

**Note on Consistency:** When defining your leaderboard, ensure that the `type` used for sorting (e.g., `weightedAvg`) is also included in your requested `fields`. While the API allows you to request multiple aggregation types at once, remember that some combinations may be logically irrelevant (such as a `sum` of a player rating) and will return `null`. A more comprehensive list of sorting criteria results in a more precise and deterministic final ranking.

#### Example: Top Scorer Efficiency
Consider a scenario where you want to get **Top Scorers Leaderboard**. The sorting logic would be defined as follows:

1.  **Goals (Type: `sum`, Direction: `DESC`):** Primary metric. Players with the highest total number of goals are ranked at the top.
2.  **Assists (Type: `sum`, Direction: `DESC`):** Secondary tie-breaker. If two players have the same number of goals, the player with more assists is ranked higher.
3.  **Goals per90 (Type: `per90Avg`, Direction: `DESC`):** Tertiary tie-breaker. If two players have the same number of goals and assists, the player with higher **Goals per90 minutes average** is ranked higher. This prioritizes players who score more frequently relative to their time on the pitch.
4.  **Minutes Played (Type: `sum`, Direction: `ASC`):** Final tie-breaker. If all previous metrics are identical, the player who achieved these stats in the least amount of total playing time takes precedence.

This is just one possible configuration. You can define any combination (or their order) of metrics and aggregation types to suit your specific use case. 

:::tip
Keep in mind that the `sort` parameter is independent of the `fields` requested in the query; you can sort by any available metric and aggregation type, even if it is not included in the response payload.
See the query [example using sorting](#example-sorting).
:::

## How to get player aggregated data
### Basic Request {#example-basic}
:::info[no-icon]
The following example demonstrates a basic request to retrieve aggregated data for all players in a specific Season Stage (e.g., English Premier League, 2025/2026). In this case, the query returns the **SUM** of `POINTS`, `GOALS`, `ASSISTS_GOAL`, and `MATCH_MINUTES_PLAYED` for each player. There is no need to work with another type of aggregation, so we use just `metric` and `sum` fields in the query definition.
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
                sum
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
                  "sum": 1
                },                
                {
                  "metric": "GOALS",
                  "sum": 1
                },
                {
                  "metric": "ASSISTS_GOAL",
                  "sum": 0
                },
                {
                  "metric": "MATCH_MINUTES_PLAYED",
                  "sum": 107
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
                  "sum": 0
                },
                {
                  "metric": "GOALS",
                  "sum": 0
                },
                {
                  "metric": "ASSISTS_GOAL",
                  "sum": 0
                },
                {
                  "metric": "MATCH_MINUTES_PLAYED",
                  "sum": 239
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
                  "sum": 2
                },
                {
                  "metric": "GOALS",
                  "sum": 2
                },
                {
                  "metric": "ASSISTS_GOAL",
                  "sum": 0
                },
                {
                  "metric": "MATCH_MINUTES_PLAYED",
                  "sum": 1024
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

### Using filters - multiple filters in one query {#example-slicing}
:::info[no-icon]
The following example demonstrates how to retrieve aggregated data filtered by specific criteria (slicing). In this request, we filter for players participating in the **English Premier League 2025/2026** who are of **Brazilian or Argentinian nationality** and play as **Midfielders**. The query returns the **SUM** of `POINTS`, `GOALS`, `ASSISTS_GOAL`, and `MATCH_MINUTES_PLAYED` for each player.
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
                sum
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
                      "sum": 0
                    },                    
                    {
                      "metric": "GOALS",
                      "sum": 0
                    },
                    {
                      "metric": "ASSISTS_GOAL",
                      "sum": 0
                    },
                    {
                      "metric": "MATCH_MINUTES_PLAYED",
                      "sum": 802
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
                      "sum": 2
                    },
                    {
                      "metric": "GOALS",
                      "sum": 2
                    },
                    {
                      "metric": "ASSISTS_GOAL",
                      "sum": 0
                    },
                    {
                      "metric": "MATCH_MINUTES_PLAYED",
                      "sum": 1366
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
                      "sum": 2
                    },
                    {
                      "metric": "GOALS",
                      "sum": 0
                    },
                    {
                      "metric": "ASSISTS_GOAL",
                      "sum": 2
                    },
                    {
                      "metric": "MATCH_MINUTES_PLAYED",
                      "sum": 1735
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

### Using filters - one or more teams {#example-team-filter}
:::info[no-icon]
The following example demonstrates how to use the `teamIDs` filter to retrieve a **top scorer ranking restricted to players from two specific teams**. This is a typical head-to-head use case: given a season stage, you want to compare the best attackers (by goals) from two rival clubs side by side.

The query returns the **SUM** of `GOALS` for each player, sorted descending — giving you an immediately usable leaderboard of top scorers from both squads.
:::

<Tabs>
    <TabItem value="query-team-filter" label="Query" default>
    ```graphql showLineNumbers title="Query: Aggregated Player Data - Team Filter (Head-to-Head Top Scorers)"
        query SeasonStagePlayerStats(
          $seasonStageIDs: [ID!]!
          $fields: [PlayerMatchMetric!]!
          $sort: [AggregatedPlayerStatsSortItem!]
          $filter: AggregatedPlayerStatsFilter
        ) {
          seasonStagePlayerStats(
            seasonStageIDs: $seasonStageIDs
            fields: $fields
            sort: $sort
            filter: $filter
          ) {
            items {
              player {
                localizedFullName {
                  text
                }
              }
              fields {
                metric
                sum
              }
            }
          }
        }
    ```
    </TabItem>
    <TabItem value="variables-team-filter" label="Variables" default>
    ```json showLineNumbers title="Variables: Season stage, goals metric, descending sort, two-team filter"
    {
        //Czech 1st League Chance Liga 2025/2026 Main Stage
        "seasonStageIDs": ["1943251371973427200"],
        "fields": ["GOALS"],
        "sort": [
          {
            "metric": "GOALS",
            "type": "SUM",
            "direction": "DESC"
          }
        ],
        "filter": {
          "teamIDs": [
            //Sparta Prague
            "1897619607137812481",
            //Slavia Prague
            "1897619604105330689" 
          ]
        }
    }
    ```
    </TabItem>
    <TabItem value="response-team-filter" label="Response" default>
    ```json showLineNumbers title="Response: Top scorers from the two selected teams (Slavia Prague, Sparta Prague), ordered by goals"
    {
    "data": {
      "seasonStagePlayerStats": {
        "items": [
          {
            "player": {
              "localizedFullName": {
                "text": "Chory Tomas"
              }
            },
            "fields": [
              {
                "metric": "GOALS",
                "sum": 17
              }
            ]
          },
          {
            "player": {
              "localizedFullName": {
                "text": "Haraslin Lukas"
              }
            },
            "fields": [
              {
                "metric": "GOALS",
                "sum": 10
              }
            ]
          },
          {
            "player": {
              "localizedFullName": {
                "text": "Chytil Mojmir"
              }
            },
            "fields": [
              {
                "metric": "GOALS",
                "sum": 10
              }
            ]
          },
          {
            "player": {
              "localizedFullName": {
                "text": "Rrahmani Albion"
              }
            },
            "fields": [
              {
                "metric": "GOALS",
                "sum": 9
              }
            ]
          },
          {
            "player": {
              "localizedFullName": {
                "text": "Kuchta Jan"
              }
            },
            "fields": [
              {
                "metric": "GOALS",
                "sum": 8
              }
            ]
          },
          {
            "player": {
              "localizedFullName": {
                "text": "Provod Lukas"
              }
            },
            "fields": [
              {
                "metric": "GOALS",
                "sum": 7
              }
            ]
          },
          {
            "player": {
              "localizedFullName": {
                "text": "Birmancevic Veljko"
              }
            },
            "fields": [
              {
                "metric": "GOALS",
                "sum": 5
              }
            ]
          },
          {
            "player": {
              "localizedFullName": {
                "text": "Kusej Vasil"
              }
            },
            "fields": [
              {
                "metric": "GOALS",
                "sum": 5
              }
            ]
          },
          {
            "player": {
              "localizedFullName": {
                "text": "John Anthony Mercado Cuero"
              }
            },
            "fields": [
              {
                "metric": "GOALS",
                "sum": 5
              }
            ]
          },
          {
            "player": {
              "localizedFullName": {
                "text": "Chaloupek Stepan"
              }
            },
            "fields": [
              {
                "metric": "GOALS",
                "sum": 4
              }
            ]
          },
          ...
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
The `teamIDs` filter can be combined with other slicing dimensions such as `positions` or `nationalities`. For example, you can narrow the leaderboard to **attackers only from two specific teams** by adding `"positions": ["ATTACKER"]` alongside `teamIDs` in the `filter` object.
:::

### Using filters - one or more season stages {#example-multiple-stages}
:::info[no-icon]
The following example demonstrates how to retrieve aggregated data for more than one season stage (in this case, all stages of the **UEFA Champions League 2025/2026: Qualification, League Stage, and Play-offs**). The query returns the **SUM** of `POINTS`, `GOALS`, `ASSISTS_GOAL`, and `MATCH_MINUTES_PLAYED` for each player across all desired stages.

The only difference from the previous example is the `seasonStageIDs` field—instead of a single ID, we provide a list of three stage IDs. The response contains the aggregated total for all three stages combined, effectively providing season-level statistics.
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
                sum
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
    ```json showLineNumbers title="Response: Aggregated Player Data - Multiple Stages"
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
                  "sum": 3
                },
                {
                  "metric": "GOALS",
                  "sum": 1
                },
                {
                  "metric": "ASSISTS_GOAL",
                  "sum": 2
                },
                {
                  "metric": "MATCH_MINUTES_PLAYED",
                  "sum": 287
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
                  "sum": 0
                },
                {
                  "metric": "GOALS",
                  "sum": 0
                },
                {
                  "metric": "ASSISTS_GOAL",
                  "sum": 0
                },
                {
                  "metric": "MATCH_MINUTES_PLAYED",
                  "sum": 447
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
                  "sum": 1
                },
                {
                  "metric": "GOALS",
                  "sum": 0
                },
                {
                  "metric": "ASSISTS_GOAL",
                  "sum": 1
                },
                {
                  "metric": "MATCH_MINUTES_PLAYED",
                  "sum": 448
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
The following example demonstrates how to retrieve data for a leaderboard using specific sorting metrics. In this case, the results are ordered based on the **SUM** of the following metrics: primarily by **Points (DESC), followed by Goals (DESC), Assists (DESC), and finally Minutes Played (ASC)** as a tie-breaker.

Note that we use **the same query** as in the previous example, but **with the `sort` parameter added.** You are not limited to the metrics defined in the `field` parameter; you can sort by metrics without including them in the final output. This is particularly useful for building correctly ranked leaderboards based on aggregated totals while minimizing the response payload size.
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
                sum
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
        "fields": ["POINTS","GOALS","ASSISTS_GOAL"],
        //Key to success: Set of sorting metrics with defined direction makes the ranking possible (leaderboard). MATCH_MINUTES_PLAYED is used as sorting criterion, but is not available in field list 
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
                  "sum": 8
                },
                {
                  "metric": "GOALS",
                  "sum": 5
                },
                {
                  "metric": "ASSISTS_GOAL",
                  "sum": 3
                },
                {
                  "metric": "MATCH_MINUTES_PLAYED",
                  "sum": 464
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
                  "sum": 8
                },
                {
                  "metric": "GOALS",
                  "sum": 5
                },
                {
                  "metric": "ASSISTS_GOAL",
                  "sum": 3
                },
                {
                  "metric": "MATCH_MINUTES_PLAYED",
                  "sum": 533
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

### Multiple aggregation functions {#example-multiple-aggregations}
:::info[no-icon]
The following example demonstrates how to use multiple aggregation function in one query. In this case we build a leaderboard based on the **Weighted average rating** in combination with **total count of shots** and **minutes played** and **per90 average for shots total** as the primary tie-breaker in multiple season stages.
:::

:::tip[Note on field consistency]
Notice that aggregation types (`sum`, `weightedAvg`, `per90Avg`) are defined **once for the entire query**.

This means every requested metric will return all aggregation types, even where they are logically irrelevant (e.g., a `sum` of a player rating or a `weightedAvg` of total minutes), in which case they will return `null`.
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
                sum
                weightedAvg
                per90Avg
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
          "fields": ["SHOTS_TOTAL", "RATING_PLAYER", "MATCH_MINUTES_PLAYED"],
          //Sorting
          "sort":
           [
            {"metric": "SHOTS_TOTAL",           "type": "per90Avg",     "direction": "DESC"},
            {"metric": "RATING_PLAYER",         "type": "weightedAvg",  "direction": "DESC"},
            {"metric": "MATCH_MINUTES_PLAYED",  "type": "sum",          "direction": "ASC"}          
          ]        
        }
    ```
    </TabItem>
    <TabItem value="response" label="Response" default>
    ```json showLineNumbers title="Response: Aggregated Player Data - Sorted (Leaderboard)"
    {
      ...
    }
    ```
    </TabItem>
</Tabs>