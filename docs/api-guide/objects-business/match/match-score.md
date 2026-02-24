---
id:         score
title:      Score
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Dependencies
Object `score` is a child of `Match` object.

## Object description
See [Score object](./../../../api-reference/objects/Score) chapter.

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

* **Before a period starts:** All score fields (`home`, `away`, and their `cumulative` counterparts) inside that period object are `null`.
* **When a period starts:** The `home` and `away` values for that period are immediately set to `0`. These values stay at `0` until a team scores a goal. The `cumulative` score is also updated to reflect the total match score at the start of this new period.

This logic applies to all period objects - `halfFirst`, `halfSecond`, `extraTimeFirst`, `extraTimeFirst`
:::
:::warning[Do not use score for tracking live periods]
Although you can check `null` and `not null` values to guess which period is currently playing, **this is not the recommended approach and should be avoided**.

**Why?** For example, during the half-time break, `halfFirst` is no longer `null`, but `halfSecond` is still `null`. If you rely on the score object, your application might incorrectly assume the first half is still running.

Instead, we highly recommend using the [`Clock`](./../../objects-common/matchClock.md) object. It is primarily responsible for providing accurate, real-time information about the currently playing period and the elapsed match time. For instance, during the half-time break, the [`Clock`](./../../objects-common/matchClock.md) object explicitly states that the period in progress is `HALFTIME`.
:::

## How to get the score data
### Live and final rating
:::info[no-icon]
The following query is an example of how to retrieve the base rating value. The query is valid for both `IN_MATCH` (live data) and `AFTER_MATCH` (final data) phases.
:::
:::tip[no-icon]
Please note that the same base rating value is also available via the `RATING_PLAYER` metric in the [PlayerMatchStat](../stats/stats-player-match.md) object.
:::

<Tabs>
    <TabItem value="query" label="Query" default>
    ```graphql showLineNumbers title="Query: Live rating" 
    query Match($matchId: ID!) {
      match(id: $matchId) {    
        playerRatings {
          player {
            id
            localizedName {
              text
            }
          }
          value
        }   
      }
    }
    ```
    </TabItem>
    <TabItem value="variables" label="Variables" default>
    ```json showLineNumbers title="Variables: ID of desired match"
    {
        //Premier League, Arsenal - Tottenham 4:1, 23.11.2025
        "matchId": "1935259478450778112"
    }
    ```
    </TabItem>
    <TabItem value="response" label="Response" default>
    ```json showLineNumbers title="Response: Live rating"
    {
      "data": {
        "match": {
          "playerRatings": [        
            {
              "player": {
                "id": "1897688549357256705",
                "localizedName": {
                  "text": "Raya David"
                }
              },
              "value": 6.667588
            },
            {
              "player": {
                "id": "1897696843341758464",
                "localizedName": {
                  "text": "Saka Bukayo"
                }
              },
              "value": 6.989151
            },
            ...
            ...
            {
              "player": {
                "id": "1897749364248674304",
                "localizedName": {
                  "text": "Sarr Pape Matar"
                }
              },
              "value": 6.008087
            },
            {
              "player": {
                "id": "1897754373879234560",
                "localizedName": {
                  "text": "Odobert Wilson"
                }
              },
              "value": 5.555361
            }
          ]
        }
      }
    }
    ```
    </TabItem>
</Tabs>

