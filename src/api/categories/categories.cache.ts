import { queryClient } from '@/query-client';
import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';

export const invalidateCategoriesCache = (): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: EVENTHR_QUERY_KEYS.categories.all });
