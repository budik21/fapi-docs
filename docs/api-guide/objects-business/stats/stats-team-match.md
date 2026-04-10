---
id:         stats-team-match
title:      Match Team stats
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning[Deprecated]
The `teamStats` field and the underlying `TeamMatchStats` object are **deprecated** and will be removed in a future version.

**Use `teamStatsV2` instead, which returns [`MatchTeamStatsResponse`](./../../../api-reference/objects/MatchTeamStatsResponse) object**.
:::

## Dependencies
Object `teamStats` is a child of `Match` object.

## Object description
See [Team Match Stats](./../../../api-reference/objects/TeamMatchStats) chapter.

## Business purpose
:::info[no-header]
The `teamStatsV2` object aggregates performance metrics for **both teams participating in a match**. 

Metrics are organized per time frame (period), allowing you to retrieve data for the full match, individual halves, or extra time periods separately.

For a complete list of supported metrics, please refer to the [Team Match Metric Enum](./../../../api-reference/enums/TeamMatchMetric).
:::

## Team stats by match period

The `teamStatsV2` object accepts a `filter` argument with a `period` sub-filter that narrows the returned metrics to one or more specific match periods. Filtering is powered by the [`MatchPeriod`](../../../api-reference/enums/MatchPeriod) enum.

Two filter operators are available:

| Operator | Behavior |
|---|---|
| `in` | Returns stats only for the listed periods |
| `notIn` | Returns stats for all periods **except** the listed ones |

Each element in the response array corresponds to **exactly one period**. It always includes a `timeframe` object that identifies which period the metrics belong to — see the [Time Frame](../../objects-common/timeFrame.md) chapter for a full description of its attributes (`phase`, `period`, and the various time attributes).

The `phase` attribute of the `timeframe` object is not useful for team stats filtering, as all the periods available for filtering belong to the same phase (`IN_MATCH`).

:::warning[DO NOT omit the `filter` argument]
If you omit the `filter` argument entirely, the API returns all the available periods, including the `MATCH_OVERALL` period, which aggregates stats for the entire match. 

We recommend always using the `filter` argument to specify which periods you want to retrieve, to avoid unnecessary data transfer.

The `MATCH_OVERALL` will be included in the response only if you explicitly include it in the `period` filter or if you omit the `filter` argument entirely.    
:::


## How to get the Team Match Stat data

