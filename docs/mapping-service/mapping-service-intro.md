---
id:    mapping-service-intro
title: Mapping Service
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Business Purpose

:::info[no-header]
The **Mapping Service** enables cross-referencing between the Football API and third-party providers. It allows you to:
* Resolve external IDs to their corresponding internal **Snowflake IDs**.
* Translate internal **Snowflake IDs** back to their associated external identifiers.
:::

:::danger[Snowflake ID is essential]
The Football API uses **Snowflake IDs** as the primary identifiers for all entities within Football DB. These IDs are unique to the Football ecosystem and are required for all API queries. Without the correct Snowflake IDs, you cannot retrieve data from the Football API.
:::

If your system identifies football entities using IDs from an external provider, you must first map those IDs to their corresponding Snowflake IDs before querying the Football API. The Mapping Service provides this translation.

:::tip
The Mapping Service does not support arbitrary external ID schemes — only a defined set of third-party ID types can be resolved. Currently, **only IDs** issued by **StatsPerform** and **Datacore** are supported.

Don't have StatsPerform or Datacore IDs? If your system does not hold the supported identifiers, you can still discover the relevant Snowflake IDs using [Search Queries](../api-guide/search-queries.md).
:::

**Need a large-scale integration?** For bulk entity matching between your system and Football Pipeline IDs, a dedicated onboarding process is available. [Contact the development team](../contacts/contact.md) for details.

## How the Mapping service Works

The Mapping Service is a REST API. 

