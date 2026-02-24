---
id: NationalTeam
title: NationalTeamObject
sidebar_label: "National Team"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

## Fields

| Field | Type | Description |
|---|---|---|
| `id` | `ID!` |  |
| `ageGroup` | [AgeGroup!](../enums/AgeGroup) | Age group of the team (e.g. adults, U-21, U-19) |
| `gender` | [Gender!](../enums/Gender) | Gender of the team |
| `level` | [TeamLevel!](../enums/TeamLevel) | Level of the team (e.g. A, B, C) |
| `nationalAssociation` | [NationalAssociation!](../objects/NationalAssociation) | National association the team belongs to |
| `localizedName` | [LocalizedText!](../objects/LocalizedText) | Localized name of the team |
| `pastMatches` | [[Match!]!](../objects/Match) | Last matches for the team |
| `pastMatchesStats` | [AggregatedTeamStatsResponse!](../objects/AggregatedTeamStatsResponse) | Aggregated team stats for recent N past matches |
| `upcomingMatches` | [[Match!]!](../objects/Match) | Upcoming matches for the team |
| `pastHeadToHeadMatches` | [[Match!]!](../objects/Match) | Past head-to-head matches between this team and an opponent team |
