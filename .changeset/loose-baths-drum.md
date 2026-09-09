---
"eventhr-http-client": minor
---

Add useSaveEventMutation with optimistic events cache toggle for isSaved field
- Add `isSaved` field to `Event` and `SubEvent` interfaces
- Add `useSaveEventMutation` hook that toggles `isSaved` optimistically
  across all cached event list and detail queries, with rollback on error
- Invalidate collections cache on settle (no events refetch)
