---
id:         team
title:      Team
---

## Dependencies
Object `Team` is the top-level object.

## Business purpose
:::info[no-header]
Object `Team` returns all team-related data for a specific team using the provided `TeamId`.
:::

Although `Team` is a top-level object, it can also be used in relation to other objects. For instance, it is part of the [`Match`](match/match.md) object, which contains `homeTeam` and `awayTeam` objects expressing which team acts as the home team and which as the away team in a specific match.

Furthermore, `homeTeamLineup` and `awayTeamLineup` objects related to the `Match` allow access to data about players attending the match, including their positions in the lineup, whether they are members of the starting lineup or acting as substitutes, etc.

## Object details
Each existing team is defined either as a **club team** (e.g., Real Madrid, Manchester United) or as a **national team** (e.g., Spain, England).

Each team is described by the name of the team and 
 * `gender` - expresses, if the team consists from male or female players, see the [Gender Enum](../../api-reference/enums/Gender)
 * `ageGroup` - express, which is the maximal allowed limit of age the players can play for, see the [Age Group Enum](../../api-reference/enums/AgeGroup)
 * `level` - express, the order of the team in the club/national team hierarchy,  see the [Team Level Enum](../../api-reference/enums/TeamLevel) 


