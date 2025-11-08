---
id:     intro
title:  Football API Intro
---

# Football API Intro

## What is Football API?
Football API a GraphQL API allowing to access football data stored in Livesport Football Database.

If you are a football enthusiastic and understand how the football domain works, you will understand the Football API without anything to study before. If not, please, meet the [API Schema](api-schema/api-schema-intro.md) before you start to query the Football API, 

## Getting Started
1. Get Credentials
2. Write and run the queries
3. Process the data

## The Snowflake ID
:::info
All data in the Livesport Football Database (the source for Football API) is described using a unique **Snowflake ID**.
:::
---

### How to Get the IDs You Need

There are two main scenarios for retrieving IDs.

#### Scenario 1: Starting fresh (no existing IDs)
If you intend to use the Football API as the *only* source of football data and don't need to map IDs from another system, you must start by using our **Search Queries**.

This will allow you to obtain the Snowflake IDs for base entities such as competitions, seasons, matches, and players.

#### Scenario 2: Mapping your existing IDs to Snowflake IDs
If your goal is to enhance your current product with data from the Livesport Football Database, your approach depends on the IDs you currently use:

* **You use StatsPerform or Datacore IDs:**
    * Use our **Mapping Service** to get the corresponding Snowflake ID based on the StatsPerform / Datacore ID.

* **You use any other IDs (e.g., your own internal IDs):**
    * We cannot provide a service for direct ID mapping in this case.
    * You must use our **Search Queries** to find the entity (e.g., by the name of the competition, season, or home/away team) and retrieve its Snowflake ID. 


