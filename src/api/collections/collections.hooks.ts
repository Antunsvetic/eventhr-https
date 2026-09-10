import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { MutationOptions, Page, QueryOptions } from '@/api/common/types';
import { createOptimisticIsSavedUpdater, createIsSavedRollback, type EventSavedContext } from '@/api/events/events.cache';
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

function createCollectionsInvalidator<TVariables>(
  queryClient: ReturnType<typeof useQueryClient>,
  userOnSettled?: MutationOptions<void, TVariables>['onSettled'],
) {
  return (data: void | undefined, error: Error | null, variables: TVariables, onMutateResult: EventSavedContext | undefined, mutationContext: unknown) => {
    queryClient.invalidateQueries({ queryKey: EVENTHR_QUERY_KEYS.collections.all });
    userOnSettled?.(data, error, variables, onMutateResult, mutationContext as never);
  };
}

export const useRemoveEventFromCollectionsMutation = (
  options?: MutationOptions<void, { eventId: string }>,
) => {
  const queryClient = useQueryClient();
  const { onMutate, onError, onSettled, ...restOptions } = options ?? {};

  return useMutation<void, Error, { eventId: string }, EventSavedContext>({
    mutationFn: async ({ eventId }) => {
      await Collections.v1.removeEvent(eventId);
    },
    onMutate: createOptimisticIsSavedUpdater(queryClient, false, onMutate),
    onError: createIsSavedRollback(queryClient, onError),
    onSettled: createCollectionsInvalidator(queryClient, onSettled),
    ...restOptions,
  });
};

type SaveEventVariables = { id: string; eventId: string; data: UpdateCollectionDto };

export const useSaveEventMutation = (
  options?: MutationOptions<void, SaveEventVariables>,
) => {
  const queryClient = useQueryClient();
  const { onMutate, onError, onSettled, ...restOptions } = options ?? {};

  return useMutation<void, Error, SaveEventVariables, EventSavedContext>({
    mutationFn: async ({ id, data }) => {
      await Collections.v1.update(id, data);
    },
    onMutate: createOptimisticIsSavedUpdater(queryClient, 'toggle', onMutate),
    onError: createIsSavedRollback(queryClient, onError),
    onSettled: createCollectionsInvalidator(queryClient, onSettled),
    ...restOptions,
  });
};
