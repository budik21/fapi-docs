---
id:    search-queries
title: Search Queries
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What are Search Queries?

Search Queries are a set of Football API queries that allow you to find entities in the Livesport Football Database **by name or other attributes**, or to filter entities when you already know a specific ID.

They are the recommended starting point for integrations where the consuming system has no direct mapping to Football API internal IDs and cannot use the [Mapping Service](../mapping-service/mapping-service-intro) to resolve them.

## Available Search Queries

Search Queries are available for the following entity types:
 - **Competitions**
 - **Seasons**
 - **Season Stages**
 - **Teams** 
 - **Matches**

## Competitions
The [Competition](objects-business/competition) is the top-level entity in the football data hierarchy — the foundation on which **Seasons** and **Season Stages** are built. Note that no match is directly linked to a competition. Every match belongs to a **Season Stage**, which belongs to a **Season**, which belongs to a **Competition**.

Querying competitions is therefore typically the first step when navigating the data pyramid.

:::tip[Competition > Season > Season Stage]
Understanding the distinction between `Competition`, `Season`, and `Season Stage` objects is crucial.

While the `Competition` is, for example, the **English Premier League**, the `Season` represents the specific campaign, e.g., *2025/2026* (starting August 15th, 2025, and ending May 14th, 2026). The Premier League operates on a single-stage model where all teams play each other twice; therefore, this specific season contains only one Season Stage.

Another example is the **UEFA Champions League (UCL)**. Like the Premier League, the UCL consists of annual seasons (e.g., the 2024/2025 season won by Paris St. Germain). However, unlike the Premier League, the UCL is divided into **three distinct Season Stages**:
1. **Qualifying** (play-off system)
2. **League Phase** (special league system)
3. **Play-offs** (knockout system)
:::

Competition Search Queries cover two primary use cases:

- **Listing available competitions** — retrieve all competitions accessible under your subscription, without any filtering criteria.
- **Searching competitions by criteria** — filter competitions by name or other attributes to locate a specific competition or a subset of competitions.

### How to get all competitions

This approach is straightforward and requires no input parameters. It returns a list of all competitions available under your subscription, which you can then filter on the client side based on your needs.

