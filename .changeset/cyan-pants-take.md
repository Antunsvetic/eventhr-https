---
"eventhr-http-client": patch
---

Add removeEventFromCollections endpoint with optimistic isSaved cache toggle

- Add `removeEvent(eventId)` method to CollectionsClient (DELETE /api/v1/collections/events/{event-id})
- Add `useRemoveEventFromCollectionsMutation` hook with optimistic `isSaved: false` update on events cache and rollback on error
- Extract shared optimistic cache helpers to `events.cache.ts` (`createOptimisticIsSavedUpdater`, `createIsSavedRollback`)
- Invalidate collections cache on settle for both save and remove mutations
