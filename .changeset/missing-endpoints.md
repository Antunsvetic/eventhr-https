---
"eventhr-http-client": minor
---
Add missing API endpoints and new resources from OpenAPI spec

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
