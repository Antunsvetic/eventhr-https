# eventhr-http-client

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
