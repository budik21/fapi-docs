---
id:         player
title:      Player
---
#### Dependedncies
Object `Player` is a top-level object.

#### Business purpose
:::info[no-header]
For the provided `PlayerId`, returns all data related to the player as a person, independent of the club they are associated with.
:::

Although the `Player` is a top-level object, it can also be used in relation to other objects. For example it is part of the [LineupPlayer](match/lineup-player) object, which contains a list of all players participating in a specific match and, in addition to the player’s basic personal data, includes information such as whether the player is in the starting lineup, their position, jersey number, and more.

Generally speaking, the `Player` object is available as part of all other relevant objects that work with player-related data.
