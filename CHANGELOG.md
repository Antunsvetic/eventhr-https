# eventhr-http-client

## 2.1.0

### Minor Changes

- 95d7dce: Add useSaveEventMutation with optimistic events cache toggle for isSaved field
  - Add `isSaved` field to `Event` and `SubEvent` interfaces
  - Add `useSaveEventMutation` hook that toggles `isSaved` optimistically
    across all cached event list and detail queries, with rollback on error
  - Invalidate collections cache on settle (no events refetch)

## 2.0.0

### Major Changes

- 2094090: Refactor event entity to use parent/child linking instead of inline sub-events

  - Remove `SubEventDto` interface and `subEvents` field from `CreateEventDto`/`UpdateEventDto`
  - Add `parentEventId` to `CreateEventDto`/`UpdateEventDto` for linking sub-events to a parent
  - Add `parentEvent` (BaseValueObject) to `Event` response interface
  - Add `features` and `attendeeCount` fields to `SubEvent` response interface

  BREAKING CHANGE: Sub-events are no longer created inline within the parent event payload. Create child events separately and reference the parent via `parentEventId`. The `SubEventDto` export has been removed.

## 0.2.0

### Minor Changes

- 79f1991: Add missing API endpoints and new resources from OpenAPI spec

  - Add social login to Auth
  - Add getById to Events
  - Add createOrganizer, createSubOrganizer, verifyUser to Users
  - Add Onboardings resource (getByUser, create, update)
  - Add EventAttendances resource (getAll, create, remove)
  - Add ForgotPassword resource (create, changePassword)
  - Add Countries resource (getAll, getById)
  - Add Counties resource (getAll, getById)
  - Add Cities resource (getAll, getById)
  - Move shared types (BaseValueObject, FileVo, Coordinates, CountryVo) to common/types.ts

## 0.1.1

### Patch Changes

- eaf9bd1: Fix npm publishing configuration with proper permissions and non-scoped package name.

## 0.1.0

### Minor Changes

- 1aff63a: Initial release of EventHR HTTP Client library with full API support for Auth, Events, Categories, Users, Files, and Collections.
