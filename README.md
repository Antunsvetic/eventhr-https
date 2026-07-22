# EventHR HTTP Client

Configurable HTTP client library for the EventHR API. This library provides a TypeScript-based SDK for interacting with EventHR backend services, designed for use in both web and mobile applications.

## Installation

```bash
npm install eventhr-http-client
```

## Features

- **Type-safe**: Full TypeScript support with generated type definitions
- **React Query Integration**: Built-in React Query hooks for data fetching and caching
- **Configurable**: Easy configuration for base URL and custom headers
- **Modular**: Organized by resource (Auth, Events, Categories, Users, Files, Collections)
- **Interceptors**: Support for request/response interceptors

## Usage

### Basic Setup

```typescript
import { EventhrHttp } from 'eventhr-https';

// Configure the client
EventhrHttp.configure({
  baseUrl: 'https://api.eventhr.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Authentication

```typescript
import { EventhrHttp } from 'eventhr-https';

// Login
const loginResponse = await EventhrHttp.Auth.v1.login({
  username: 'user@example.com',
  password: 'password',
  notificationToken: 'optional-push-token',
});

// Refresh token
const refreshResponse = await EventhrHttp.Auth.v1.refresh({
  refreshToken: loginResponse.refreshToken,
});
```

### Adding Authentication Interceptor

```typescript
const interceptorId = EventhrHttp.addInterceptor(
  (config) => {
    // Add auth token to requests
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Remove interceptor when needed
EventhrHttp.removeInterceptor(interceptorId);
```

### Using React Query Hooks

```typescript
import { useGetEventsQuery, useCreateEventMutation } from 'eventhr-https';

function EventsList() {
  const { data, isLoading, error } = useGetEventsQuery({
    page: 0,
    size: 20,
    name: 'search-term',
  });

  const createEvent = useCreateEventMutation({
    onSuccess: () => {
      console.log('Event created');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading events</div>;

  return (
    <div>
      {data.content.map((event) => (
        <div key={event.id}>{event.name}</div>
      ))}
      <button onClick={() => createEvent.mutate(eventData)}>
        Create Event
      </button>
    </div>
  );
}
```

### Direct API Calls

```typescript
import { EventhrHttp } from 'eventhr-https';

// Get all events with pagination
const eventsResponse = await EventhrHttp.Events.v1.getAll({
  page: 0,
  size: 20,
  name: 'search-term',
});

// Create a new event
await EventhrHttp.Events.v1.create({
  name: 'My Event',
  description: 'Event description',
  startAt: '2024-01-01T10:00:00Z',
  endAt: '2024-01-01T12:00:00Z',
  address: {
    city: 'Zagreb',
    address: 'Main Street 1',
    postalCode: '10000',
  },
  coordinates: {
    latitude: 45.815,
    longitude: 15.9819,
  },
  price: 100,
  capacity: 500,
});

// Update an event
await EventhrHttp.Events.v1.update(eventId, {
  name: 'Updated Event Name',
  // ... other fields
});

// Delete an event
await EventhrHttp.Events.v1.remove(eventId);
```

### Categories

```typescript
import { useGetCategoriesQuery } from 'eventhr-https';

const { data: categories } = useGetCategoriesQuery({
  page: 0,
  size: 10,
  name: 'category-name',
});
```

### Collections

```typescript
import { useGetCollectionsQuery, useCreateCollectionMutation } from 'eventhr-https';

const { data: collections } = useGetCollectionsQuery({
  page: 0,
  size: 10,
  name: 'collection-name',
});

const createCollection = useCreateCollectionMutation();

createCollection.mutate({
  name: 'My Collection',
  eventIds: ['event-id-1', 'event-id-2'],
});
```

### Files

```typescript
import { EventhrHttp } from 'eventhr-https';

// Upload a file
const file = new File(['content'], 'example.jpg', { type: 'image/jpeg' });
const uploadedFile = await EventhrHttp.Files.v1.upload(file);

// Delete a file
await EventhrHttp.Files.v1.remove(fileId);
```

### Users

```typescript
import { EventhrHttp } from 'eventhr-https';

// Get current user profile
const profile = await EventhrHttp.Users.v1.getProfile();

// Get all users (admin)
const users = await EventhrHttp.Users.v1.getAll({ page: 0, size: 20 });

// Create user
await EventhrHttp.Users.v1.create({
  name: 'John Doe',
  username: 'johndoe',
  password: 'secure-password',
});

// Edit user
await EventhrHttp.Users.v1.edit(userId, {
  name: 'John Updated',
  username: 'johnupdated',
  imageId: 'image-id',
});
```

## API Reference

### Auth
- `login(data: LoginDto)` - Authenticate user
- `refresh(data: RefreshTokenDto)` - Refresh access token

### Events
- `getAll(params?: GetEventsParams)` - Get paginated events with filters
- `create(data: CreateEventDto)` - Create new event
- `update(id: string, data: UpdateEventDto)` - Update event
- `remove(id: string)` - Delete event

### Categories
- `getAll(params?: GetCategoriesParams)` - Get paginated categories
- `create(data: CreateCategoryDto)` - Create category
- `update(id: string, data: UpdateCategoryDto)` - Update category
- `remove(id: string)` - Delete category

### Collections
- `getAll(params?: GetCollectionsParams)` - Get paginated collections
- `getById(id: string)` - Get collection by ID
- `create(data: CreateCollectionDto)` - Create collection
- `update(id: string, data: UpdateCollectionDto)` - Update collection
- `remove(id: string)` - Delete collection

### Files
- `upload(file: File)` - Upload file
- `remove(id: string)` - Delete file

### Users
- `getAll(params?: PageRequest)` - Get paginated users
- `getProfile()` - Get current user profile
- `create(data: CreateUserDto)` - Create user
- `edit(id: string, data: EditUserDto)` - Edit user

## Configuration

### Base URL

```typescript
EventhrHttp.configure({
  baseUrl: 'https://your-api-domain.com',
});
```

### Custom Headers

```typescript
EventhrHttp.configure({
  headers: {
    'X-Custom-Header': 'value',
  },
});
```

### Remove Header

```typescript
EventhrHttp.removeHeader('X-Custom-Header');
```

## Development

### Building

```bash
npm run build
```

### Linting

```bash
npm run lint
```

### Watch Mode

```bash
npm run dev
```

## Versioning

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and changelog management.

### Adding a Changeset

When making changes that should be included in a release:

```bash
npm run changeset
```

This will prompt you to describe the changes and select the version bump type (major, minor, or patch).

### Releasing

Releases are automated via GitHub Actions when changesets are merged to the `develop` branch. The workflow will:
1. Version packages based on accumulated changesets
2. Generate a changelog
3. Publish to npm
4. Create a GitHub release

## License

MIT

## Repository

https://github.com/Antunsvetic/eventhr-https
