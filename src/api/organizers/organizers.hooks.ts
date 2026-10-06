import { useQuery } from '@tanstack/react-query';

import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { Page, PageRequest, QueryOptions } from '@/api/common/types';
import type { Organizer } from './v1';
import Organizers from './index';



export const useGetOrganizersQuery = (
  params?: PageRequest,
  options?: QueryOptions<Page<Organizer>>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.organizers.list(params),
    queryFn: async () => {
      const response = await Organizers.v1.getAll(params);
      return response.data;
    },
    ...options,
  });

export const useGetOrganizerByIdQuery = (
  id: string,
  options?: QueryOptions<Organizer>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.organizers.detail(id),
    queryFn: async () => {
      const response = await Organizers.v1.getById(id);
      return response.data;
    },
    ...options,
  });
