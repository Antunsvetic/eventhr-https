import { queryClient } from '@/query-client';
import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';

export const invalidateEventAttendancesCache = (): Promise<void> =>
  queryClient.invalidateQueries({ queryKey: EVENTHR_QUERY_KEYS.eventAttendances.all });
