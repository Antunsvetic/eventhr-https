import { useQuery } from '@tanstack/react-query';

import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { QueryOptions } from '@/api/common/types';
import type { FeedResult } from './v1';
import Feed from './index';



export const useGetFeedQuery = (
  options?: QueryOptions<FeedResult>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.feed.all,
    queryFn: async () => {
      const response = await Feed.v1.get();
      return response.data;
    },
    ...options,
  });
