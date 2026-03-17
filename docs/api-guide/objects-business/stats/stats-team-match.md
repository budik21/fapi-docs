---
id:         stats-team-match
title:      Match Team stats
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Dependencies
Object `teamStats` is a child of `Match` object.

## Object description
See [Team Match Stats](./../../../api-reference/objects/TeamMatchStats) chapter.

## Business purpose
:::info[no-header]
The `teamStats` object aggregates performance metrics for **both teams participating in a match**. 

Metrics are organized per time frame (period), allowing you to retrieve data for the full match, individual halves, or extra time periods separately.

For a complete list of supported metrics, please refer to the [Team Match Metric Enum](./../../../api-reference/enums/TeamMatchMetric).
:::

## Team stats by match period

The `teamStats` object accepts a `filter` argument with a `period` sub-filter that narrows the returned metrics to one or more specific match periods. Filtering is powered by the [`MatchPeriod`](../../../api-reference/enums/MatchPeriod) enum.

Two filter operators are available:

| Operator | Behavior |
|---|---|
| `in` | Returns stats only for the listed periods |
| `notIn` | Returns stats for all periods **except** the listed ones |

Each element in the response array corresponds to exactly one period. It always includes a `timeframe` object that identifies which period the metrics belong to — see the [Time Frame](../../objects-common/timeFrame.md) chapter for a full description of its attributes (`phase`, `period`, and the various time attributes).

The `phase` attribute of the `timeframe` object is not useful for team stats filtering, as all the periods available for filtering belong to the same phase (`IN_MATCH`).

:::warning[DO NOT omit the `filter` argument]
If you omit the `filter` argument entirely, the API returns all the available periods, including the `MATCH_OVERALL` period, which aggregates stats for the entire match. 

We recommend always using the `filter` argument to specify which periods you want to retrieve, to avoid unnecessary data transfer.

The `MATCH_OVERALL` will be included in the response only if you explicitly include it in the `period` filter or if you omit the `filter` argument entirely.    
:::


## How to get the Team Match Stat data

### Team match stats filtered by period

:::tip[Multiple periods in a single request]
The `period` filter accepts an array of [MatchPeriod](../../../api-reference/enums/MatchPeriod) values, so you can request metrics for multiple periods in a single query. Each period's metrics are returned as a separate entry in the response, identified by the `timeframe` object.
:::

<Tabs>
    <TabItem value="query" label="Query" default>
    ```graphql showLineNumbers title="Query: Team match metrics filtered by 1st, 2nd period (excluding MATCH_OVERALL)"
    query Match ($matchId: ID!) {
      match(id: $matchId) {
        teamStats(
          filter: {
            period: {
              in: [HALF_FIRST, HALF_SECOND]
            }
          }
        ) {
          timeframe {
            phase
            period
          }
          stats {
            shotsTotal {
              home {
                value
              }
              away {
                value
              }
            }
            shotsOnTarget {
              home {
                value
              }
              away {
                value
              }
            }
            expectedGoals {
              home {
                value
              }
              away {
                value
              }
            }
          }
        }
      }
    }
    ```
    </TabItem>
    <TabItem value="variables" label="Variables" default>
    ```json showLineNumbers title="Variables: ID of desired match"
    {
        //Premier League, Liverpool - Tottenham 1:1, 15.3.2026
        "matchId": "1944410506467217408"
    }
    ```
    </TabItem>
    <TabItem value="response" label="Response" default>
    ```json showLineNumbers title="Response: Team match metrics filtered by 1st, 2nd period (excluding MATCH_OVERALL)"
    {
      "data": {
        "match": {
          "teamStats": [
            {
              "timeframe": {
                "phase": "IN_MATCH",
                "period": "HALF_FIRST"
              },
              "stats": {
                "shotsTotal": {
                  "home": {
                    "value": 6
                  },
                  "away": {
                    "value": 4
                  }
                },
                "shotsOnTarget": {
                  "home": {
                    "value": 2
                  },
                  "away": {
                    "value": 2
                  }
                },
                "expectedGoals": {
                  "home": {
                    "value": 0.4304
                  },
                  "away": {
                    "value": 0.2591
                  }
                }
              }
            },
            {
              "timeframe": {
                "phase": "IN_MATCH",
                "period": "HALF_SECOND"
              },
              "stats": {
                "shotsTotal": {
                  "home": {
                    "value": 11
                  },
                  "away": {
                    "value": 9
                  }
                },
                "shotsOnTarget": {
                  "home": {
                    "value": 2
                  },
                  "away": {
                    "value": 5
                  }
                },
                "expectedGoals": {
                  "home": {
                    "value": 1.2663
                  },
                  "away": {
                    "value": 0.9166
                  }
                }
              }
            }
          ]
        }
      }
    }
    ```
    </TabItem>
</Tabs>