Mapping service supports **multiple domains**. Each domain has its own **identity space** and supported entity types. For football oriented entities you have to use  `/football` in URL. See the [Supported Entity Types](#supported-entity-types) section for details on which entity types are supported within the football domain.

To resolve IDs, you send a `GET` request specifying:

1. The **entity type** you want to resolve (e.g., `player`, `team`, `competition`).
2. The **source system** (`from`) — the provider whose IDs you hold (e.g., `STATSPERFORM`).
3. The **target system** (`to`) — the ID space you need (use `DATACORE` to get Football API Snowflake IDs).
4. One or more **IDs** to resolve.


:::tip[Bulk mapping]
You can use Mapping service to get IDs pair for single ID or submit multiple IDs in a single request by repeating the `ids` query parameter. The service will attempt to resolve each ID independently.

The service returns a flat JSON object mapping each submitted ID to its corresponding Snowflake ID. If an ID has no known mapping, its value is `null`.
:::
:::warning[One-way mapping]
Mapping process works on a one-way principle. One side of the mapping pair must be Snowflake ID (Football API internal ID) and the other side must be an external ID from a supported provider. You cannot map between two external ID systems directly — you must first map to Snowflake IDs, then from Snowflake IDs to the other external system if needed.
:::

The typical workflow looks like this:
```
StatsPerform IDs  →  Mapping Service (from=STATSPERFORM)  →  Snowflake IDs  →  Football API
```

## Mapping Service Environments
The Mapping Service is available in the following environments:
| Environment | Base URL                          |
|-------------|-----------------------------------|
| Production  | `https://id-mapping-service.prod.lsapi.eu/` |
| Staging     | `https://id-mapping-service.stage.lsapi.eu/` |
| Development  | `http://id-mapping-service-cds-interfaces-dev.okubeapi1.kube.lsoffice.cz/` |

For **football domain**, the endpoint format is:
```
{BASE_URL}/football/{entityType}
```

## Authentication
All requests to the Mapping Service must include a **valid Bearer token in the `Authorization` header**. 

This token **is the same as the one used for Football API access**. Ensure that your token has the necessary permissions to access the Mapping Service.

## Supported Entity Types

These entity types are supported for **Football domain** (`/football/{entityType}`):

| Entity Type           | Description               |
|-----------------------|---------------------------|
| `player`              | Individual football player |
| `team`                | Team (club or national)    |
| `club`                | Football club              |
| `national-association`| National football association |
| `competition`         | Football competition / league |
| `season`              | Competition season         |
| `season-stage`        | Stage within a season      |
| `match`               | Individual match           |
| `match-event`         | Event within a match       |


## Supported Providers

| Provider       | Value          | Description                           |
|----------------|----------------|---------------------------------------|
| StatsPerform   | `STATSPERFORM` | IDs issued by StatsPerform            |
| Football API   | `DATACORE`     | Internal Snowflake IDs (Football API) |
| WATA           | `WATA`         | IDs issued by WATA                    |


## Query Parameters

| Parameter | Required | Description                                              |
|-----------|----------|----------------------------------------------------------|
| `from`    | Yes      | Source ID system. The provider whose IDs you are submitting. |
| `to`      | Yes      | Target ID system. Use `DATACORE` to obtain Snowflake IDs for Football API. |
| `ids`     | Yes      | Array of IDs to resolve (repeat the parameter for each ID). |


## Error Handling

| HTTP Status | Description |
|-------------|-------------|
| `200 OK` | Request succeeded. Inspect individual values — `null` means the ID was not found. |
| `404 Not Found` | The specified `entityType` path segment does not exist. Verify the entity type against the [supported values](#supported-entity-types). |
| `500 Internal Server Error` | An unexpected server-side error occurred. Retry after a short delay; if the issue persists, [contact the team](../contacts/contact.md). |

## How to get data
### Resolving StatsPerform Match ID to Snowflake ID
:::info[no-header]
You have match ID from StatsPerform and need its Football API Snowflake IDs.
:::

<Tabs>
<TabItem value="request" label="Request" default>
```bash showLineNumbers title="Bulk resolving StatsPerform player IDs to Snowflake IDs"
curl -G "MAPPING_SERVICE_BASE_URL/football/match" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  --data-urlencode "from=STATSPERFORM" \
  -d "ids=4cm108ohxx531fr98bh9uy68k"
```
</TabItem>
<TabItem value="response" label="Response">
```json showLineNumbers title="Two IDs resolved, one not found"
{
    "4cm108ohxx531fr98bh9uy68k": "1935259476236189696"
}
```
</TabItem>
</Tabs>

The response is a flat JSON object where:
- **Key** — the ID you submitted.
- **Value** — the corresponding Snowflake ID, or `null` if no mapping exists for that ID.

The provided StatsPerform ID `4cm108ohxx531fr98bh9uy68k` corresponds to just one unique Snowflake ID `1935259476236189696`. These both IDs leads to one match of English Premier League, West Ham United vs Manchester United, played on 2026-03-14.

:::tip
Keep in mind the name of the ID attribute. Even if you need to retrieve a pair for just one ID, you must still use  `ids` as the query parameter name and provide the ID as its value.
:::

### Bulk resolving StatsPerform Player IDs to Snowflake IDs
:::info[no-header]
You have more player IDs from StatsPerform and need their Football API Snowflake IDs.
:::

<Tabs>
<TabItem value="request" label="Request" default>
```bash showLineNumbers title="Bulk resolving StatsPerform player IDs to Snowflake IDs"
curl -G "MAPPING_SERVICE_BASE_URL/football/player" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  --data-urlencode "from=STATSPERFORM"
  -d "ids=330k0yqjq1ubnkfpfshp2h6qy" \
  -d "ids=897kbab7cx7bnhxhaghpy3f11" \
  -d "ids=111"
```
</TabItem>
<TabItem value="response" label="Response">
```json showLineNumbers title="Two IDs resolved, one not found"
{
  "330k0yqjq1ubnkfpfshp2h6qy": "1897695013094293505",
  "897kbab7cx7bnhxhaghpy3f11": "1958732041234567891",
  "111":  null
}
```
</TabItem>
</Tabs>

The response is a flat JSON object where:
- **Key** — the ID you submitted.
- **Value** — the corresponding Snowflake ID, or `null` if no mapping exists for that ID.

### Reverse Lookup — From Snowflake ID to StatsPerform ID
:::info[no-header]
The mapping is bidirectional. To find the StatsPerform ID for a known Snowflake ID, **swap the `from` and `to`** parameters in your request and **change the input ID.**
:::

<Tabs>
<TabItem value="request" label="Request" default>
```bash showLineNumbers title="Resolve a Snowflake ID back to a StatsPerform player ID"
curl -G "MAPPING_SERVICE_BASE_URL/football/player" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  --data-urlencode "to=STATSPERFORM" \
  -d "ids=1935259476236189696" \
```
</TabItem>
<TabItem value="response" label="Response">
```json showLineNumbers title="Response"
{
  "1935259476236189696": "4cm108ohxx531fr98bh9uy68k"
}
```
</TabItem>
</Tabs>

The response is a flat JSON object where:
- **Key** — the ID you submitted.
- **Value** — the corresponding StatsPerform ID, or `null` if no mapping exists for that ID.

The provided Snowflake ID `1935259476236189696` corresponds to just one unique StatsPerform ID `4cm108ohxx531fr98bh9uy68k`. These both IDs leads to one match of English Premier League, West Ham United vs Manchester United, played on 2026-03-14.