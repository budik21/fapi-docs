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
