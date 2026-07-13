import { useMutation, useQuery } from '@tanstack/react-query';

import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { MutationOptions, Page, QueryOptions } from '@/api/common/types';
import type { Category, CreateCategoryDto, GetCategoriesParams, UpdateCategoryDto } from './v1';
import Categories from './index';



export const useGetCategoriesQuery = (
  params?: GetCategoriesParams,
  options?: QueryOptions<Page<Category>>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.categories.list(params),
    queryFn: async () => {
      const response = await Categories.v1.getAll(params);
      return response.data;
    },
    ...options,
  });



export const useCreateCategoryMutation = (
  options?: MutationOptions<void, CreateCategoryDto>,
) =>
  useMutation({
    mutationFn: async (data: CreateCategoryDto) => {
      await Categories.v1.create(data);
    },
    ...options,
  });

export const useUpdateCategoryMutation = (
  options?: MutationOptions<void, { id: string; data: UpdateCategoryDto }>,
) =>
  useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCategoryDto }) => {
      await Categories.v1.update(id, data);
    },
    ...options,
  });

export const useDeleteCategoryMutation = (
  options?: MutationOptions<void, { id: string }>,
) =>
  useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await Categories.v1.remove(id);
    },
    ...options,
  });
