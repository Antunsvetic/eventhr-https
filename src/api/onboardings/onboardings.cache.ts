import { queryClient } from '@/query-client';
import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';

export const invalidateOnboardingsCache = (): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: EVENTHR_QUERY_KEYS.onboardings.all });
