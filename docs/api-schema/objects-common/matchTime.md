---
id:     match-time
title:  Match Time
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Dependencies
The `matchTime` object is used inside the `Match` object.

## Business purpose
:::info[no-header]
The `matchTime` object returns **the current play time** relative to a specific timestamp provided as an input parameter. If no timestamp is specified, it defaults to the current time (the time when the request is processed). This object is populated only during the `IN_MATCH` phase; otherwise, it returns `NULL`.
:::

:::tip[Mind the matchTime and timeFrame difference]
The `matchTime` object is similar to [timeFrame object](time-frame), but there is a fundamental difference between them.

While `matchTime` represents the **dynamic running clock** of the match, the `timeFrame` represents the **static moment** an event occurred (like a snapshot), . You typically query `matchTime` to display a live timer, whereas `timeFrame` is used to list match events.
:::

## How to get the match time
<Tabs>
    <TabItem value="query" label="Query" default>
    ```graphql showLineNumbers title="Query: Using a matchTime object in a query getting match detailed data" 
    query Match {
      match(id: 1934986921185116160) {
        ...
      }
    }
    ```
    </TabItem>
<TabItem value="response" label="Response" default>
    ```json showLineNumbers title="Response: Match Data using a matchTime object"
    {
      "data": {
        "match": {
          ...
        }
      }
    }
    ```
    </TabItem>
</Tabs>