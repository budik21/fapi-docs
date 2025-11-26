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
The `playerRating` object provides a set of data points used to evaluate a player's performance in a specific match using a standardised scale **from 1** (worst performance) **to 10** (best performance).
:::

### Prerequisites
Player ratings are calculated based on individual [player's match stats](../../objects-business/stats/stats-player-match). This data is available for selected competitions only (approximately 300). Consequently, if match statistics are unavailable, the player rating cannot be generated. In such cases, the `playerRating` object will return `NULL`.

**The minimum time** a player must spend on the pitch to receive a rating **is 10 minutes**. This calculation excludes additional time. For example, if a substitute enters the pitch in the 88th minute, they will not receive a rating even if there are 12 minutes of additional time. In this scenario, only 2 minutes of valid playing time are counted and the condition for minimum play time is not met.

### Rating calculation
The player rating calculation runs every minute (for players who met the minimal time condition). However, specific events — such as a goal or a red card — trigger an immediate recalculation. Consequently, ratings for all players are not updated simultaneously. 

Calculations do not stop at the end of the match; they continue as long as player statistics are being updated. The majority of matches undergo a post-match review where statistical corrections are made. This process can result in changes to the final rating and may even affect the Player of the Match award.

:::danger[Quality of the rating]
Although post-match data changes that affect a player’s final rating may be inconvenient, they also allow the most accurate rating calculation possible. Most ratings can be considered final 24 hours after the match ends, and after 72 hours, only a very small percentage of ratings undergo any further changes.
:::

The calculation takes the player's lineup position into account and evaluates their performance based on how well they fulfill the common tasks associated with that specific role. Additionally, players receive bonuses or penalties based on special events. Bonuses are awarded for positive actions, such as scoring a goal or preventing a clear scoring opportunity. Conversely, penalties are applied for negative actions, such as an error leading to a goal or being sent off.

### Live, Final and Historical rating values

The centerpiece of the rating data is the `value` attribute within the `playerRating` object. Its meaning evolves depending on the match phase.

#### During the Match (`IN_MATCH`)
In this phase, the attribute represents the **Live Rating** (or current rating). It is dynamic and updates in real-time whenever the underlying player statistics used for the calculation change.

#### After the Match (`AFTER_MATCH`)
Once the game concludes, this value represents the player's **Final Rating**. Please note that even in this phase, the value may still be subject to updates if post-match statistical corrections are applied (e.g., reassigning a shot on target).

#### Historical rating values

## How to get the rating data
### Live and final rating
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

### Rating history
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