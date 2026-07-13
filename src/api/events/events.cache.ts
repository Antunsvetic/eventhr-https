import { queryClient } from '@/query-client';
import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';

export const invalidateEventsCache = (): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: EVENTHR_QUERY_KEYS.events.all });
