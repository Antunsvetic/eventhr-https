import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { MutationOptions, Page, QueryOptions } from '@/api/common/types';
import type { Event } from '@/api/events';
import type { Collection, CreateCollectionDto, GetCollectionsParams, UpdateCollectionDto } from './v1';
import Collections from './index';



export const useGetCollectionsQuery = (
  params?: GetCollectionsParams,
  options?: QueryOptions<Page<Collection>>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.collections.list(params),
    queryFn: async () => {
      const response = await Collections.v1.getAll(params);
      return response.data;
    },
    ...options,
  });

export const useGetCollectionByIdQuery = (
  id: string,
  options?: QueryOptions<Collection>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.collections.detail(id),
    queryFn: async () => {
      const response = await Collections.v1.getById(id);
      return response.data;
    },
    ...options,
  });

export const useCreateCollectionMutation = (
  options?: MutationOptions<void, CreateCollectionDto>,
) =>
  useMutation({
    mutationFn: async (data: CreateCollectionDto) => {
      await Collections.v1.create(data);
    },
    ...options,
  });

export const useUpdateCollectionMutation = (
  options?: MutationOptions<void, { id: string; data: UpdateCollectionDto }>,
) =>
  useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCollectionDto }) => {
      await Collections.v1.update(id, data);
    },
    ...options,
  });

export const useDeleteCollectionMutation = (
  options?: MutationOptions<void, { id: string }>,
) =>
  useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await Collections.v1.remove(id);
    },
    ...options,
  });

type SaveEventVariables = { id: string; eventId: string; data: UpdateCollectionDto };
type SaveEventContext = {
  previousLists: Array<[readonly unknown[], Page<Event> | undefined]>;
  previousDetail: Event | undefined;
};

export const useSaveEventMutation = (
  options?: MutationOptions<void, SaveEventVariables>,
) => {
  const queryClient = useQueryClient();
  const { onMutate, onError, onSettled, ...restOptions } = options ?? {};

  return useMutation<void, Error, SaveEventVariables, SaveEventContext>({
    mutationFn: async ({ id, data }) => {
      await Collections.v1.update(id, data);
    },
    onMutate: async (variables, mutationContext) => {
      const { eventId } = variables;
      const listKey = [...EVENTHR_QUERY_KEYS.events.all, 'list'];

      await queryClient.cancelQueries({ queryKey: EVENTHR_QUERY_KEYS.events.all });

      const previousLists = queryClient.getQueriesData<Page<Event>>({ queryKey: listKey });

      queryClient.setQueriesData<Page<Event>>({ queryKey: listKey }, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          content: oldData.content.map((event) =>
            event.id === eventId ? { ...event, isSaved: !event.isSaved } : event,
          ),
        };
      });

      const detailKey = EVENTHR_QUERY_KEYS.events.detail(eventId);
      const previousDetail = queryClient.getQueryData<Event>(detailKey);
      if (previousDetail) {
        queryClient.setQueryData<Event>(detailKey, { ...previousDetail, isSaved: !previousDetail.isSaved });
      }

      await onMutate?.(variables, mutationContext);

      return { previousLists, previousDetail };
    },
    onError: (error, variables, onMutateResult, mutationContext) => {
      onMutateResult?.previousLists.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      if (onMutateResult?.previousDetail) {
        queryClient.setQueryData(
          EVENTHR_QUERY_KEYS.events.detail(variables.eventId),
          onMutateResult.previousDetail,
        );
      }
      onError?.(error, variables, onMutateResult, mutationContext);
    },
    onSettled: (data, error, variables, onMutateResult, mutationContext) => {
      queryClient.invalidateQueries({ queryKey: EVENTHR_QUERY_KEYS.collections.all });
      onSettled?.(data, error, variables, onMutateResult, mutationContext);
    },
    ...restOptions,
  });
};
