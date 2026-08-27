import { useQuery } from '@tanstack/react-query';

import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { Page, QueryOptions } from '@/api/common/types';
import type { County, GetCountiesParams } from './v1';
import Counties from './index';



export const useGetCountiesQuery = (
  params?: GetCountiesParams,
  options?: QueryOptions<Page<County>>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.counties.list(params),
    queryFn: async () => {
      const response = await Counties.v1.getAll(params);
      return response.data;
    },
    ...options,
  });

export const useGetCountyByIdQuery = (
  id: string,
  options?: QueryOptions<County>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.counties.detail(id),
    queryFn: async () => {
      const response = await Counties.v1.getById(id);
      return response.data;
    },
    ...options,
  });
