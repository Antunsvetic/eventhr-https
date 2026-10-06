import { useQuery } from '@tanstack/react-query';

import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { QueryOptions } from '@/api/common/types';
import type { SearchResult } from './v1';
import Search from './index';



export const useSearchQuery = (
  query: string,
  options?: QueryOptions<SearchResult>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.search.query(query),
    queryFn: async () => {
      const response = await Search.v1.search(query);
      return response.data;
    },
    enabled: query.length > 0,
    ...options,
  });
