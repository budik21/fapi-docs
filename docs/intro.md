---
id:     intro
title:  Football API Intro
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Football API Intro

## What is Football API?
Football API a GraphQL API allowing to access football data stored in Livesport Football Database.

If you are a football enthusiastic and understand how the football domain works, you will understand the Football API without anything to study before. If not, please, meet the [API Schema](api-schema/api-schema-intro.md) before you start to query the Football API, 

## Getting Started
1. Understand the domain
2. Get Credentials
3. Transform credentials to the access token
4. Run the Query
5. Process the data

### Understand the domain
The documentation is divided into two base parts.
* **Business oriented chapters**
* **Technical oriented chapters**

### Get Credentials
The Football API does not allow anonymous access.
This means you need credentials, which consist of:
* Client ID
* Client Secret

These credentials allow you to generate a temporarily valid access key, which you must include with each request for authentication.
Credentials are issued by the Football API team. See [Contacts](./contacts/contacts) chapter and contact the Football API team to get the credentials.

### Transform credentials to the access token

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
    <TabItem value="accessKeyPHP" label="PHP" default>
        ```php showLineNumbers title="How to generate the access key in PHP"
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
            $credetials = base64_encode($GLOBALS['FOOTBALL_API_CLIENT_ID'] . ':' . $GLOBALS['FOOTBALL_API_CLIENT_SECRET']);
        
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
                'Authorization: Basic ' . $credetials,
            ));
        
            // 3. Execute, decode JSON, and return the access_token
            $authResponse = curl_exec($authRequest);
            return json_decode($authResponse)->access_token;        
        }
        ```
    </TabItem>
    <TabItem value="accessKeyGO" label="GO" default>
        ```go showLineNumbers title="How to generate the access key in GO"
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
    <TabItem value="queryPHP" label="PHP" default>
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
    <TabItem value="queyrGO" label="GO" default>
        ```go showLineNumbers title="How to query the Football API in GO"
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
            // ErrorMessage holds the cURL error message, if any occurred.
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
            // Equivalent to: json_encode(array("query" => $query))
            requestBodyMap := map[string]string{"query": query}
            requestBodyBytes, err := json.Marshal(requestBodyMap)
            if err != nil {
                // Return error if JSON marshaling fails
                return APIResponse{ErrorMessage: "Failed to create request body: " + err.Error()}
            }
        
            // 2. Create a new HTTP POST request
            // Equivalent to curl_init() and setting POST, URL, and POSTFIELDS
            req, err := http.NewRequest("POST", environmentBaseURL, bytes.NewBuffer(requestBodyBytes))
            if err != nil {
                // Return error if request creation fails
                return APIResponse{ErrorMessage: "Failed to create HTTP request: " + err.Error()}
            }
        
            // 3. Set the HTTP Headers
            // Equivalent to CURLOPT_HTTPHEADER
            req.Header.Set("Content-Type", "application/json")
        
            // Authorization using the Bearer token
            req.Header.Set("Authorization", "Bearer "+accessToken)
        
            // A unique request ID for logging and tracing
            // Go's equivalent for uniqid("", true)
            b := make([]byte, 16)
            _, err = rand.Read(b)
            if err != nil {
                return APIResponse{ErrorMessage: "Failed to generate request ID: " + err.Error()}
            }
            requestID := fmt.Sprintf("%x-%x-%x-%x-%x", b[0:4], b[4:6], b[6:8], b[8:10], b[10:])
            req.Header.Set("X-Request-Id", requestID)
        
            // Go's http.Client handles gzip decompression automatically
            // when this header is set. (Equivalent to CURLOPT_ENCODING)
            req.Header.Set("Accept-Encoding", "gzip")
        
            // 4. Execute the request
            // The default http.Client has no timeout (like CURLOPT_TIMEOUT => 0)
            // and follows redirects (like CURLOPT_FOLLOWLOCATION => true).
            client := &http.Client{}
            resp, err := client.Do(req)
            if err != nil {
                // This captures transport errors (equivalent to curl_error)
                return APIResponse{ErrorMessage: "Failed to execute request: " + err.Error()}
            }
            // We must close the body when the function exits
            defer resp.Body.Close()
        
            // 5. Read the response body
            // Equivalent to curl_exec() (when CURLOPT_RETURNTRANSFER is true)
            responseBody, err := io.ReadAll(resp.Body)
            if err != nil {
                return APIResponse{ErrorMessage: "Failed to read response body: " + err.Error()}
            }
        
            // 6. Unmarshal the response
            // Equivalent to json_decode(...)
            var responseData interface{}
            err = json.Unmarshal(responseBody, &responseData)
            if err != nil {
                return APIResponse{ErrorMessage: "Failed to unmarshal JSON response: " + err.Error()}
            }
        
            // 7. Prepare response
            // Success: return the data and an empty error message
            return APIResponse{
                ResponseData: responseData,
                ErrorMessage: "",
            }
        }
        ```
    </TabItem>
</Tabs>

## Process the response
If you run 

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


