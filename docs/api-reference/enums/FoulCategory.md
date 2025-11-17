---
id: FoulCategory
title: FoulCategoryEnum
sidebar_label: "Foul Category"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Classifies a foul based on whether it was committed during a defensive or offensive action by the player.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value. |
| `DEFENSIVE` | The faul was committed during the defending action of committing player |
| `OFFENSIVE` | The faul was committed during the attacking action of committing player |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value."},{"value":"DEFENSIVE","description":"The faul was committed during the defending action of committing player"},{"value":"OFFENSIVE","description":"The faul was committed during the attacking action of committing player"}]} fileName="FoulCategory" />