### Rating (all data) with bonuses
:::info[no-icon]
The following query is an example of how to retrieve all the rating values including all information about bonuses. The query is valid for both `IN_MATCH` (live data) and `AFTER_MATCH` (final data) phases.
:::
:::tip[no-icon]
Please note that the base rating value is also available via the `RATING_PLAYER` metric and uncapped value via `RATING_PLAYER_RAW` metric in the [PlayerMatchStat](../stats/stats-player-match.md) object.
:::
<Tabs>
<TabItem value="query1" label="Query" default>
```graphql showLineNumbers title="Query: Live rating with bonuses" 
query Match($matchId: ID!) {
  match(id: $matchId) {    
    playerRatings {
      player {
        id
        localizedName {
          text
        }
      }
      value
      valueUncapped
      ratingPosition
      ratingConfigID
      createdAt
      updatedAt
      bonuses {
        total
        entries {
          type
          subtype
          value
        }
      }
    }   
  }
}
```
</TabItem>
<TabItem value="variables1" label="Variables" default>
```json showLineNumbers title="Variables: ID of desired match"
{
    //Premier League, Arsenal - Tottenham 4:1, 23.11.2025
    "matchId": "1935259478450778112"
}
```
</TabItem>
<TabItem value="response1" label="Response" default>
```json showLineNumbers title="Response: Live rating  with bonuses"
{
    "player": {
        "id": "1897697037663862785",
        "localizedName": {
          "text": "Saliba William"
        }
    },
    "value": 6.20866,
    "valueUncapped": 6.20866,
    "ratingPosition": "CENTRE_BACK",
    "ratingConfigID": "1991831638732181504",
    "createdAt": "2025-11-23T16:39:34Z",
    "updatedAt": "2025-11-24T14:21:54Z",
    "bonuses": {
        "total": 0.2,
        "entries": [
          {
            "type": "dueling",
            "subtype": "weak",
            "value": -0.2
          },
          {
            "type": "finishing_quality_nonpen",
            "subtype": "neutral",
            "value": 0
          },
          {
            "type": "open_play_pass_accuracy",
            "subtype": "very_good",
            "value": 0.4
          }
        ]
      }
    }
}
```
</TabItem>
</Tabs>

### Rating history
:::info[no-icon]
The following query demonstrates how to retrieve historical rating values. It is valid for both `IN_MATCH` (live data) and `AFTER_MATCH` (final data) phases.

During the `IN_MATCH` phase, it returns data calculated from the match start up to the minute preceding the current one. In the `AFTER_MATCH` phase, it returns rating values for every minute the player spent on the pitch.
:::
:::tip[no-icon]
Each historical value contains the [timeFrame](./../../objects-common/time-frame) object specifying the play time for which the rating was calculated.
:::
<Tabs>
<TabItem value="query2" label="Query" default>
```graphql showLineNumbers title="Query: Rating history in a specific match" 
query Match($matchId: ID!) {
    match(id: $matchId) {
        playerRatings {
            player {
                id
                localizedName {
                    text
                }
            }
            ratingHistory {
                timeFrame {
                    phase
                    period
                    elapsedMinute
                    elapsedSecond
                }
                value
            }
        }
    }
}
```
</TabItem>
<TabItem value="variables2" label="Variables" default>
```json showLineNumbers title="Variables: ID of desired match"
{
    //Premier League, Arsenal - Tottenham 4:1, 23.11.2025
    "matchId": "1935259478450778112"
}
```
</TabItem>
<TabItem value="response2" label="Response" default>
```json showLineNumbers title="Response: Minute-by-minute rating history of B. Saka in ARSvTOT PL match"
{
  "data": {
    "match": {
      "playerRatings": [
        {
          "player": {
            "id": "1897696843341758464",
            "localizedName": {
              "text": "Saka Bukayo"
            }
          },
          "ratingHistory": [
            {
              "timeFrame": {
                "phase": "IN_MATCH",
                "period": "HALF_FIRST",
                "elapsedMinute": 10,
                "elapsedSecond": 0
              },
              "value": 6.907343
            },
            {
              "timeFrame": {
                "phase": "IN_MATCH",
                "period": "HALF_FIRST",
                "elapsedMinute": 11,
                "elapsedSecond": 0
              },
              "value": 6.886458
            },
            ...
            ...
            {
              "timeFrame": {
                "phase": "IN_MATCH",
                "period": "HALF_SECOND",
                "elapsedMinute": 89,
                "elapsedSecond": 0
              },
              "value": 7.127196
            },
            {
              "timeFrame": {
                "phase": "IN_MATCH",
                "period": "HALF_SECOND",
                "elapsedMinute": 90,
                "elapsedSecond": 0
              },
              "value": 6.993207
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