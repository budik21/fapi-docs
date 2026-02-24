---
id:         player-rating
title:      Player Rating
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Dependencies
Object `playerRating` is a child of `Match` object.

## Object description
See [PlayerRating object](./../../../api-reference/objects/PlayerRating) chapter.

## Business purpose
:::info[no-header]
The `score` object provides a structured breakdown of a match's score progression. It is used to track goals across individual periods, overall match results, and multi-leg aggregates, using `null` values to clearly indicate periods or matches that have not yet started.
:::

### Prerequisites
Player ratings are calculated based on individual [player's match stats](../../objects-business/stats/stats-player-match). This data is available for selected competitions only (approximately 300). Consequently, if match statistics are unavailable, the player rating cannot be generated. In such cases, the `playerRating` object will return `NULL`.

**The minimum time** a player must spend on the pitch to receive a rating **is 10 minutes**. This calculation excludes additional time. For example, if a substitute enters the pitch in the 88th minute, they will not receive a rating even if there are 12 minutes of additional time. In this scenario, only 2 minutes of valid playing time are counted and the condition for minimum play time is not met.

### Rating calculation
The calculation takes the player's lineup position into account and evaluates their performance based on **how well they fulfill the common tasks associated with that specific role**.

Additionally, players receive **bonuses or penalties** based on special events. Bonuses are awarded for positive actions, such as scoring a goal or preventing a clear scoring opportunity. Conversely, penalties are applied for negative actions, such as an error leading to a goal or being sent off. See [Bonuses chapter](#bonuses-and-penalties) for more details.

The player rating calculation runs every minute (for players who met the minimal time condition). However, specific events — such as a goal or a red card — [trigger an immediate recalculation](#events-triggering-rating-recalculation). Consequently, ratings for all players are not updated simultaneously, but you receive the most precise rating value in each moment.

Calculations do not stop at the end of the match; they continue as long as player statistics are being updated. The majority of matches undergo a post-match review where statistical corrections are made. **This process can result in changes to the final rating and may even affect the Player of the Match award.**

:::danger[Quality of the rating]
Although post-match data changes that affect a player’s final rating may be inconvenient, they also allow the most accurate rating calculation possible. Most ratings can be considered final 24 hours after the match ends, and after 72 hours, only a very small percentage of ratings undergo any further changes.
:::

### Rating Calculation Precision
All rating values are calculated with a precision of **six decimal places**. Any rounding for display purposes is the responsibility of the consuming application.

### Capped vs. Uncapped Rating Values
Two distinct rating values are provided for each player:

* **Capped Value** (`value`): The rating normalized to a scale of 1 to 10. This is the standard value used for display.
* **Uncapped Value** (`valueUncapped`): The raw calculated rating, which can fall below 1 or exceed 10. Its primary purpose is **tie-breaking**. For example, if multiple players achieve the maximum capped rating of 10 (or minimum of 1), the uncapped value allows you to differentiate between them and determine the better/the worse performance.

### Player of the Match

The final rating is used to determine the **Player of the Match**. This title is awarded to the player with the **highest calculated final rating.**

The player with the highest (uncapped) rating is identified by the `isPlayerOfTheMatch` attribute being set to `true`, while all others are set to `false`. This status is available in real-time throughout the game, although the official title is typically awarded only after the match finishes.

In the event of a tie (when two or more players have the same rating), the **uncapped rating value with a precision of six decimal places** is used to break the tie. If a tie persists even after considering the uncapped values, the Player of the Match is determined based on the following criteria, evaluated in order:
* Member of a winning team

:::tip[Alternative way to retrieve PotM]
While the rating is part of the Player Match Stats (see the `RATING_PLAYER` metric), you can also identify the Player of the Match using the `ranking` or `rankingOverallComposite`, `rankingTeamComposite` attributes. Refer to the [Player Match stats Ranking chapter](./../stats/stats-player-match#ranking) for more details.
:::

### Live, Final and Historical rating values
The centerpiece of the rating data is the `value` attribute within the `playerRating` object. Its meaning evolves depending on the match phase.

#### During the Match (`IN_MATCH`)
In this phase, the attribute represents the **Live Rating** (or current rating). It is dynamic and updates in real-time whenever the underlying player statistics used for the calculation change.

#### After the Match (`AFTER_MATCH`)
Once the game is finished, this value represents the player's **Final Rating**. Please note that **even in this phase, the value may still be subject to updates** if post-match statistical corrections are applied (e.g., reassigning a shot on target).

### Bonuses and Penalties
Bonuses or penalties are applied to the rating calculation based on specific events. These calculations rely on player match statistics, taking the values of one or more metrics into account.

#### Bonus type and subtype
* **Bonus type** (`bonuses.type`) identifies the specific bonus. While it often corresponds to the metric involved, this abstraction allows for bonuses calculated from multiple metrics. The type is a static string acting as a stable ID (guaranteed to remain unchanged once released).

* **Bonus subtype** (`bonuses.subtype`) represents the "performance level" or tier. This field is populated only for specific bonuses that produce tiered outputs.

For example, a passing bonus might have three tiers based on accuracy (>90%, >93%, or >96%), resulting in subtypes of `good`, `very_good`, or `excellent`. You can display this information to help users better understand the quality of the player's performance.

If the calculated result is positive, it is considered a **bonus**; if negative, it is considered a **penalty**. Refer to the table below for details.

| Bonus Type                               | Bonus Subtype                                                                | Metrics Involved| Output range                |
|:-----------------------------------------|:-----------------------------------------------------------------------------|:---|:----------------------------|
| `goals_scored_non_penalty`               | N/A                                                                          | `GOALS_NO_PENALTIES`                                                 | Non-negative value          |
| `goals_scored_penalty`                   | N/A                                                                          | `GOALS_PENALTY`                                                      | Non-negative value          |
| `goals_all`                             | N/A                                                                          | `GOALS`                                                      | Zero (0) value in all cases          |
| `goals_scored_winning`                   | N/A                                                                          | `MATCH_WINNING_TEAM`<br/>`MATCH_DRAWING_TEAM`<br/>`MATCH_LOSING_TEAM`<br/>`GOALS_WINNING`                                                 | Non-negative value          |
| `assists_to_goal`                        | N/A                                                                          | `ASSISTS_GOAL`                                                       | Non-negative value          |
| `penalties_won`                          | N/A                                                                          | `PENALTIES_WON`                                                      | Non-negative value          |
| `big_chance_created`                     | N/A                                                                          | `BIG_CHANCES_CREATED`                                                | Non-negative value          |
| `last_man_tackle`                        | N/A                                                                          | `TACKLE_LAST_MAN`                                                    | Non-negative value          |
| `saved_penalties`                        | N/A                                                                          | `PENALTIES_SAVED`                                                    | Non-negative value          |
| `big_chances_saved`                      | N/A                                                                          | `BIG_CHANCES_SAVED`                                                  | Non-negative value          |
| `clearances_off_line`                    | N/A                                                                          | `CLEARANCES_OFF_LINE`                                                | Non-negative value          |
| `clean_sheet`                            | N/A                                                                          | `GOALS_CONCEDED`                     | Non-negative value          |
| `won_contest_bonuses`                    | N/A                                                                          | `DRIBBLES_WON`                                                       | Non-negative value          |
| `big_chances_missed`                     | N/A                                                                          | `BIG_CHANCES_MISSED`                                                 | Non-positive value          |
| `penalties_conceded`                     | N/A                                                                          | `PENALTIES_COMMITTED`                                                | Non-positive value          |
| `penalties_missed`                       | N/A                                                                          | `PENALTIES_NOT_CONVERTED`                                            | Non-positive value          |
| `goals_scored_own`                       | N/A                                                                          | `GOALS_OWN`                                                          | Non-positive value          |
| `errors_lead_to_shot`                    | N/A                                                                          | `ERRORS_LEAD_TO_SHOT`                                                | Non-positive value          |
| `errors_lead_to_goal`                    | N/A                                                                          | `ERRORS_LEAD_TO_GOAL`                                                | Non-positive value          |
| `red_cards`                              | N/A                                                                          | `CARDS_RED`                                                          | Non-positive value          |
| `1v1_defending`                          | N/A                                                                          | `CHALLENGE_LOST`                                                     | Non-positive value          |
| `goals_conceded`                         | N/A                                                                          | `GOALS_CONCEDED`                                                     | Non-positive value          |
| `open_play_pass_accuracy`                | `excellent`<br/>`very good`                                                  | `PASSES_OPEN_PLAY_TOTAL`<br/>`PASSES_OPEN_PLAY_ACCURACY`| Non-negative value          |
| `turnovers`                              | `severe`<br/>`moderate`                                                      | `TURNOVERS`| Non-positive value          |
| `finishing_quality_nonpen`               | `excellent`<br/>`very_good`<br/>`very_bad`<br/>`terrible`                    | `FINISHING_QUALITY_NO_PENALTIES`| No limitation               |
| `dueling`                                | `excellent`<br/>`very_good`<br/>`terrible`<br/>`bad`                         | `DUELS_TOTAL`<br/>`DUELS_EFFICIENCY`| No limitation               |
| `dueling_lower`                          | `good`<br/>`decent`<br/>`poor`<br/>`weak`                                    | `DUELS_TOTAL`<br/>`DUELS_EFFICIENCY`| No limitation               |
| `xg_faced_nonpen`                        | `excellent`<br/>`good`<br/>`normal`<br/>`poor`<br/>`bad`                     | `EXPECTED_GOALS_NO_PENALTIES_FACED`  | No limitation               |
| `goal_prevented_non_penalty`             | `excellent`<br/>`very_good`<br/>`good`<br/>`very_poor`<br/>`poor`<br/>`weak` | `GOALS_PREVENTED_NO_PENALTIES`  | Zero (0) value in all cases |
| `hit_woodwork`                           | N/A                                                                          | `SHOTS_POST`| Zero (0) value in all cases |
| `match_result`                           | `win`<br/>`lose`                                                             | `MATCH_WINNING_TEAM`<br/>`MATCH_LOSING_TEAM`  | No limitation               |
| `penalty_shootout_attempt_saves`         | N/A                                                                          | `PENALTY_SHOOTOUT_ATTEMPTS_SAVES`  | Non-negative                |
| `penalty_shootout_attempt_not_converted` | N/A                                                                          | `PENALTY_SHOOTOUT_ATTEMPTS_NOT_CONVERTED`  | Non-positive                |
| `penalty_shootout_attempt_scored`        | N/A                                                                          | `PENALTY_SHOOTOUT_ATTEMPTS_SCORED`  | Non-negative                |

### Historical rating values
Once a rating is calculated, the rating value and all applicable bonuses are provided in `playerRating.value` and `playerRating.bonuses`. Any previous rating and bonus values are moved to the `ratingHistory` object upon recalculation.

To retrieve the **current rating**, read the attributes directly within the `playerRating` object. See the [query example](#live-and-final-rating) for this approach.

To track the **player's rating progression** minute-by-minute, read the `playerRating.ratingHistory` object. In addition to the rating and bonus values, this object includes a [timeFrame](../../objects-common/time-frame) object to identify the specific match minute associated with the data. See the [query example](#rating-history) for this approach.

### Events triggering rating recalculation
A player's rating is calculated at least once during each minute the player spends on the pitch (the responsible metric is `MATCH_MINUTES_PLAYED_LIVE_ONPITCH` which is being changed during additional time, while `MATCH_MINUTES_PLAYED_LIVE` is not). In some cases, the rating is recalculated immediately after an event occurs.

The system triggers a rating recalculation for the affected player whenever a change is detected in the following metrics:
`ASSISTS_GOAL` | `BIG_CHANCES_CREATED` | `BIG_CHANCES_SAVED` | `BIG_CHANCES_MISSED` | `CARDS_RED` | `CLEARANCES_OFF_LINE` |`ERRORS_LEAD_TO_GOAL` | `GOALS_NO_PENALTIES` | `MATCH_MINUTES_PLAYED_LIVE` | `MATCH_MINUTES_PLAYED_LIVE_ONPITCH` | `GOALS_PENALTY` |`GOALS_OWN` | `PENALTIES_NOT_CONVERTED` |`PENALTIES_SAVED`.

### Rating position
For rating calculation purposes, each player is assigned a rating position based on their lineup role and formation used.

There is a slight distinction between lineup positions and rating positions: lineup positions are more granular, whereas rating positions are broader categories and do not distinguish between left, center, or right roles.

All players who are not in the starting lineup are assigned the `SUBSTITUTE` rating position, regardless of their actual role when they enter the pitch (as this role is unpredictable).

:::tip[How to handle the SUBSTITUTE rating position]
If you use the rating position for display purposes (e.g., in a tooltip), we recommend replacing the `SUBSTITUTE` value with the player's common position (see the `position` attribute in the [Player object](./../../../api-reference/objects/Player)) or the specific lineup position (see the `lineupPosition` attribute in the [LineupPlayer](./../../../api-reference/objects/LineupPlayer) object).
:::

Possible values for the `ratingPosition` attribute are:
* `ATTACKING_MIDFIELDER`
* `CENTRE_BACK`
* `FULL_BACK`
* `GOALKEEPER`
* `MIDFIELDER`
* `STRIKER`
* `SUBSTITUTE`
* `WING_BACK`
* `WINGER`


## How to get the rating data
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