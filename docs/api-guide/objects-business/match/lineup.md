---
id:         lineup
title:      Lineup
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Dependencies
Object `homeTeamLineup` and `awayTeamLineup` is a child of `Match` object.

## Object description
See [Lineup object](./../../../api-reference/objects/Lineup) chapter.

## Business purpose
:::info[no-header]
The `homeTeamLineup` and `awayTeamLineup` objects provide complete information about all players from the home and away teams participating in the match. These objects include all necessary details, such as starting lineup compositions, player positions, team formations, jersey numbers, and captain indicators.
:::

Lineup data becomes available shortly before kick-off and is supported for specific competitions only (500+ as of December 2025). While the exact publication time depends on many factors, lineups are typically provided **45 to 60 minutes** before the match starts.

It is important to note that **home and away lineups are published independently**. Do not assume they will be available at the exact same moment; one team's lineup may appear minutes before the other.

Prior to publication, the lineup objects are `null`.

:::tip[Player common position and lineup position difference]
The exact lineup position is provided only for players in the starting lineup via the `lineupPosition` attribute. For substitutes, this attribute is `null` because their potential role in the match is uncertain.

For display purposes, you can use the `player.position` attribute for substitutes, which indicates the player's typical position.

It is important to note that these attributes contain different types of values:
* `lineupPosition` specifies the **exact tactical position** of the player within the specific lineup formation (see [LineupPositionEnum](./../../../api-reference/enums/LineupPosition)).
* `player.position` indicates the **general role** of the player and is limited to one of the following broad categories: `GOALKEEPER`, `DEFENDER`, `MIDFIELDER`, or `ATTACKER`. This role may differ from the `lineupPosition` depending on the coach's tactical decisions.
:::

## How to get the lineup data
<Tabs>
    <TabItem value="query" label="Query" default>
    ```graphql showLineNumbers title="Query: Match lineups" 
    query Match($matchId: ID!) {
      match(id: $matchId) {
        id
        homeTeamLineup {
          team {
            localizedName {
              text
            }
          }
          formation
          lineupPlayers {
            player {
              id
              localizedFullName {
                text
              }
              localizedShortName {
                text
              }
              position
            }
            isCaptain
            inStartingLineup
            shirtNumber
            lineupPosition
          }
        }
        awayTeamLineup {
          team {
            localizedName {
              text
            }
          }
          formation
          lineupPlayers {
            player {
              id
              localizedFullName {
                text
              }
              localizedShortName {
                text
              }
              position
            }
            isCaptain
            inStartingLineup
            shirtNumber
            lineupPosition
          }
        }
      }
    }
    ```
    </TabItem>
    <TabItem value="variables" label="Variables" default>
    ```json showLineNumbers title="Variables: ID of desired match"
    {
        //Premier League, Chelsea - Arsenal 1:1, 30.11.2025
        "matchId": "1935259480686333952"
    }
    ```
    </TabItem>
    <TabItem value="response" label="Response" default>
    ```json showLineNumbers title="Response: Home and Away Match Lineup"
    {
      "data": {
        "match": {
          "id": "1935259480686333952",
          "homeTeamLineup": {
            "team": {
              "localizedName": {
                "text": "Chelsea"
              }
            },
            "formation": "FORMATION_4231",
            "lineupPlayers": [
              {
                "player": {
                  "id": "1897740312496046081",
                  "localizedFullName": {
                    "text": "Sanchez Robert"
                  },
                  "localizedShortName": {
                    "text": "Sanchez R."
                  },
                  "position": "GOALKEEPER"
                },
                "isCaptain": false,
                "inStartingLineup": true,
                "shirtNumber": 1,
                "lineupPosition": "GOALKEEPER"
              },
              {
                "player": {
                  "id": "1897735675625865217",
                  "localizedFullName": {
                    "text": "Cucurella Saseta Marc"
                  },
                  "localizedShortName": {
                    "text": "Cucurella M."
                  },
                  "position": "DEFENDER"
                },
                "isCaptain": false,
                "inStartingLineup": true,
                "shirtNumber": 3,
                "lineupPosition": "FULLBACK_LEFT"
              },
              "...",
              {
                "player": {
                  "id": "1897756683153965056",
                  "localizedFullName": {
                    "text": "Acheampong Josh Kofi"
                  },
                  "localizedShortName": {
                    "text": "Acheampong J."
                  },
                  "position": "DEFENDER"
                },
                "isCaptain": false,
                "inStartingLineup": false,
                "shirtNumber": 34,
                "lineupPosition": null
              }
            ]
          },
          "awayTeamLineup": {
            "team": {
              "localizedName": {
                "text": "Arsenal"
              }
            },
            "formation": "FORMATION_433",
            "lineupPlayers": [
              {
                "player": {
                  "id": "1897688549357256705",
                  "localizedFullName": {
                    "text": "Raya David"
                  },
                  "localizedShortName": {
                    "text": "Raya D."
                  },
                  "position": "GOALKEEPER"
                },
                "isCaptain": false,
                "inStartingLineup": true,
                "shirtNumber": 1,
                "lineupPosition": "GOALKEEPER"
              },
              {
                "player": {
                  "id": "1897742435971497985",
                  "localizedFullName": {
                    "text": "Calafiori Riccardo"
                  },
                  "localizedShortName": {
                    "text": "Calafiori R."
                  },
                  "position": "DEFENDER"
                },
                "isCaptain": false,
                "inStartingLineup": true,
                "shirtNumber": 33,
                "lineupPosition": "FULLBACK_LEFT"
              },
              "..."
            ]
          }
        }
      }
    }
    ```
    </TabItem>
</Tabs>