:::danger[Pagination required]
To prevent queries from returning excessive data volumes, a maximum of **1,000 competitions** can be returned per request. If your subscription covers more competitions, you must paginate through the results using [cursor-based pagination](../api-essentials#pagination).
:::

:::warning[Query complexity limit]
Because `Competition` is a top-level object, the query can also request subordinate objects — such as **Seasons**, **Season Stages**, or **Matches**. However, the system evaluates the overall complexity of each request. If a query is deemed too complex, it will be rejected and not processed. Reduce the depth or breadth of the requested data to stay within the complexity limit. See [Query Complexity](../api-essentials#query-complexity) for details.
:::

<Tabs>
    <TabItem value="paginationQuery" label="Query" default>
        ```graphql showLineNumbers title="Cursor-based pagination"
        query getCompetitions($pagination: Pagination!) {
          competitions(pagination: $pagination) {
            pageInfo {
              cursor
              timestamp
            }
            items {
              id
              localizedName {
                text
              }
            }
          }
        }
        ```
    </TabItem>
    <TabItem value="paginationVariables" label="Variables">
        ```json showLineNumbers title="Pagination: First 10 items"
        {
          "pagination": {
            "first": 10,
            "after": null
          }
        }
        ```
        ```json showLineNumbers title="Pagination: Next page — use cursor from previous response"
        {
          "pagination": {
            "after": "cursor_value_from_previous_response",
            "first": 10
          }
        }
        ```
    </TabItem>
    <TabItem value="paginationResult" label="Result">
        ```json showLineNumbers title="Response contains the next cursor and the items"
        {
          "data": {
            "competitions": {
              "pageInfo": {
                "cursor": "eyJpZCI6IjE4OTc2NDc0OTk0MjI5OTAzMzYiLCJuYW1lIjoiIn0=",
                "timestamp": "2026-04-13T10:18:36Z"
              },
              "items": [
                {
                  "id": "1897647499292966912",
                  "localizedName": {
                    "text": "Uhren Cup"
                  }
                },
                {
                  "id": "1897647499301355520",
                  "localizedName": {
                    "text": "Premier League"
                  }
                },
                {
                  "id": "1897647499313938432",
                  "localizedName": {
                    "text": "CAF Champions League"
                  }
                },
                {
                  "id": "1897647499318132736",
                  "localizedName": {
                    "text": "HNL"
                  }
                },
                {
                  "id": "1897647499322327040",
                  "localizedName": {
                    "text": "Super Cup"
                  }
                },
                {
                  "id": "1897647499343298560",
                  "localizedName": {
                    "text": "Champions League"
                  }
                },
                {
                  "id": "1897647499381047296",
                  "localizedName": {
                    "text": "Asian Cup"
                  }
                },
                {
                  "id": "1897647499381047297",
                  "localizedName": {
                    "text": "Premier League"
                  }
                },
                {
                  "id": "1897647499385241600",
                  "localizedName": {
                    "text": "Serie B Superbet"
                  }
                },
                {
                  "id": "1897647499422990336",
                  "localizedName": {
                    "text": "Super Cup"
                  }
                }
              ]
            }
          }
        }
        ```
    </TabItem>
</Tabs>

### How to search competitions by criteria

This approach allows you to narrow down the list of competitions using a `filter` object. Filters can target competition attributes such as type, gender, age category, or name. Only competitions matching all specified criteria are returned.

The `filter` argument is optional — omitting it returns all competitions (subject to pagination). Filters can be combined freely; unset fields are ignored.

:::tip[How filtering of text parameters works]
If you filter any text attributes, you have to use the `startsWith` operator. Its name may be tricky — it does not require the competition name itself to begin with the given string. Instead, it matches any competition where **at least one word or phrase within the name** starts with that string.

For example, `"startsWith": "World Cup"` matches both **"World Cup"** (phrase at the start) and **"Kings World Cup Nations"** (phrase starting mid-name).
:::

<Tabs>
    <TabItem value="searchQuery" label="Query" default>
        ```graphql showLineNumbers title="Search competitions by filter criteria"
        query Competitions($pagination: Pagination!, $filter: CompetitionsFilter) {
          competitions(pagination: $pagination, filter: $filter) {
            items {
              id
              localizedName {
                text
              }
              country
              gender
              ageGroup
              region
            }
          }
        }
        ```
    </TabItem>
    <TabItem value="searchVariables" label="Variables">
        ```json showLineNumbers title="Example: Men's senior World Cup competitions"
        {
          "pagination": {
            "after": null,
            "first": 100
          },
          "filter": {
            "type": "NATIONAL_TEAM",
            "ageCategory": "ADULTS",
            "gender": "MEN",
            "name": {
              "startsWith": "World Cup"
            }
          }
        }
        ```
    </TabItem>
    <TabItem value="searchResult" label="Result">
        ```json showLineNumbers title="Example: Men's senior World Cup competitions"
        {
          "data": {
            "competitions": {
              "items": [
                {
                  "id": "1897647561859399681",
                  "localizedName": {
                    "text": "World Cup"
                  },
                  "country": null,
                  "gender": "MEN",
                  "ageGroup": "ADULTS",
                  "region": "WORLD"
                },
                {
                  "id": "1993251038383308800",
                  "localizedName": {
                    "text": "Kings World Cup Nations"
                  },
                  "country": null,
                  "gender": "MEN",
                  "ageGroup": "ADULTS",
                  "region": "WORLD"
                }
              ]
            }
          }
        }
        ```
    </TabItem>
</Tabs>

### How to get competitions by historical name

Name-based filtering searches across both the **current name** and all **historical names** of a competition. A competition is returned if the search phrase matches any name it has ever carried — past or present.

This is particularly useful for competitions that have undergone sponsor-driven renames over time. For example, the top Czech football league has been known under several names:

- *Gambrinus Liga* (until 2015)
- *Synot liga* (2015–2016)
- *Fortuna liga* (2016–2021)
- *Chance liga* (2021–present)

Searching for `"startsWith": "Chance"` returns the competition because Chance Liga is its current name. Searching for `"startsWith": "Gambrinus"` returns the same competition because that was its historical name. Both queries resolve to the same entity — the highest Czech football league.

<Tabs>
    <TabItem value="historicalQuery" label="Query" default>
        ```graphql showLineNumbers title="Search by historical competition name"
        query Competitions($pagination: Pagination!, $filter: CompetitionsFilter) {
          competitions(pagination: $pagination, filter: $filter) {
            items {
              id
              localizedName {
                text
              }
              country
              gender
              ageGroup
              region
            }
          }
        }
        ```
    </TabItem>
    <TabItem value="historicalVariables" label="Variables">
        ```json showLineNumbers title="Search by current name"
        {
          "pagination": {
            "after": null,
            "first": 10
          },
          "filter": {
            "name": {
              "startsWith": "Chance Liga"
            }
          }
        }
        ```
        ```json showLineNumbers title="Search by historical name — returns the same competition"
        {
          "pagination": {
            "after": null,
            "first": 10
          },
          "filter": {
            "name": {
              "startsWith": "Gambrinus Liga"
            }
          }
        }
        ```
    </TabItem>
    <TabItem value="historicalResult" label="Result">
        ```json showLineNumbers title="Result: historical name resolves to the current competition"
        {
          "data": {
            "competitions": {
              "items": [
                {
                  "id": "1897647548932554756",
                  "localizedName": {
                    "text": "Chance Liga"
                  },
                  "country": "CZECH_REPUBLIC",
                  "gender": "MEN",
                  "ageGroup": "ADULTS",
                  "region": null
                }
              ]
            }
          }
        }
        ```
    </TabItem>
</Tabs>

## Seasons

_(to be documented)_

## Season Stages

_(to be documented)_

## Matches

_(to be documented)_

## Teams

_(to be documented)_