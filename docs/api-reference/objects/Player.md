---
id: Player
title: PlayerObject
sidebar_label: "Player"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
The Player object provides core identity and descriptive information about an individual football player, including localized naming data, personal details, and their primary playing position.
:::

---

## Fields

| Field | Type | Description |
|---|---|---|
| `id` | `ID!` |  |
| `localizedName` | [LocalizedText!](../objects/LocalizedText) | Localized name of the player |
| `localizedFullName` | [LocalizedText](../objects/LocalizedText) | Localized full name of the player |
| `localizedFirstName` | [LocalizedText](../objects/LocalizedText) | Localized first name of the player |
| `localizedLastName` | [LocalizedText](../objects/LocalizedText) | Localized last name of the player |
| `localizedShortName` | [LocalizedText](../objects/LocalizedText) | Localized short name of the player |
| `localizedNickname` | [LocalizedText](../objects/LocalizedText) | Localized nickname of the player |
| `birthDate` | [Date](../scalars/Date) | Birth date of the player |
| `position` | [PlayerPosition](../enums/PlayerPosition) | The player's usual playing position. Note that this can vary from the position the player takes up in a particular match (see Lineup object). Possible values: GOALKEEPER, DEFENDER, MIDFIELDER, ATTACKER. |
| `nationality` | [CountryCode](../enums/CountryCode) | Nationality of the player |
