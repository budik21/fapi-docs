---
id:         score
title:      Score
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Dependencies
Object `score` is a child of `Match` object.

## Object description
See [Score object](/api-reference/objects/Score) chapter.

## Business purpose
:::info[no-header]
The `score` object provides a structured breakdown of goals scored by the home and away team during a match. It is used to evaluate the current match result, track cumulative score progression across individual periods, and determine multi-leg tie aggregates.
:::

### Score Structure Explained
The `score` object is divided into several parts to show exactly when goals were scored and what the total match result is.

* **Overall Score** The total goals scored in the match (including goals scored extra time, but excluding goals during the penalty shootout period).
* **Score of Individual Periods**
    * **`home`| `away` attributes:** - provides the goals scored by the home and away team **only** during this specific time.
    * **`cumulative`** - provides the running total match score. It updates in real time as the period is played, **including all goals from previous periods plus any goals scored so far** in the current period.
* **Penalty Shootout** - provides only the count of penalties scored by the home and away team. It does not have a `cumulative` object because a shootout decides the advancing team but does not change the regular match score.
* **Aggregate Score** - provides the total combined score of both matches in a two-legged tie. `Null` in case of a single match or if the aggregate score is not applicable.

:::tip[Special state of the period score attributes]
The API uses `null` values to show if a specific period (or the entire match) has started.

* **Before a period starts:** The appropriate period object will be `null`.
* **When a period starts:** The `home` and `away` values for that period are immediately set to `0`. These values stay at `0` until a team scores a goal. The `cumulative` score is also updated to reflect the goals scored in previous periods, even if no goals have been scored yet in the current period. For example, if the first half has ended with a score of 2:1, at the start of the second half, the `home` and `away` values for `halfSecond` will be `0`, but the `cumulative` score will show `2:1`.

This logic applies to all period objects: `halfFirst`, `halfSecond`, `extraTimeFirst`, and `extraTimeSecond`.
:::

:::warning[Do not use score for tracking live periods]
Although you can check `null` and not-null values to guess which period is currently playing, **this is not the recommended approach and should be avoided**.

**Why?** For example, during the half-time break, `halfFirst` is no longer `null`, but `halfSecond` is still `null`. If you rely on the `score` object, your application might incorrectly assume the first half is still running.

Instead, we highly recommend using the [`Clock`](/api-guide/objects-common/match-clock) object. It is primarily responsible for providing accurate, real-time information about the currently playing period and the elapsed match time. For instance, during the half-time break, the [`Clock`](/api-guide/objects-common/match-clock) object explicitly states that the period in progress is `HALFTIME`.
:::

## How to get the score data
### Get Match score
The full capabilities of the `score` object can be demonstrated using the UEFA Europa League second-leg match between **Viktoria Plzeň (CZE)** and **Panathinaikos (GRE)**.

* The **first leg** ended in a **2–2 draw**.
* In the **second leg**, Panathinaikos won the **first half 1–0**.
* Viktoria Plzeň responded by winning the **second half 1–0**, resulting in a **1–1 draw** in the second leg.

This produced an **aggregate score of 3–3** (the second-leg result combined with the first-leg final score).

No goals were scored during extra time, so the aggregate score remained **3–3 after 120 minutes**. The advancing team was therefore decided by a penalty shootout, which **Panathinaikos won 4–3**.

This scenario illustrates how the `score` object represents:

- The `overall score` of the second-leg match is **1–1** (the score after end of the second extra time).
- The `halfFirst score` is **0–1** (Panathinaikos scored once in the first half, while Viktoria Plzeň did not). The `cumulative score` at the end of the first half is also **0–1**, as there were no previous periods in the second-leg match.
- The `halfSecond score` is **1–0** (Viktoria Plzeň scored once in the second half, while Panathinaikos did not). The `cumulative score` at the end of the second half is **1–1** (the first-half score of 0–1 plus the second-half score of 1–0).
- The `extraTimeFirst` score is **0–0** (no goals were scored). The cumulative score remains **1–1**, the same as at the end of the second half.
- The `extraTimeSecond` score is also **0–0** (no goals were scored). The cumulative score remains **1–1**, the same as at the end of the first extra-time period.
- The `penaltyShootout` score is **3–4** (Viktoria Plzeň scored 3 penalties, while Panathinaikos scored 4). The aggregate score remains **3–3** (the same as at the end of extra time), because goals scored in a penalty shootout do not affect the match score; they only determine the advancing team.


<Tabs>
    <TabItem value="query" label="Query" default>
    ```graphql showLineNumbers title="Query: Match Score in a two-leg match" 
    query Match ($matchId: ID!) {
      match(id: $matchId) {
        seasonStage {      
          season {
            localizedName {
              text
            }
            startDate
            endDate
            competition {
              localizedName {
                text
              }          
            }
          }
        }
        homeTeam {
          localizedName {
            text
          }
        }
        awayTeam {
          localizedName {
            text
          }
        }
        score {
          overall {
            home
            away
          }
          halfFirst {
            cumulative {
              home
              away
            }
            home
            away
          }
          halfSecond {
            cumulative {
              home
              away
            }
            home
            away
          }
          extraTimeFirst {
            cumulative {
              home
              away
            }
            home
            away
          }
          extraTimeSecond {
            cumulative {
              home
              away
            }
            home
            away
          }
          penaltyShootout {
            home
            away
          }
          aggregate {
            home
            away
          }
        }    
      }
    }
    ```
    </TabItem>
    <TabItem value="variables" label="Variables" default>
    ```json showLineNumbers title="Variables: ID of desired match"
    {
        //UEFA Europa League Play-off 2025/2026, Viktoria Plzeň - Panathinaikos
        "matchId": "2017215244388282368"
    }
    ```
    </TabItem>
    <TabItem value="response" label="Response" default>
    ```json showLineNumbers title="Response: Match Score"
    {
      "data": {
        "match": {
          "seasonStage": {
            "season": {
              "localizedName": {
                "text": "Europa League"
              },
              "startDate": "2025-07-10",
              "endDate": "2026-05-20",
              "competition": {
                "localizedName": {
                  "text": "Europa League"
                }
              }
            }
          },
          "homeTeam": {
            "localizedName": {
              "text": "Plzen"
            }
          },
          "awayTeam": {
            "localizedName": {
              "text": "Panathinaikos"
            }
          },
          "score": {
            "overall": {
              "home": 1,
              "away": 1
            },
            "halfFirst": {
              "cumulative": {
                "home": 0,
                "away": 1
              },
              "home": 0,
              "away": 1
            },
            "halfSecond": {
              "cumulative": {
                "home": 1,
                "away": 1
              },
              "home": 1,
              "away": 0
            },
            "extraTimeFirst": {
              "cumulative": {
                "home": 1,
                "away": 1
              },
              "home": 0,
              "away": 0
            },
            "extraTimeSecond": {
              "cumulative": {
                "home": 1,
                "away": 1
              },
              "home": 0,
              "away": 0
            },
            "penaltyShootout": {
              "home": 3,
              "away": 4
            },
            "aggregate": {
              "home": 3,
              "away": 3
            }
          }
        }
      }
    }
    ```
    </TabItem>
</Tabs>