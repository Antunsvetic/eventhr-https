import { useQuery } from '@tanstack/react-query';

import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { Page, QueryOptions } from '@/api/common/types';
import type { City, GetCitiesParams } from './v1';
import Cities from './index';



export const useGetCitiesQuery = (
  params?: GetCitiesParams,
  options?: QueryOptions<Page<City>>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.cities.list(params),
    queryFn: async () => {
      const response = await Cities.v1.getAll(params);
      return response.data;
    },
    ...options,
  });

export const useGetCityByIdQuery = (
  id: string,
  options?: QueryOptions<City>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.cities.detail(id),
    queryFn: async () => {
      const response = await Cities.v1.getById(id);
      return response.data;
    },
    ...options,
  });
