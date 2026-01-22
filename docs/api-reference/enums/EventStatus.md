---
id: EventStatus
title: EventStatusEnum
sidebar_label: "Event Status"
---

import JsonExportButton from '@site/src/components/JsonExportButton';

:::info[no-header]
Represents the status of an event, indicating its validation state.
:::

---

## Enum Values

| Value | Description |
|---|---|
| `UNSPECIFIED` | Represents a NULL or UNKNOWN value |
| `TEMPORARILY_VALID` | An event has occurred but requires further confirmation or review before it can be confirmed. If a goal is in this state, no score change is made until the event is fully confirmed. |
| `PROVISIONALLY_CONFIRMED` | It is likely the event will be definitively confirmed based on a qualified estimation (such as the behavior of on-pitch actors), but it may still be subject to further review or challenges. |
| `CONFIRMED` | The event has been definitively confirmed and cannot be undone |
| `CANCELED` | The event has been revoked after review and is no longer valid. If the score was altered based on previous (provisionaly confirmed) state, the change must be reverted. |

<JsonExportButton data={[{"value":"UNSPECIFIED","description":"Represents a NULL or UNKNOWN value"},{"value":"TEMPORARILY_VALID","description":"An event has occurred but requires further confirmation or review before it can be confirmed. If a goal is in this state, no score change is made until the event is fully confirmed."},{"value":"PROVISIONALLY_CONFIRMED","description":"It is likely the event will be definitively confirmed based on a qualified estimation (such as the behavior of on-pitch actors), but it may still be subject to further review or challenges."},{"value":"CONFIRMED","description":"The event has been definitively confirmed and cannot be undone"},{"value":"CANCELED","description":"The event has been revoked after review and is no longer valid. If the score was altered based on previous (provisionaly confirmed) state, the change must be reverted."}]} fileName="EventStatus" />
