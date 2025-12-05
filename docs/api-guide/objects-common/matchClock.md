---
id:     match-clock
title:  Clock
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Dependencies
The `Clock` object is used inside the `Match` object.

## Business purpose
:::info[no-header]
The `Clock` object returns **the current play time** relative to a specific timestamp provided as an input parameter (`at`). If `at` is not specified (or is `null`), it defaults to the time when the request is processed.

Note that `Clock` attributes are populated only during the `IN_MATCH` phase; otherwise, they return `null`. The only exception is the `phase` attribute, which always returns the current match state (`BEFORE_MATCH`, `IN_MATCH`, or `AFTER_MATCH`).
:::

:::tip[Mind the clock and timeFrame difference]
The `clock` object is similar to [timeFrame object](time-frame), but there is a fundamental difference between them.

While `clock` represents the **dynamic running clock** of the match, [timeFrame](./time-frame) represents the **static moment** an event occurred (like a snapshot). You typically use `clock` to display a live timer, whereas `timeFrame` is used to identify exactly when an event took place, particularly when querying data after the match has finished.
:::

## How to get the match clock data
### Live Match Clock Value
:::tip[Omitting the at parameter]
If you omit the `at` parameter, the returned match clock value corresponds to the moment of request processing. 
:::
<Tabs>
    <TabItem value="query" label="Query" default>
    ```graphql showLineNumbers title="Query: Using a clock object to get current valid match time" 
    query Match ($matchId: ID!)  {
      match(id: $matchId) {    
        clock {
          phase
          period
          elapsedMinute
          elapsedSecond
          displayMinute
          displayMinuteAdditional
        }
        id
        homeTeam{
          localizedName {
            text
          }
        }
        awayTeam{
          localizedName {
            text
          }
        }
      }
    }
    ```
</TabItem>
<TabItem value="variables" label="Variables" default>
    ```json showLineNumbers title="Variables: Desired match ID"
    {
      //Australian A-League, Perth Glory - Western Sydney Wanderers, December 5th, 2025  
      "matchId": "1965998289631592448"
    }
    ```
</TabItem>
<TabItem value="response" label="Response" default>
    ```json showLineNumbers title="Response: Current match time"
    {
      "data": {
        "match": {
          "clock": {
            "phase": "IN_MATCH",
            "period": "HALF_FIRST",
            "elapsedMinute": 13,
            "elapsedSecond": 16,
            "displayMinute": 14,
            "displayMinuteAdditional": 0
          },
          "id": "1965998289631592448",
          "homeTeam": {
            "localizedName": {
              "text": "Perth Glory"
            }
          },
          "awayTeam": {
            "localizedName": {
              "text": "Western Sydney Wanderers"
            }
          }
        }
      }
    }
    ```
    </TabItem>
</Tabs>

### Match Clock Value at a Specific Moment
To retrieve the state of the match clock at a specific point in time, use the `at` parameter. You can provide either the current timestamp (equivalent to omitting the `at` parameter) or any historical timestamp.

The `at` timestamp must be formatted according to RFC 3339 and expressed in the UTC time zone.

:::warning[Timestamp out of range]
If the provided `at` timestamp is before the match start, the object returns `null`.
If the timestamp is in the future, the system defaults to the current timestamp.
:::

<Tabs>
    <TabItem value="query1" label="Query" default>
    ```graphql showLineNumbers title="Query: Using a clock object to get valid match time at the specific moment" 
    query Match ($matchId: ID!)  {
      match(id: $matchId) {    
        clock (at: "2025-12-05T10:56:28Z") {
          phase
          period
          elapsedMinute
          elapsedSecond
          displayMinute
          displayMinuteAdditional
        }
        id
        homeTeam{
          localizedName {
            text
          }
        }
        awayTeam{
          localizedName {
            text
          }
        }
      }
    }
    ```
</TabItem>
<TabItem value="variables1" label="Variables" default>
    ```json showLineNumbers title="Variables: Desired match ID"
    {
      //Australian A-League, Perth Glory - Western Sydney Wanderers, December 5th, 2025  
      "matchId": "1965998289631592448"
    }
    ```
</TabItem>
<TabItem value="response1" label="Response" default>
    ```json showLineNumbers title="Response: Match time valid at specific moment"
    {
      "data": {
        "match": {
          "clock": {
            "phase": "IN_MATCH",
            "period": "HALF_FIRST",
            "elapsedMinute": 11,
            "elapsedSecond": 10,
            "displayMinute": 12,
            "displayMinuteAdditional": 0
          },
          "id": "1965998289631592448",
          "homeTeam": {
            "localizedName": {
              "text": "Perth Glory"
            }
          },
          "awayTeam": {
            "localizedName": {
              "text": "Western Sydney Wanderers"
            }
          }
        }
      }
    }
    ```
    </TabItem>
</Tabs>

Queries with the `at` parameter return the same data structure as standard requests. However, the clock values differ: while a standard request returns the current time, the `at` parameter retrieves the specific requested time (resulting in a difference of approx. 2 minutes in this example).