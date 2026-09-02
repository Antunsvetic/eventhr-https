---
"eventhr-http-client": major
---

Refactor event entity to use parent/child linking instead of inline sub-events

- Remove `SubEventDto` interface and `subEvents` field from `CreateEventDto`/`UpdateEventDto`
- Add `parentEventId` to `CreateEventDto`/`UpdateEventDto` for linking sub-events to a parent
- Add `parentEvent` (BaseValueObject) to `Event` response interface
- Add `features` and `attendeeCount` fields to `SubEvent` response interface

BREAKING CHANGE: Sub-events are no longer created inline within the parent event payload. Create child events separately and reference the parent via `parentEventId`. The `SubEventDto` export has been removed.
