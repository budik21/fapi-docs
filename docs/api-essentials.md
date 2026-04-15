---
id:     api-essentials
title:  API Essentials
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What is Football API?
Football API is a GraphQL API allowing to access football data stored in Livesport Football Database.

While football enthusiasts will find the API structure intuitive immediately, we strongly recommend the [API Guide](api-guide/api-guide-intro) section to everyone. It is an essential guide to the domain logic, especially if you are new to the sport. This chapter explains the structure of API objects from a business perspective rather than a technical one.

If you are interested in the technical details, please refer to chapter [API Reference](api-reference/api-reference-intro).

## Getting Started
1. Understand the domain
2. Get Credentials
3. Generate an access token from your credentials
4. Run the Query
5. Process the data

### Understanding the Domain

All API objects are named using standard football terminology. If you are familiar with the sport, you will easily understand the API object structure and be able to build queries to retrieve the data you need.

Otherwise you can learn the basics in [API Guide](api-guide/api-guide-intro) chapter. This chapter presents the API from the business point of view. If you need technical information about the API objects, enums, interfaces etc. follow the [API Reference](api-reference/api-reference-intro).


### Get Credentials
The Football API does not allow anonymous access.
This means you need credentials, which consist of:
* Client ID
* Client Secret

These credentials allow you to generate a temporarily valid access token, which you must include with each request for authentication.
Credentials are issued by the Football API team. See [Contacts](./contacts/contacts) chapter and contact the Football API team to get the credentials.

### Generate an Access Token from Your Credentials

Once you have your credentials, you can generate an access token using the following steps, which follow the OAuth 2.0 Client Credentials grant flow.

1.  **Combine Credentials:** Join your `Client ID` and `Client Secret` with a single colon (`:`).
2.  **Encode with Base64:** Encode the combined string from Step 1 using Base64.
3.  **Prepare a POST Request:** Construct a POST request with the following components:
    * **Headers:**
        * `Content-Type: application/x-www-form-urlencoded`
        * `Authorization: Basic <encoded_credentials>` (Use the Base64-encoded string from Step 2)
    * **Body (form data):**
        * `grant_type=client_credentials`
