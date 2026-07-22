import type { GetEventsParams } from './events';
import type { GetCategoriesParams } from './categories';
import type { GetCollectionsParams } from './collections';
import type { PageRequest } from './common/types';

export const EVENTHR_QUERY_KEYS = {
  events: {
    all: ['events'] as const,
    list: (params?: GetEventsParams) => [...EVENTHR_QUERY_KEYS.events.all, 'list', params] as const,
  },
  categories: {
    all: ['categories'] as const,
    list: (params?: GetCategoriesParams) =>
      [...EVENTHR_QUERY_KEYS.categories.all, 'list', params] as const,
  },
  collections: {
    all: ['collections'] as const,
    list: (params?: GetCollectionsParams) =>
      [...EVENTHR_QUERY_KEYS.collections.all, 'list', params] as const,
    detail: (id: string) => [...EVENTHR_QUERY_KEYS.collections.all, 'detail', id] as const,
  },
  users: {
    all: ['users'] as const,
    list: (params?: PageRequest) => [...EVENTHR_QUERY_KEYS.users.all, 'list', params] as const,
    profile: () => [...EVENTHR_QUERY_KEYS.users.all, 'profile'] as const,
  },
  files: {
    all: ['files'] as const,
  },
} as const;
