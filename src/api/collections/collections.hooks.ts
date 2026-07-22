import { useMutation, useQuery } from '@tanstack/react-query';

import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { MutationOptions, Page, QueryOptions } from '@/api/common/types';
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
