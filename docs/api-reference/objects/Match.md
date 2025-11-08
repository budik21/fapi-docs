---
id: Match
title: MatchObject
sidebar_label: "Match"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

## Fields

| Field | Type | Description |
|---|---|---|
| `id` | `ID!` |  |
| `homeTeam` | [Team!](../interfaces/Team) | Home team |
| `awayTeam` | [Team!](../interfaces/Team) | Away team |
| `playerStats` | [[PlayerMatchStatsV2!]!](../objects/PlayerMatchStatsV2) | Individual statistics of players in a match. |
| `homeTeamLineup` | [Lineup](../objects/Lineup) | Lineup of the home team |
| `awayTeamLineup` | [Lineup](../objects/Lineup) | Lineup of the away team |
| `momentum` | [MatchMomentum](../objects/MatchMomentum) | Momentum of the match |
| `winProbability` | [WinProbability](../objects/WinProbability) | Win probability of the match |
| `playerRatings` | [[PlayerRating!]!](../objects/PlayerRating) | Player ratings (Rating 2.0) for players in this match. If playerIDs omitted, returns all. |
| `teamStats` | [[TeamMatchStats!]!](../objects/TeamMatchStats) | Statistics of the home team |
| `matchEvents` | [MatchEventsResult!](../objects/MatchEventsResult) | Events of the match |