:::tip[Choosing the response structure]
By default, `teamStatsV2` returns a flat list of items grouped first by side (`HOME` first, then `AWAY`), with each item carrying a `period` field to identify the match period — see the [Combined example](#combined-single-request).

If you prefer the opposite grouping — a separate block per side, each containing its own list of periods — use aliased calls as shown in the [Home/away aliases](#homeaway-aliases) example.
:::

### Combined (single request)

A single `teamStatsV2` call without a `side` filter returns stats for both teams in one request. Each item carries a `side` field (`HOME` or `AWAY`) so you can distinguish the teams in the response.

<Tabs>
    <TabItem value="query" label="Query" default>
    ```graphql showLineNumbers title="Query: teamStatsV2 filtered by period, both sides combined"
    query Match($matchId: ID!) {
      match(id: $matchId) {
        teamStatsV2(
          fields: [SHOTS_TOTAL, SHOTS_ON_TARGET, EXPECTED_GOALS]
          filter: {
            timeFrame: {
              period: {
                in: [HALF_FIRST, HALF_SECOND]
              }
            }
          }
        ) {
          items {
            side
            period
            fields {
              metric
              value
            }
          }
        }
      }
    }
    ```
    </TabItem>
    <TabItem value="variables" label="Variables">
    ```json showLineNumbers title="Variables: ID of desired match"
    {
        //Premier League, Liverpool - Tottenham 1:1, 15.3.2026
        "matchId": "1944410506467217408"
    }
    ```
    </TabItem>
    <TabItem value="response" label="Response">
    ```json showLineNumbers title="Response: teamStatsV2 filtered by period, both sides combined"
    {
      "data": {
        "match": {
          "teamStatsV2": {
            "items": [
              {
                "side": "HOME",
                "period": "HALF_FIRST",
                "fields": [
                  {
                    "metric": "SHOTS_TOTAL",
                    "value": 10
                  },
                  {
                    "metric": "SHOTS_ON_TARGET",
                    "value": 5
                  },
                  {
                    "metric": "EXPECTED_GOALS",
                    "value": 1.2682
                  }
                ]
              },
              {
                "side": "HOME",
                "period": "HALF_SECOND",
                "fields": [
                  {
                    "metric": "SHOTS_TOTAL",
                    "value": 12
                  },
                  {
                    "metric": "SHOTS_ON_TARGET",
                    "value": 4
                  },
                  {
                    "metric": "EXPECTED_GOALS",
                    "value": 2.7495
                  }
                ]
              },
              {
                "side": "AWAY",
                "period": "HALF_FIRST",
                "fields": [
                  {
                    "metric": "SHOTS_TOTAL",
                    "value": 2
                  },
                  {
                    "metric": "SHOTS_ON_TARGET",
                    "value": 1
                  },
                  {
                    "metric": "EXPECTED_GOALS",
                    "value": 0.1907
                  }
                ]
              },
              {
                "side": "AWAY",
                "period": "HALF_SECOND",
                "fields": [
                  {
                    "metric": "SHOTS_TOTAL",
                    "value": 6
                  },
                  {
                    "metric": "SHOTS_ON_TARGET",
                    "value": 1
                  },
                  {
                    "metric": "EXPECTED_GOALS",
                    "value": 0.2841
                  }
                ]
              }
            ]
          }
        }
      }
    }
    ```
    </TabItem>
</Tabs>

### Home/away aliases

Two aliased calls split the result into separate named fields in the response, one per side.

<Tabs>
    <TabItem value="query" label="Query" default>
    ```graphql showLineNumbers title="Query: teamStatsV2 filtered by period, home/away as aliases"
    query Match($matchId: ID!) {
      match(id: $matchId) {
        homeStats: teamStatsV2(
          fields: [SHOTS_TOTAL, SHOTS_ON_TARGET, EXPECTED_GOALS]
          filter: {
            side: HOME
            timeFrame: {
              period: {
                in: [HALF_FIRST, HALF_SECOND]
              }
            }
          }
        ) {
          items {
            period
            fields {
              metric
              value
            }
          }
        }
        awayStats: teamStatsV2(
          fields: [SHOTS_TOTAL, SHOTS_ON_TARGET, EXPECTED_GOALS]
          filter: {
            side: AWAY
            timeFrame: {
              period: {
                in: [HALF_FIRST, HALF_SECOND]
              }
            }
          }
        ) {
          items {
            period
            fields {
              metric
              value
            }
          }
        }
      }
    }
    ```
    </TabItem>
    <TabItem value="variables" label="Variables">
    ```json showLineNumbers title="Variables: ID of desired match"
    {
        //Premier League, Liverpool - Tottenham 1:1, 15.3.2026
        "matchId": "1944410506467217408"
    }
    ```
    </TabItem>
    <TabItem value="response" label="Response">
    ```json showLineNumbers title="Response: teamStatsV2 filtered by period, home/away as aliases"
    {
      "data": {
        "match": {
          "homeStats": {
            "items": [
              {
                "period": "HALF_FIRST",
                "fields": [
                  {
                    "metric": "SHOTS_TOTAL",
                    "value": 10
                  },
                  {
                    "metric": "SHOTS_ON_TARGET",
                    "value": 5
                  },
                  {
                    "metric": "EXPECTED_GOALS",
                    "value": 1.2682
                  }
                ]
              },
              {
                "period": "HALF_SECOND",
                "fields": [
                  {
                    "metric": "SHOTS_TOTAL",
                    "value": 12
                  },
                  {
                    "metric": "SHOTS_ON_TARGET",
                    "value": 4
                  },
                  {
                    "metric": "EXPECTED_GOALS",
                    "value": 2.7495
                  }
                ]
              }
            ]
          },
          "awayStats": {
            "items": [
              {
                "period": "HALF_FIRST",
                "fields": [
                  {
                    "metric": "SHOTS_TOTAL",
                    "value": 2
                  },
                  {
                    "metric": "SHOTS_ON_TARGET",
                    "value": 1
                  },
                  {
                    "metric": "EXPECTED_GOALS",
                    "value": 0.1907
                  }
                ]
              },
              {
                "period": "HALF_SECOND",
                "fields": [
                  {
                    "metric": "SHOTS_TOTAL",
                    "value": 6
                  },
                  {
                    "metric": "SHOTS_ON_TARGET",
                    "value": 1
                  },
                  {
                    "metric": "EXPECTED_GOALS",
                    "value": 0.2841
                  }
                ]
              }
            ]
          }
        }
      }
    }
    ```
    </TabItem>
</Tabs>

### Deprecated (teamStats)

:::danger[Deprecated]
The `teamStats` field used in the query below is deprecated. Use `teamStatsV2` instead — see the [examples above](#combined-single-request).
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
    <TabItem value="variables" label="Variables">
    ```json showLineNumbers title="Variables: ID of desired match"
    {
        //Premier League, Liverpool - Tottenham 1:1, 15.3.2026
        "matchId": "1944410506467217408"
    }
    ```
    </TabItem>
    <TabItem value="response" label="Response">
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
