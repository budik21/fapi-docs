---
id:     timeFrame
title:  Time Frame
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Dependencies
The `timeFrame` object is used with all event-related business objects in a match.

## Business purpose
:::info
The `timeFrame` object defines the exact moment in the match when an event occurred, using **match phase**, **match period**, and **match time** attributes.
:::

The [match phase](../../api-reference/enums/MatchPhase) and [match period](../../api-reference/enums/MatchPeriod) are represented by enum values.

Match time can be expressed in two ways:
* **Elapsed time** – provides the most precise match time in the `mm:ss` format. For example, if a goal is scored at `46:58` of the `PERIOD_FIRST`, this format captures the exact moment. You can read this from the `elapsedMinute` and `elapsedSeconds` attributes.
* **Display time** – the more common, user-friendly format used in match presentations. Instead of showing the exact second, it represents:
    * the **regular minute** (limited by the period length), and
    * the **additional minute** (if the event occurred in additional (stoppage) time).  
      For example, for the same event at `46:58` in the `PERIOD_FIRST`, the `displayMinute` would be `45` and the `additionalMinute` would be `2`.

You can use either approach depending on your needs, or even combine both for more context.

## How to get the time frame
<Tabs>
    <TabItem value="query" label="Query" default>
    ```graphql showLineNumbers title="Query: Using a timeFrame object in a query getting momentum data" 
    query Match {
      match(id: 1934986921185116160) {
        momentum {
          entries {
            timeFrame {
              phase
              period
              elapsedMinute
              elapsedSecond
              displayMinute
              displayMinuteAdditional
            }
            homeValue
            awayValue
            combinedValue
          }
        }
      }
    }
    ```
    </TabItem>
<TabItem value="response" label="Response" default>
    ```json showLineNumbers title="Response: Match Momentum Data using a timeFrame object"
    {
      "data": {
        "match": {
          "momentum": {
            "entries": [
              ...
              ...		  
              {
                "timeFrame": {
                  "phase": "IN_MATCH",
                  "period": "HALF_SECOND",
                  "elapsedMinute": 94,
                  "elapsedSecond": 59,
                  "displayMinute": 90,
                  "displayMinuteAdditional": 5
                },
                "homeValue": 0.23536,
                "awayValue": 0.004815,
                "combinedValue": 0.230545
              }          
            ]
          }
        }
      }
    }
    ```
    </TabItem>
</Tabs>


The data in the `timeFrame` object represents the match time to which the momentum data relates. It tells you both **what happened** (momentum data) and **when it happened** (time frame data).

In example response above you receive the following information:
* Momentum value for **home team:** `0.23536`
* Momentum value for **away team:** `0.004815`
* Momentum value **combined:** `0.230545`
* Momentum is valid for **period:** `2nd half`
* Momentum is valid for **play-time time (mm:ss format)** `94:59`
* Momentum is valid for **play-time time (short format)** `90+5`

 