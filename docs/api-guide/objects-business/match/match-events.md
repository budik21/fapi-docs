---
id:         match-events
title:      Match Events
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Dependencies
Object `MatchEvents` is a child of `Match` object.

## Business purpose
:::info[no-header]
Match Events represents all events occurring during a match—such as shots, passes, fouls, and more—captured with a highly detailed set of data. This level of granularity allows a clear understanding of what is happening (or has happened) during the match.

The data is relevant for `IN_MATCH` phase of the match. Of course, you can also query historical matches to get their event data.
:::
:::warning[Limited Coverage]
As of January 2026, the API supports a limited set of event types: **period start and end, foul, and card**. Additional types, including **shots, goals, and passes**, are currently under development. These and other events will be introduced during the first half of 2026 (H1 2026) and will be documented here as they become available.
:::

Each event is described by one unique enumerated [event type](../../../api-reference/enums/MatchEventType) which express what has happened followed by set of [common attributes](../../../api-reference/objects/MatchEventsResult).
Additionally, each event type has its own specific attributes that extend the common ones. To access fields on specific event implementations, use GraphQL Inline Fragments (see examples below). 

## Object attributes
See the [Match Event object](../../../api-reference/objects/MatchEventsResult) for getting complete list of common attributes which are available for all event types.

See the sections below for more details on each event type and their specific attributes.
* [Card Event](#card-event)
* [Foul Event](#foul-event)
* [Period Start and End Event](#period-start-and-end-event)

### Player and Team Attributes
Most event types are associated with a single player (e.g., the scorer of a goal or the recipient of a card). In these cases, the common `player` attribute is safe to be used.

However, certain events involve multiple participants. In these instances, the player object appears multiple times within the event's specific attributes to define different roles. For example, a **Foul Event** may include:

* **`committedPlayer`**: The player who committed the foul.
* **`sufferedPlayer`**: The player who was fouled.
* **`executorPlayer`**: The player designated to perform the resulting set piece (e.g., free kick or penalty).

The same principle applies to **team-related attributes**, where multiple teams may be referenced depending on the event context.

:::tip[Using Specific Player Attributes]
When multiple roles are present in an event type, we recommend using these **specific player attributes** instead of the common `player` or `team` attribute to ensure data precision and avoid ambiguity.
:::


## Query arguments
The `matchEvents` field accepts the following arguments to customize your query:

* `filter` - to filter the events by their types, e.g.:
  * `types: [PERIOD_START_END, CARD]` - to get only period start/end and card events, if omitted, all event types are returned
* `sort` - allows sorting by specific field and direction, e.g.:
  * `field: TIMESTAMP, direction: DESC` - to get the most recent events first
* **record limiting** - allows to limit the number of returned records, e.g.:
  * `first: 100` - the maximum number of returned records is 100

## How to get common match event data
<Tabs>
    <TabItem value="queryCARD" label="Query" default>
        ```graphql showLineNumbers title="Query: Match Event data, common attributes" 
        query Match  {
          match(id: $matchId) {
            matchEvents(
              first: $recordsLimit
              filter:  {
                 types: [PERIOD_START_END, CARD]
              }
              sort:  {
                 field: TIMESTAMP, direction: DESC
              }
              ) {
              entries{
                timeFrame {
                  phase
                  period
                  elapsedMinute
                  elapsedSecond
                  displayMinute
                  displayMinuteAdditional          
                }
                type               
              }      
            }
          }
        }
        ```
    </TabItem>
    <TabItem value="variablesCARD" label="Variables" default>
        ```json showLineNumbers title="Variables: Match Event data, common attributes"
        {
            //Everton vs. Wolverhampton, Premier League Match, 7. 1. 2026
            "matchId": "1935259481030262784"
            //Get maximum 100 records
            "recordsLimit": 100
        }
        ```
    </TabItem>
    <TabItem value="responseCARD" label="Response" default>
        ```json showLineNumbers title="Response: Match Event data, common attributes"
        {
          "data": {
            "match": {
              "matchEvents": {
                "entries": [
                  {
                    "timeFrame": {
                      "phase": "IN_MATCH",
                      "period": "HALF_FIRST",
                      "elapsedMinute": 0,
                      "elapsedSecond": 0,
                      "displayMinute": 1,
                      "displayMinuteAdditional": 0
                    },
                    "type": "PERIOD_START_END"
                  },
                  {
                    "timeFrame": {
                      "phase": "IN_MATCH",
                      "period": "HALF_FIRST",
                      "elapsedMinute": 42,
                      "elapsedSecond": 20,
                      "displayMinute": 43,
                      "displayMinuteAdditional": 0
                    },
                    "type": "CARD"
                  },
                  "...",
                  "..."
                  {
                    "timeFrame": {
                      "phase": "IN_MATCH",
                      "period": "HALF_SECOND",
                      "elapsedMinute": 99,
                      "elapsedSecond": 25,
                      "displayMinute": 90,
                      "displayMinuteAdditional": 10
                    },
                    "type": "PERIOD_START_END"
                  }
                ]
              }
            }
          }
        }
        ```
    </TabItem>
</Tabs>

## Card Event
### Business purpose
:::info[Card Event Definition| no-icon]
Card event represents a disciplinary action taken against a player during a match, specifically the issuance of a **yellow, second yellow, or red card.**

This event type captures comprehensive details, including the player involved, the reason for the card (such as a foul or rules violation), the on-pitch location, and another attributes. 
:::

The **Card Event** can be related to **Foul event**, as cards are typically issued in response to fouls committed during the match, but the **Foul event** can be `null` in case of non-foul related cards (e.g., dissent).

If a card is issued due to a foul, you can get more context about the incident by adding the `Foul object` with their specific attributes to your query, see [Foul event](#foul-event) for more details and following example.

See the [Card object](../../../api-reference/objects/MatchEventCardEvent) to get full list of specific attributes.


### How to get match event data: CARD
<Tabs>
    <TabItem value="queryCARD" label="Query" default>
        ```graphql showLineNumbers title="Query: Match Event data, event CARD" 
        query Match($first)  {
          match(id: $matchId) {
            matchEvents(
              first: $first
              filter:  {
                 types: [CARD]
              }      
              ) {
              entries{
                timeFrame {
                  phase
                  period
                  elapsedMinute
                  elapsedSecond
                  displayMinute
                  displayMinuteAdditional          
                }
                type
                ... on CardEvent{          
                  homeOrAway
                  punishedPlayer {            
                    localizedName {
                      text
                    }
                  }
                  punishedTeam{
                    id
                    localizedName {
                      text
                    }
                  }
                  cardReason
                  cardType
                  pitchZone
                  isOutOfPitch
                  foulEvent {
                    id
                    foulType
                  }          
                }
              }      
            }
          }
        }
        ```
    </TabItem>
    <TabItem value="variablesCARD" label="Variables" default>
        ```json showLineNumbers title="Variables: Match Event data, event CARD"
        {
            //Everton vs. Wolverhampton, Premier League Match, 7. 1. 2026
            "matchId": "1935259481030262784"
            //Get maximum 100 records
            "recordsLimit": 100
        }
        ```
    </TabItem>
    <TabItem value="responseCARD" label="Response" default>
        ```json showLineNumbers title="Response: Match Event data, event CARD"
        {
        "data": {
          "match": {
            "matchEvents": {
              "entries": [
                {
                  "timeFrame": {
                    "phase": "IN_MATCH",
                    "period": "HALF_SECOND",
                    "elapsedMinute": 89,
                    "elapsedSecond": 1,
                    "displayMinute": 90,
                    "displayMinuteAdditional": 0
                  },
                  "type": "CARD",
                  "homeOrAway": "HOME",
                  "punishedPlayer": {
                    "localizedName": {
                      "text": "Grealish Jack"
                    }
                  },
                  "punishedTeam": {
                    "id": "1897619506600345601",
                    "localizedName": {
                      "text": "Everton"
                    }
                  },
                  "cardReason": "DISSENT",
                  "cardType": "RED_CARD_INDIRECT",
                  "pitchZone": null,
                  "isOutOfPitch": false,
                  "foulEvent": null
                },
                {
                  "timeFrame": {
                    "phase": "IN_MATCH",
                    "period": "HALF_SECOND",
                    "elapsedMinute": 86,
                    "elapsedSecond": 2,
                    "displayMinute": 87,
                    "displayMinuteAdditional": 0
                  },
                  "type": "CARD",
                  "homeOrAway": "HOME",
                  "punishedPlayer": {
                    "localizedName": {
                      "text": "Grealish Jack"
                    }
                  },
                  "punishedTeam": {
                    "id": "1897619506600345601",
                    "localizedName": {
                      "text": "Everton"
                    }
                  },
                  "cardReason": "DISSENT",
                  "cardType": "YELLOW_CARD",
                  "pitchZone": null,
                  "isOutOfPitch": false,
                  "foulEvent": null
                },
                {
                  "timeFrame": {
                    "phase": "IN_MATCH",
                    "period": "HALF_SECOND",
                    "elapsedMinute": 82,
                    "elapsedSecond": 9,
                    "displayMinute": 83,
                    "displayMinuteAdditional": 0
                  },
                  "type": "CARD",
                  "homeOrAway": "HOME",
                  "punishedPlayer": {
                    "localizedName": {
                      "text": "Keane Michael"
                    }
                  },
                  "punishedTeam": {
                    "id": "1897619506600345601",
                    "localizedName": {
                      "text": "Everton"
                    }
                  },
                  "cardReason": "VIOLENT_CONDUCT",
                  "cardType": "RED_CARD_DIRECT",
                  "pitchZone": null,
                  "isOutOfPitch": false,
                  "foulEvent": {
                    "id": "2009009772820692992",
                    "foulType": "ELBOWING"
                  }
                },
                "...",
                "..."		  
              ]
            }
          }
        }
        ```
    </TabItem>
</Tabs>

## Foul Event
### Business purpose
:::info[Foul Event Definition | no-icon]
Foul event represents a rule violation committed by a player during the match. This event type captures comprehensive data, including the data about players involved (who committed and who suffered the foul), the specific foul type, the on-pitch location, any resulting disciplinary actions (e.g., associated cards) and another attributes. 
:::

A **Foul Event** may be linked to a **Card Event** if the infraction warrants a booking. However, the card reference remains `null` for common fouls where no disciplinary action is taken, see [Card event](#card-event) for more details and following example.

See the [Foul object](../../../api-reference/objects/MatchEventFoulEvent) to get full list of specific attributes.

### How to get match event data: FOUL
<Tabs>
    <TabItem value="queryFOUL" label="Query" default>
        ```graphql showLineNumbers title="Query: Match Event data, event FOUL" 
        query Match  {
          match(id: $matchId) {
            matchEvents(
              first: $first
              filter:  {
                 types: [FOUL]
              }
              sort:  {
                 field: TIMESTAMP, direction: ASC
              }      
              ) {
              entries{
                timeFrame {
                  phase
                  period
                  elapsedMinute
                  elapsedSecond
                  displayMinute
                  displayMinuteAdditional          
                }
                type
                ... on FoulEvent{
                  homeOrAway
                  committedPlayer {
                    localizedFullName {
                      text
                    }
                  }
                  sufferedPlayer {
                    localizedFullName {
                      text
                    }
                  }
                  executorPlayer {
                    localizedFullName {
                      text
                    }
                  }
                  coordX
                  coordY
                  foulType
                  foulCategory
                  foulContext
                  hasStoppedScoringOpportunity
                  isFastBreakFoul
                  pitchZone
                  cardEvent {
                    cardType
                    cardReason
                  }
                }
              }      
            }
          }
        }
        ```
    </TabItem>
    <TabItem value="variablesFOUL" label="Variables" default>
        ```json showLineNumbers title="Variables: Match Event data, event FOUL"
        {
            //Everton vs. Wolverhampton, Premier League Match, 7. 1. 2026
            "matchId": "1935259481030262784"
            //Get maximum 100 records
            "recordsLimit": 100
        }
        ```
    </TabItem>
    <TabItem value="responseFOUL" label="Response" default>
        ```json showLineNumbers title="Response: Match Event data, event FOUL"
        {
        "data": {
          "match": {
            "matchEvents": {
              "entries": [
                {
                  "timeFrame": {
                    "phase": "IN_MATCH",
                    "period": "HALF_SECOND",
                    "elapsedMinute": 75,
                    "elapsedSecond": 56,
                    "displayMinute": 76,
                    "displayMinuteAdditional": 0
                  },
                  "type": "FOUL",
                  "homeOrAway": "AWAY",
                  "committedPlayer": {
                    "localizedFullName": {
                      "text": "Hwang Hee-Chan"
                    }
                  },
                  "sufferedPlayer": {
                    "localizedFullName": {
                      "text": "Armstrong Harrison"
                    }
                  },
                  "executorPlayer": null,
                  "coordX": 54.9,
                  "coordY": 85.1,
                  "foulType": "COMMON",
                  "foulCategory": "DEFENSIVE",
                  "foulContext": "TACKLE",
                  "hasStoppedScoringOpportunity": false,
                  "isFastBreakFoul": false,
                  "pitchZone": "ATTACKING_HALF_LEFT",
                  "cardEvent": {
                    "cardType": "YELLOW_CARD",
                    "cardReason": "SERIOUS_FOUL"
                  }
                },
                {
                  "timeFrame": {
                    "phase": "IN_MATCH",
                    "period": "HALF_SECOND",
                    "elapsedMinute": 76,
                    "elapsedSecond": 45,
                    "displayMinute": 77,
                    "displayMinuteAdditional": 0
                  },
                  "type": "FOUL",
                  "homeOrAway": "HOME",
                  "committedPlayer": {
                    "localizedFullName": {
                      "text": "Iroegbunam Timothy Emeka"
                    }
                  },
                  "sufferedPlayer": {
                    "localizedFullName": {
                      "text": "Mane Matheus"
                    }
                  },
                  "executorPlayer": null,
                  "coordX": 30.8,
                  "coordY": 61,
                  "foulType": "PUSHING",
                  "foulCategory": "DEFENSIVE",
                  "foulContext": null,
                  "hasStoppedScoringOpportunity": false,
                  "isFastBreakFoul": false,
                  "pitchZone": "DEFENDING_HALF",
                  "cardEvent": {
                    "cardType": "YELLOW_CARD",
                    "cardReason": "SERIOUS_FOUL"
                  }
                },
                "...",
                "..."
              ]
            }
          }
        }
      }
        ```
    </TabItem>
</Tabs>

## Period Start and End Event
### Business purpose
:::info[Period Start and End Event Definition | no-icon]
Period Start and End Event represents referee-led decisions regarding the timing of specific match periods. This typically includes the start and end of the first half, second half, and any extra time periods, but it can indicate some special actions such as the start of a match suspension too.

This event type captures key metadata: the specific action taken, the period context, and the precise timestamp within the match.
:::

See the [Period Start and End object](../../../api-reference/objects/MatchEventPeriodStartEndEvent) to get full list of specific attributes.

### How to get match event data: PERIOD_START_END
<Tabs>
    <TabItem value="queryCARD" label="Query" default>
        ```graphql showLineNumbers title="Query: Match Event data, event PERIOD_START_END" 
        query Match  {
          match(id: $matchId) {
            matchEvents(
              first: $first
              filter:  {
                 types: [PERIOD_START_END]
              }
              sort:  {
                 field: TIMESTAMP, direction: ASC
              }      
              ) {
              entries{
                timeFrame {
                  phase
                  period
                  elapsedMinute
                  elapsedSecond
                  displayMinute
                  displayMinuteAdditional          
                }
                type
                ... on PeriodStartEndEvent{
                  refereeAction
                  timestamp
                }
              }      
            }
          }
        }
        ```
    </TabItem>
    <TabItem value="variablesCARD" label="Variables" default>
        ```json showLineNumbers title="Variables: Match Event data, event PERIOD_START_END"
        {
            //Everton vs. Wolverhampton, Premier League Match, 7. 1. 2026
            "matchId": "1935259481030262784"
            //Get maximum 100 records
            "recordsLimit": 100
        }
        ```
    </TabItem>
    <TabItem value="responseCARD" label="Response" default>
        ```json showLineNumbers title="Response: Match Event data, event PERIOD_START_END"
        {
        "data": {
          "match": {
            "matchEvents": {
              "entries": [
                {
                  "timeFrame": {
                    "phase": "IN_MATCH",
                    "period": "HALF_FIRST",
                    "elapsedMinute": 0,
                    "elapsedSecond": 0,
                    "displayMinute": 1,
                    "displayMinuteAdditional": 0
                  },
                  "type": "PERIOD_START_END",
                  "refereeAction": "PERIOD_START",
                  "timestamp": "2026-01-07T19:30:30Z"
                },
                {
                  "timeFrame": {
                    "phase": "IN_MATCH",
                    "period": "HALF_FIRST",
                    "elapsedMinute": 46,
                    "elapsedSecond": 7,
                    "displayMinute": 45,
                    "displayMinuteAdditional": 2
                  },
                  "type": "PERIOD_START_END",
                  "refereeAction": "PERIOD_END",
                  "timestamp": "2026-01-07T20:16:38Z"
                },
                {
                  "timeFrame": {
                    "phase": "IN_MATCH",
                    "period": "HALF_SECOND",
                    "elapsedMinute": 45,
                    "elapsedSecond": 0,
                    "displayMinute": 46,
                    "displayMinuteAdditional": 0
                  },
                  "type": "PERIOD_START_END",
                  "refereeAction": "PERIOD_START",
                  "timestamp": "2026-01-07T20:32:37Z"
                },
                {
                  "timeFrame": {
                    "phase": "IN_MATCH",
                    "period": "HALF_SECOND",
                    "elapsedMinute": 99,
                    "elapsedSecond": 25,
                    "displayMinute": 90,
                    "displayMinuteAdditional": 10
                  },
                  "type": "PERIOD_START_END",
                  "refereeAction": "PERIOD_END",
                  "timestamp": "2026-01-07T21:27:03Z"
                }
              ]
            }
          }
        }
      }
        ```
    </TabItem>
</Tabs>


