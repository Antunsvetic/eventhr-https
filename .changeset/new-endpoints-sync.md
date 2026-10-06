---
"eventhr-http-client": major
---
Add new API resources and align params/schemas with OpenAPI spec

- Add Ads resource (getAll, create, update, remove)
- Add Feed resource (get)
- Add Follows resource (getAll, follow, unfollow)
- Add Organizers resource (getAll, getById)
- Add Search resource (search by query)
- Add new events filters: organizerId, subOrganizerId, features, cityId, countyId, countryId, dateFrom, dateTo, categoryId, sortByAttendeeCount
- Add userRole filter to users getAll
- Add role field to User
- Add pageable/sort fields to Page and PageableObject/SortObject types
- Support string[] for PageRequest.sort per spec
- Serialize array query params as repeated keys (indexes: null) for Spring binding

BREAKING CHANGES:

- Rename kebab-case query params to camelCase per spec: event-id -> eventId, country-id -> countryId, county-id -> countyId
- Replace parentEventId with subEvents (string[] of sub-event ids) on CreateEventDto/UpdateEventDto, per spec
- User.role is a new required field on the User response interface
- Remove isSaved from SubEvent (not present in SubEventResponse)
- Search result items use the spec's BaseValueObject shape: id is { value: string }, not a plain string
