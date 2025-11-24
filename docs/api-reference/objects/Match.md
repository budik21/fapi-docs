---
id: Match
title: MatchObject
sidebar_label: "Match"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
The Match object represents a single football match and provides structured access to team information, lineups, scores, player data, match events, statistical outputs, and computed probabilistic models. It serves as the primary entry point for retrieving all match-related information.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `id` | `ID!` |  |
| `homeTeam` | [Team!](../interfaces/Team) | The homeTeam object provides metadata for the team designated as the home side, including its name, age category, gender, and hierarchical level (main team, reserve team) within the club structure. |
| `awayTeam` | [Team!](../interfaces/Team) | The awayTeam object provides metadata for the team designated as the away side, including its name, age category, gender, and hierarchical level (main team, reserve team) within the club structure. |
| `playerStats` | [[PlayerMatchStatsV2!]!](../objects/PlayerMatchStatsV2) | Individual statistics of players in a match. |
| `homeTeamLineup` | [Lineup](../objects/Lineup) | Lineup of the home team |
| `awayTeamLineup` | [Lineup](../objects/Lineup) | Lineup of the away team |
| `momentum` | [MatchMomentum](../objects/MatchMomentum) | The momentum object represents the estimated probability of a team scoring during a specific minute of the match. These values are provided for matches in the IN_MATCH and AFTER_MATCH phases. |
| `winProbability` | [WinProbability](../objects/WinProbability) | The winProbability object contains probability metrics estimating each team's chance of winning, calculated using the current match phase, time played, and the live score. |
| `playerRatings` | [[PlayerRating!]!](../objects/PlayerRating) | The playerRatings object provides performance evaluations (ratings) for players who participated in the match. If no playerIds are specified, the response returns ratings for all players who took part and met the criteria for rating calculation. |
| `teamStats` | [[TeamMatchStats!]!](../objects/TeamMatchStats) | The teamStats object contains overall match statistics for each team and period-based splits, allowing consumers to analyse team performance across the full match and within specific periods. |
| `matchEvents` | [MatchEventsResult!](../objects/MatchEventsResult) | The matchEvents object contains the list of all events which happened during the match as the result of player's or referee's activity, such as goal scored, foul committed or card given (see MatchEventTypeEnum for list of all supported events). |
| `timeFrameAt` | [MatchTimeFrame!](../objects/MatchTimeFrame) | Get match time frame at specific date time. If 'at' is not provided, current time is used. |
