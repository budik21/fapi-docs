---
id: MatchPhase
title: MatchPhaseEnum
sidebar_label: "Match Phase"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Represents the major, high-level phases of an entire sports fixture relative to the actual playing time. This is used to clearly define the temporal context of match-related data. For example, the win probability calculated BEFORE_MATCH is considered a distinct data point from the probability calculated IN_MATCH.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `BEFORE_MATCH` | The match has not yet started (pre-game state). |
| `IN_MATCH` | The match is currently being played, including all official periods and breaks (live state). |
| `AFTER_MATCH` | The match has concluded, and a final result has been determined (post-game state). |

<JsonExportButton data={[{"value":"BEFORE_MATCH","description":"The match has not yet started (pre-game state)."},{"value":"IN_MATCH","description":"The match is currently being played, including all official periods and breaks (live state)."},{"value":"AFTER_MATCH","description":"The match has concluded, and a final result has been determined (post-game state)."}]} fileName="MatchPhase" />
