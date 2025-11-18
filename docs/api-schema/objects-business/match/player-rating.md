---
id:         player-rating
title:      Player Rating
---
## Dependencies
Object `playerRating` is a child of the match.

## Business purpose
:::info[no-header]
The `playerRating` object provides a set of data points used to evaluate a player's performance in a specific match using a standardised scale **from 1** (worst performance) **to 10** (best performance).
:::

## Object detail
See [PlayerRating object](./../../../api-reference/objects/PlayerRating) chapter.

## How Player rating works

### Prerequisites
Player ratings are calculated based on individual [player's match stats](./../../../api-schema/objects-business/stats/stats-player-match). This data is available for selected competitions only (approximately 300). Consequently, if match statistics are unavailable, the player rating cannot be generated. In such cases, the `playerRating` object will return `NULL`.

**The minimum time** a player must spend on the pitch to receive a rating **is 10 minutes**. This calculation excludes additional time (stoppage time). For example, if a substitute enters the pitch in the 88th minute, they will not receive a rating even if there are 12 minutes of additional time. In this scenario, only 2 minutes of valid playing time are counted.

### Rating calculation
The player rating calculation runs every minute (for players who met the minimal time condition). However, specific events — such as a goal or a red card — trigger an immediate recalculation. Consequently, ratings for all players are not updated simultaneously. 

Calculations do not stop at the end of the match; they continue as long as player statistics are being updated. The majority of matches undergo a post-match review where statistical corrections are made. This process can result in changes to the final rating and may even affect the Player of the Match award.

:::danger[Quality of the rating]
Although post-match data changes that affect a player’s final rating may be inconvenient, they also allow the most accurate rating calculation possible. Most ratings can be considered final 24 hours after the match ends, and after 72 hours, only a very small percentage of ratings undergo any further changes.
:::

The calculation takes the player's lineup position into account and evaluates their performance based on how well they fulfill the common tasks associated with that specific role. Additionally, players receive bonuses or penalties based on special events. Bonuses are awarded for positive actions, such as scoring a goal or preventing a clear scoring opportunity. Conversely, penalties are applied for negative actions, such as an error leading to a goal or being sent off.

### Rating structure
The `playerRating` object comprises several data points, the most important being the **final rating**. This value ranges from 1 to 10, where 1 represents the worst possible player performance and 10 represents the best.

