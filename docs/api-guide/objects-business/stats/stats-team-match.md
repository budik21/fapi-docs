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
Object `teamStatsV2` is a child of `Match` object.

## Object description
See [Match Team Stats Response](./../../../api-reference/objects/MatchTeamStatsResponse) chapter.

## Business purpose
:::info[no-header]
The `teamStatsV2` object aggregates performance metrics for **both teams participating in a match**.

Metrics are organized per time frame (period), allowing you to retrieve data for the full match, individual halves, or extra time periods separately.

For a complete list of supported metrics, please refer to the [Team Match Metric Enum](./../../../api-reference/enums/TeamMatchMetric).
:::

## Mandatory arguments
The `teamStatsV2` field requires the following arguments:
- `metrics` (array of `TeamMatchMetric` enum values) — specifies which performance metrics to retrieve for the teams. For example, you can request only shooting-related metrics (e.g., `SHOTS_TOTAL`, `SHOTS_ON_TARGET`, `EXPECTED_GOALS`) or a broader set of stats (e.g., including passing, possession, etc.) depending on your needs.

## Optional arguments

The `teamStatsV2` object accepts a `filter` argument with a `periods` sub-filter that narrows the returned metrics to one or more specific match periods. Filtering is powered by the [`MatchPeriod`](./../../../api-reference/enums/MatchPeriod) enum.

Apart from the `periods` filter, you can also use the `side` filter to retrieve stats for only one of the teams (either `HOME` or `AWAY`) instead of both.

:::note[Filter shape changed from V1]
Unlike the deprecated `teamStats` filter (which used `period: { in: [...] }` / `notIn` operators), the `teamStatsV2` filter takes a flat `periods` array listing the periods to include. There is no `notIn` equivalent — list only the periods you want.
:::

:::warning[DO NOT omit the `filter` argument]
If you omit the `filter` argument entirely, the API returns all the available periods, including the `MATCH_OVERALL` period, which aggregates stats for the entire match.

We recommend always using the `filter` argument to specify which periods you want to retrieve, to avoid unnecessary data transfer.

The `MATCH_OVERALL` will be included in the response only if you explicitly include it in the `periods` filter or if you omit the `filter` argument entirely.
:::

## How to get the Team Match Stat data

:::tip[Choosing the response structure]
By default, `teamStatsV2` returns a flat list of items grouped first by side (`HOME` first, then `AWAY`), with each item carrying a `period` field to identify the match period — see the [Combined example](#combined-single-request).

If you prefer the opposite grouping — a separate block per side, each containing its own list of periods — use aliased calls as shown in the [Home/away aliases](#home-away-aliases) example.
:::

### Combined (single request)

A single `teamStatsV2` call without a `side` filter returns stats for both teams in one request. Each item carries a `side` field (`HOME` or `AWAY`) so you can distinguish the teams in the response.

<Tabs>
    <TabItem value="query" label="Query" default>
    ```graphql showLineNumbers title="Query: teamStatsV2 filtered by period, both sides combined"
    query Match($matchId: ID!, $metrics: [TeamMatchMetric!]!, $filter: TeamMatchStatsV2Filter) {
      match(id: $matchId) {
        id
        teamStatsV2(metrics: $metrics, filter: $filter) {
          items {
            period
            side
            metrics {
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
        "matchId": "1944410506467217408",
        //Shots related metrics only
        "metrics": ["SHOTS_TOTAL", "SHOTS_ON_TARGET", "EXPECTED_GOALS"],
        "filter": {
            //Base time periods only (ommiting the overall period)
            "periods": ["HALF_FIRST", "HALF_SECOND"]
        }
    }
    ```
    </TabItem>
    <TabItem value="response" label="Response">
    ```json showLineNumbers title="Response: teamStatsV2 filtered by period, both sides combined"
    {
      "data": {
        "match": {
          "id": "1944410506467217408",
          "teamStatsV2": {
            "items": [
              {
                "period": "HALF_FIRST",
                "side": "HOME",
                "metrics": [
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
                "side": "HOME",
                "metrics": [
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
                "period": "HALF_FIRST",
                "side": "AWAY",
                "metrics": [
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
                "side": "AWAY",
                "metrics": [
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

### Home/away aliases {#home-away-aliases}

Two aliased calls split the result into separate named fields in the response, one per side.

<Tabs>
    <TabItem value="query" label="Query" default>
    ```graphql showLineNumbers title="Query: teamStatsV2 filtered by period, home/away as aliases"
    query Match($matchId: ID!, $metrics: [TeamMatchMetric!]!, $filterHome: TeamMatchStatsV2Filter, $filterAway: TeamMatchStatsV2Filter) {
      match(id: $matchId) {
        id
        homeStats: teamStatsV2(metrics: $metrics, filter: $filterHome) {
          items {
            period
            side
            metrics {
              metric
              value
            }
          }
        }
        awayStats: teamStatsV2(metrics: $metrics, filter: $filterAway) {
          items {
            period
            side
            metrics {
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
      "matchId": "1944410506467217408",
      "metrics": ["SHOTS_TOTAL", "SHOTS_ON_TARGET", "EXPECTED_GOALS"],
      "filterHome": {
        "periods": ["HALF_FIRST", "HALF_SECOND"],
        "side": "HOME"
      },
      "filterAway": {
        "periods": ["HALF_FIRST", "HALF_SECOND"],
        "side": "AWAY"
      }
    }
    ```
    </TabItem>
    <TabItem value="response" label="Response">
    ```json showLineNumbers title="Response: teamStatsV2 filtered by period, home/away as aliases"
    {
      "data": {
        "match": {
          "id": "1944410506467217408",
          "homeStats": {
            "items": [
              {
                "period": "HALF_FIRST",
                "side": "HOME",
                "metrics": [
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
                "side": "HOME",
                "metrics": [
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
                "side": "AWAY",
                "metrics": [
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
                "side": "AWAY",
                "metrics": [
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
                    "value": 10
                  },
                  "away": {
                    "value": 2
                  }
                },
                "shotsOnTarget": {
                  "home": {
                    "value": 5
                  },
                  "away": {
                    "value": 1
                  }
                },
                "expectedGoals": {
                  "home": {
                    "value": 1.2682
                  },
                  "away": {
                    "value": 0.1907
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
                    "value": 12
                  },
                  "away": {
                    "value": 6
                  }
                },
                "shotsOnTarget": {
                  "home": {
                    "value": 4
                  },
                  "away": {
                    "value": 1
                  }
                },
                "expectedGoals": {
                  "home": {
                    "value": 2.7495
                  },
                  "away": {
                    "value": 0.2841
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
