import { useQuery } from '@tanstack/react-query';

import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { Page, QueryOptions } from '@/api/common/types';
import type { Country, GetCountriesParams } from './v1';
import Countries from './index';



export const useGetCountriesQuery = (
  params?: GetCountriesParams,
  options?: QueryOptions<Page<Country>>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.countries.list(params),
    queryFn: async () => {
      const response = await Countries.v1.getAll(params);
      return response.data;
    },
    ...options,
  });

export const useGetCountryByIdQuery = (
  id: string,
  options?: QueryOptions<Country>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.countries.detail(id),
    queryFn: async () => {
      const response = await Countries.v1.getById(id);
      return response.data;
    },
    ...options,
  });
