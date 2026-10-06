import type { GetEventsParams } from './events';
import type { GetCategoriesParams } from './categories';
import type { GetCollectionsParams } from './collections';
import type { GetCountriesParams } from './countries';
import type { GetCountiesParams } from './counties';
import type { GetCitiesParams } from './cities';
import type { GetEventAttendancesParams } from './event-attendances';
import type { GetAdsParams } from './ads';
import type { GetUsersParams } from './users';
import type { PageRequest } from './common/types';

export const EVENTHR_QUERY_KEYS = {
  events: {
    all: ['events'] as const,
    list: (params?: GetEventsParams) => [...EVENTHR_QUERY_KEYS.events.all, 'list', params] as const,
    detail: (id: string) => [...EVENTHR_QUERY_KEYS.events.all, 'detail', id] as const,
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
    list: (params?: GetUsersParams) => [...EVENTHR_QUERY_KEYS.users.all, 'list', params] as const,
    profile: () => [...EVENTHR_QUERY_KEYS.users.all, 'profile'] as const,
  },
  files: {
    all: ['files'] as const,
  },
  onboardings: {
    all: ['onboardings'] as const,
    detail: () => [...EVENTHR_QUERY_KEYS.onboardings.all, 'detail'] as const,
  },
  eventAttendances: {
    all: ['event-attendances'] as const,
    list: (params?: GetEventAttendancesParams) =>
      [...EVENTHR_QUERY_KEYS.eventAttendances.all, 'list', params] as const,
  },
  countries: {
    all: ['countries'] as const,
    list: (params?: GetCountriesParams) =>
      [...EVENTHR_QUERY_KEYS.countries.all, 'list', params] as const,
    detail: (id: string) => [...EVENTHR_QUERY_KEYS.countries.all, 'detail', id] as const,
  },
  counties: {
    all: ['counties'] as const,
    list: (params?: GetCountiesParams) =>
      [...EVENTHR_QUERY_KEYS.counties.all, 'list', params] as const,
    detail: (id: string) => [...EVENTHR_QUERY_KEYS.counties.all, 'detail', id] as const,
  },
  cities: {
    all: ['cities'] as const,
    list: (params?: GetCitiesParams) =>
      [...EVENTHR_QUERY_KEYS.cities.all, 'list', params] as const,
    detail: (id: string) => [...EVENTHR_QUERY_KEYS.cities.all, 'detail', id] as const,
  },
  ads: {
    all: ['ads'] as const,
    list: (params?: GetAdsParams) => [...EVENTHR_QUERY_KEYS.ads.all, 'list', params] as const,
  },
  feed: {
    all: ['feed'] as const,
  },
  follows: {
    all: ['follows'] as const,
    list: (params?: PageRequest) => [...EVENTHR_QUERY_KEYS.follows.all, 'list', params] as const,
  },
  organizers: {
    all: ['organizers'] as const,
    list: (params?: PageRequest) => [...EVENTHR_QUERY_KEYS.organizers.all, 'list', params] as const,
    detail: (id: string) => [...EVENTHR_QUERY_KEYS.organizers.all, 'detail', id] as const,
  },
  search: {
    all: ['search'] as const,
    query: (query: string) => [...EVENTHR_QUERY_KEYS.search.all, 'query', query] as const,
  },
} as const;
