import { useMutation, useQuery } from '@tanstack/react-query';

import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { MutationOptions, Page, QueryOptions } from '@/api/common/types';
import type { CreateEventDto, Event, GetEventsParams, UpdateEventDto } from './v1';
import Events from './index';



export const useGetEventsQuery = (
  params?: GetEventsParams,
  options?: QueryOptions<Page<Event>>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.events.list(params),
    queryFn: async () => {
      const response = await Events.v1.getAll(params);
      return response.data;
    },
    ...options,
  });



export const useCreateEventMutation = (
  options?: MutationOptions<void, CreateEventDto>,
) =>
  useMutation({
    mutationFn: async (data: CreateEventDto) => {
      await Events.v1.create(data);
    },
    ...options,
  });

export const useUpdateEventMutation = (
  options?: MutationOptions<void, { id: string; data: UpdateEventDto }>,
) =>
  useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateEventDto }) => {
      await Events.v1.update(id, data);
    },
    ...options,
  });

export const useDeleteEventMutation = (
  options?: MutationOptions<void, { id: string }>,
) =>
  useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await Events.v1.remove(id);
    },
    ...options,
  });
