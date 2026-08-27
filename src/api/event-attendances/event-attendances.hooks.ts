import { useMutation, useQuery } from '@tanstack/react-query';

import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { MutationOptions, Page, QueryOptions } from '@/api/common/types';
import type { CreateEventAttendanceDto, EventAttendance, GetEventAttendancesParams } from './v1';
import EventAttendances from './index';



export const useGetEventAttendancesQuery = (
  params?: GetEventAttendancesParams,
  options?: QueryOptions<Page<EventAttendance>>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.eventAttendances.list(params),
    queryFn: async () => {
      const response = await EventAttendances.v1.getAll(params);
      return response.data;
    },
    ...options,
  });

export const useCreateEventAttendanceMutation = (
  options?: MutationOptions<void, CreateEventAttendanceDto>,
) =>
  useMutation({
    mutationFn: async (data: CreateEventAttendanceDto) => {
      await EventAttendances.v1.create(data);
    },
    ...options,
  });

export const useDeleteEventAttendanceMutation = (
  options?: MutationOptions<void, { id: string }>,
) =>
  useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await EventAttendances.v1.remove(id);
    },
    ...options,
  });