4.  **Send Request:** Send the prepared POST request to the [Authentication Server](#authentication-server).
5.  **Process Response:** Parse the JSON response from the server and extract the value of the `access_token` field.

See the examples below for implementation details.

<Tabs>
    <TabItem value="accessKeyCURL" label="cURL" default>
        ```bash showLineNumbers title="How to generate the access token using cURL"
        curl -X POST https://auth.lsapi.eu/oauth2/token \
          -H "Content-Type: application/x-www-form-urlencoded" \
          -H "Authorization: Basic $(echo -n '<CLIENT_ID>:<CLIENT_SECRET>' | base64)" \
          -d "grant_type=client_credentials"
        ```
    </TabItem>
    <TabItem value="accessKeyPHP" label="PHP">
        ```php showLineNumbers title="How to generate the access token in PHP"
        /**
         * Fetches an OAuth 2.0 Access Token (Client Credentials Grant).
         *
         * Exchanges Client ID/Secret for a token used in subsequent API calls.
         *
         * Relies on 3 global variables to be set:
         * 1. $GLOBALS['FOOTBALL_API_CLIENT_ID']
         * 2. $GLOBALS['FOOTBALL_API_CLIENT_SECRET']
         * 3. $GLOBALS['FOOTBALL_API_AUTH_URL']
         *
         * @return string The access_token.
         */
        function getAccessToken(){

            // 1. Prepare Basic Auth header (Base64 encoded credentials)
            $credentials = base64_encode($GLOBALS['FOOTBALL_API_CLIENT_ID'] . ':' . $GLOBALS['FOOTBALL_API_CLIENT_SECRET']);

            // 2. Configure the cURL POST request
            $authRequest = curl_init();
            curl_setopt($authRequest, CURLOPT_POST, true);
            curl_setopt($authRequest, CURLOPT_POSTFIELDS, http_build_query(array(
                    'grant_type' => 'client_credentials')
            ));
            curl_setopt($authRequest, CURLOPT_URL, $GLOBALS['FOOTBALL_API_AUTH_URL']);
            curl_setopt($authRequest, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($authRequest, CURLOPT_HEADER, false);
            curl_setopt($authRequest, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/x-www-form-urlencoded',
                'Authorization: Basic ' . $credentials,
            ));

            // 3. Execute, decode JSON, and return the access_token
            $authResponse = curl_exec($authRequest);
            return json_decode($authResponse)->access_token;
        }
        ```
    </TabItem>
    <TabItem value="accessKeyPython" label="Python">
        ```python showLineNumbers title="How to generate the access token in Python"
        import base64
        import requests

        def get_access_token(client_id: str, client_secret: str, auth_url: str) -> str:
            """
            Fetches an OAuth 2.0 Access Token (Client Credentials Grant).

            Exchanges Client ID/Secret for a token used in subsequent API calls.

            :param client_id:     The Football API Client ID.
            :param client_secret: The Football API Client Secret.
            :param auth_url:      The URL of the authentication server.
            :return: The access_token string.
            """
            # 1. Prepare Basic Auth header (Base64 encoded credentials)
            credentials = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()

            # 2. Send the POST request
            response = requests.post(
                auth_url,
                headers={
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": f"Basic {credentials}",
                },
                data={"grant_type": "client_credentials"},
            )
            response.raise_for_status()

            # 3. Extract and return the access_token
            return response.json()["access_token"]
        ```
    </TabItem>
    <TabItem value="accessKeyGo" label="Go">
        ```go showLineNumbers title="How to generate the access token in Go"
        package main

        import (
            "bytes"
            "encoding/base64"
            "encoding/json"
            "net/http"
        )

        /**
        * Fetches an OAuth 2.0 Access Token (Client Credentials Grant).
        *
        * Exchanges Client ID/Secret for a token used in subsequent API calls.
        *
        * Relies on 3 global variables to be set:
        * 1. FOOTBALL_API_CLIENT_ID
        * 2. FOOTBALL_API_CLIENT_SECRET
        * 3. FOOTBALL_API_AUTH_URL
        *
        * @return string The access_token.
        */

        func getAccessToken() string {
            // 1. Prepare Basic Auth header (Base64 encoded credentials)
            credentials := FOOTBALL_API_CLIENT_ID + ":" + FOOTBALL_API_CLIENT_SECRET
            accessToken := base64.StdEncoding.EncodeToString([]byte(credentials))

            // 2. Configure the POST request
            body := []byte("grant_type=client_credentials")
            req, _ := http.NewRequest("POST", FOOTBALL_API_AUTH_URL, bytes.NewBuffer(body))
            req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
            req.Header.Set("Authorization", "Basic "+accessToken)

            // 3. Execute, decode JSON, and return the access_token
            resp, _ := http.DefaultClient.Do(req)
            defer resp.Body.Close()

            var result struct {
                AccessToken string `json:"access_token"`
            }

            json.NewDecoder(resp.Body).Decode(&result)
            return result.AccessToken
        }
        ```
    </TabItem>
</Tabs>

### Executing a Query

Once you have a valid access token, you can execute queries. All queries must be constructed using the objects and types defined in the Football API Schema.

The example below demonstrates how to send a request. It assumes you have:
* A valid access token.
* A correctly formatted GraphQL query.
* The base URL for the environment you wish to target (see [Environments](#environments) chapter).

<Tabs>
    <TabItem value="queryCURL" label="cURL" default>
        ```bash showLineNumbers title="How to query the Football API using cURL"
        curl -X POST <ENVIRONMENT_BASE_URL> \
          -H "Content-Type: application/json" \
          -H "Authorization: Bearer <ACCESS_TOKEN>" \
          -H "X-Request-Id: $(uuidgen)" \
          --compressed \
          -d '{"query": "{ ... }"}'
        ```
    </TabItem>
    <TabItem value="queryPHP" label="PHP">
        ```php showLineNumbers title="How to query the Football API in PHP"
        /**
        * Executes a Football API call using cURL.
          *
          * This function sends a POST request with a JSON-encoded query and
          * an Authorization Bearer token to the API endpoint defined
          * in the $GLOBALS['ENVIRONMENT_BASE_URL'] variable.
          *
          * @param string $query       The GraphQL query string to be executed.
          * @param string $accessToken The Access Token (OAuth 2.0 Bearer token).
          *
          * @return array An associative array containing:
          * - 'responseData' (object|null): The API response (JSON-decoded).
          * - 'errorMessage' (string): The cURL error message, if any occurred.
          * - 'errorStatus' (int): The cURL error number (0 indicates success).
        */
        public function callFootballAPI($query, $accessToken): array {

            // Base settings
            $curlOptions = array(
                // The target URL. RELIES ON A GLOBAL VARIABLE!
                CURLOPT_URL            => $GLOBALS['ENVIRONMENT_BASE_URL'],
                // Return the response as a string
                CURLOPT_RETURNTRANSFER   => true,
                // Automatically handle response decoding (e.g., gzip)
                CURLOPT_ENCODING         => "gzip",
                CURLOPT_MAXREDIRS        => 10,
                CURLOPT_TIMEOUT          => 0, // No timeout
                CURLOPT_FOLLOWLOCATION   => true,
                CURLOPT_HTTP_VERSION     => CURL_HTTP_VERSION_1_1,
                // Set the request method to POST
                CURLOPT_CUSTOMREQUEST    => "POST",
                // The request body: JSON object with the "query" key
                CURLOPT_POSTFIELDS       => json_encode(array("query" => $query)),
                // Set the HTTP Headers
                CURLOPT_HTTPHEADER       => array(
                    "Content-Type: application/json",
                    // A unique request ID for logging and tracing
                    "X-Request-Id: " . uniqid("", true),
                    // Authorization using the Bearer token
                    "Authorization: Bearer " . $accessToken,
                    "Accept-Encoding: gzip"
                ),
            );

            // Do the request
            $curl = curl_init();
            curl_setopt_array($curl, $curlOptions);

            // Build the response
            $response     = json_decode(curl_exec($curl));
            $errorMessage = curl_error($curl);
            $errorStatus  = curl_errno($curl);

            // Close cURL and return data
            curl_close($curl);

            // Prepare response
            return array(
                "responseData" => $response,
                "errorMessage" => $errorMessage,
                "errorStatus"  => $errorStatus,
            );
        }
        ```
    </TabItem>
    <TabItem value="queryPython" label="Python">
        ```python showLineNumbers title="How to query the Football API in Python"
        import uuid
        import requests

        def call_football_api(environment_base_url: str, query: str, access_token: str) -> dict:
            """
            Executes a Football API call.

            Sends a POST request with a JSON-encoded GraphQL query and
            an Authorization Bearer token to the given API endpoint.

            :param environment_base_url: The target API endpoint URL.
            :param query:                The GraphQL query string to be executed.
            :param access_token:         The Access Token (OAuth 2.0 Bearer token).
            :return: The JSON-decoded API response.
            """
            response = requests.post(
                environment_base_url,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {access_token}",
                    "X-Request-Id": str(uuid.uuid4()),
                    "Accept-Encoding": "gzip",
                },
                json={"query": query},
            )
            response.raise_for_status()
            return response.json()
        ```
    </TabItem>
    <TabItem value="queryGo" label="Go">
        ```go showLineNumbers title="How to query the Football API in Go"
        package main

        import (
            "bytes"
            "crypto/rand"
            "encoding/json"
            "fmt"
            "io"
            "net/http"
        )

        // APIResponse holds the structured response from the CallFootballAPI function.
        type APIResponse struct {
            // ResponseData holds the API response (JSON-decoded).
            ResponseData interface{}
            // ErrorMessage holds the error message, if any occurred.
            ErrorMessage string
        }

        // CallFootballAPI executes a Football API call using Go's net/http client.
        //
        // This function sends a POST request with a JSON-encoded query and
        // an Authorization Bearer token to the API endpoint provided in
        // the environmentBaseURL parameter.
        //
        // @param {string} environmentBaseURL The target API endpoint URL.
        // @param {string} query              The GraphQL query string to be executed.
        // @param {string} accessToken        The Access Token (OAuth 2.0 Bearer token).
        //
        // @returns {APIResponse} A struct containing:
        // - 'ResponseData' (interface{}): The API response (JSON-decoded).
        // - 'ErrorMessage' (string): The error message, if any occurred.
        func CallFootballAPI(environmentBaseURL string, query string, accessToken string) APIResponse {

            // 1. Prepare the request body (JSON payload)
            requestBodyMap := map[string]string{"query": query}
            requestBodyBytes, err := json.Marshal(requestBodyMap)
            if err != nil {
                return APIResponse{ErrorMessage: "Failed to create request body: " + err.Error()}
            }

            // 2. Create a new HTTP POST request
            req, err := http.NewRequest("POST", environmentBaseURL, bytes.NewBuffer(requestBodyBytes))
            if err != nil {
                return APIResponse{ErrorMessage: "Failed to create HTTP request: " + err.Error()}
            }

            // 3. Set the HTTP Headers
            req.Header.Set("Content-Type", "application/json")
            req.Header.Set("Authorization", "Bearer "+accessToken)

            // A unique request ID for logging and tracing
            b := make([]byte, 16)
            _, err = rand.Read(b)
            if err != nil {
                return APIResponse{ErrorMessage: "Failed to generate request ID: " + err.Error()}
            }
            requestID := fmt.Sprintf("%x-%x-%x-%x-%x", b[0:4], b[4:6], b[6:8], b[8:10], b[10:])
            req.Header.Set("X-Request-Id", requestID)

            // Go's http.Client handles gzip decompression automatically
            req.Header.Set("Accept-Encoding", "gzip")

            // 4. Execute the request
            client := &http.Client{}
            resp, err := client.Do(req)
            if err != nil {
                return APIResponse{ErrorMessage: "Failed to execute request: " + err.Error()}
            }
            defer resp.Body.Close()

            // 5. Read the response body
            responseBody, err := io.ReadAll(resp.Body)
            if err != nil {
                return APIResponse{ErrorMessage: "Failed to read response body: " + err.Error()}
            }

            // 6. Unmarshal the response
            var responseData interface{}
            err = json.Unmarshal(responseBody, &responseData)
            if err != nil {
                return APIResponse{ErrorMessage: "Failed to unmarshal JSON response: " + err.Error()}
            }

            // 7. Return the response
            return APIResponse{
                ResponseData: responseData,
                ErrorMessage: "",
            }
        }
        ```
    </TabItem>
</Tabs>

### Process the Response

A successful API response is a JSON object with a `data` key containing the requested data. If any errors occur, the response includes an `errors` array alongside (or instead of) `data`.

**Successful response:**
```json
{
  "data": {
    "competition": {
      "id": "1234567890",
      "name": "Premier League"
    }
  }
}
```

**Response with errors:**
```json
{
  "data": null,
  "errors": [
    {
      "message": "Field 'unknownField' doesn't exist on type 'Competition'",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["competition", "unknownField"]
    }
  ]
}
```

Always check for the presence of the `errors` key in the response, even when the HTTP status code is `200`. GraphQL errors are returned with a `200 OK` status.

### Pagination

To prevent individual queries from returning excessive volumes of data, the Football API enforces per-query result limits. When the number of matching records exceeds the limit, results are split into pages that must be retrieved sequentially.

The API uses **cursor-based pagination**: instead of numeric page offsets, each response carries an opaque cursor that points to the last returned record. Pass this cursor in the next request to continue from where the previous one left off.

Each paginated response includes a `pageInfo` object:

| Field   | Type     | Description                                                                                 |
|---------|----------|---------------------------------------------------------------------------------------------|
| `cursor`    | `String` | Cursor pointing to the last returned record; pass as `after` in the next request. `null` when there are no more pages. |
| `timestamp` | `String` | ISO 8601 UTC timestamp of when this page of results was generated. |

Pass `null` as `after` for the first page. For each subsequent page, pass the `cursor` value from the previous response. Repeat until the response returns no `cursor` (end of results).

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


### Query Complexity

The Football API evaluates the complexity of every incoming query before processing it. If a query exceeds the complexity threshold, it is **rejected** — no data is returned and an error is reported.

Complexity is determined by the combination of:
- **The number of entity types requested** — querying a top-level object (e.g., `Competition`) together with its subordinate objects (e.g., `Seasons`, `Season Stages`, `Matches`) multiplies the potential result set significantly.
- **The depth of the object graph** — the deeper the nesting, the higher the complexity score.
- **The page size** — larger `first` values contribute to the score.

If your query is rejected due to complexity, reduce the scope by one or more of the following:
- Request fewer subordinate object types in a single query.
- Reduce the page size (`first` argument).
- Break the query into multiple smaller queries, each targeting one level of the hierarchy.

## Environments

The Football API provides three independent environments:

* Development
* Stage
* Production

All environments require authentication. The authentication server is the same for all environments. See the [Authentication Server](#authentication-server) section below for its URL.

### Development Environment
The base URL for the development environment is:
`http://api.dev.football.tt2.lsapi.intra/graphql/`

### Stage Environment
The base URL for the stage environment is:
`http://api.stage.football.tt2.lsapi.intra/graphql/`

### Production Environment
The base URL for the production environment is:
`http://api.prod.football.tt2.lsapi.intra/graphql/`

### Authentication Server
The URL for the authentication server is:
`https://auth.lsapi.eu/oauth2/token`

## Third-Party Integration

:::info
Every entity in the Livesport Football Database — and therefore in the Football API — is identified by a unique **Snowflake ID**. All queries require Snowflake IDs. Your integration path depends on whether you already have IDs from a compatible external system.
:::

### Path 1: You Have Compatible IDs (StatsPerform)

If your system already uses **StatsPerform IDs**, you can resolve the corresponding Snowflake IDs through the [Mapping Service](mapping-service/mapping-service-intro).

The Mapping Service accepts a StatsPerform ID and returns the matching Snowflake ID, which you can then use directly in Football API queries.

```
StatsPerform ID  →  Mapping Service  →  Snowflake ID  →  Football API
```

See the [Mapping Service](mapping-service/mapping-service-intro) documentation for details.

### Path 2: You Have No Compatible IDs

If you are starting from scratch or use IDs from a system other than StatsPerform, you can obtain Snowflake IDs through [Search Queries](api-guide/search-queries).

Search Queries allow you to find entities — competitions, seasons, teams, players, matches — by name or other attributes. Under certain conditions, the search results include the Snowflake ID directly, which you can then use in subsequent Football API queries.

```
Name / Attributes  →  Search Queries  →  Snowflake ID  →  Football API
```

See the [Search Queries](api-guide/search-queries) documentation for details.
