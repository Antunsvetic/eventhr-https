---
"eventhr-http-client": patch
---

Add removeEventFromCollections endpoint and hook
- Add `removeEvent(eventId)` method to CollectionsClient (DELETE /api/v1/collections/events/{event-id})
- Add `useRemoveEventFromCollectionsMutation` hook