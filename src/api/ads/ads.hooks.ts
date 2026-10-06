import { useMutation, useQuery } from '@tanstack/react-query';

import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { MutationOptions, Page, QueryOptions } from '@/api/common/types';
import type { Ad, CreateAdDto, GetAdsParams, UpdateAdDto } from './v1';
import Ads from './index';



export const useGetAdsQuery = (
  params?: GetAdsParams,
  options?: QueryOptions<Page<Ad>>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.ads.list(params),
    queryFn: async () => {
      const response = await Ads.v1.getAll(params);
      return response.data;
    },
    ...options,
  });



export const useCreateAdMutation = (
  options?: MutationOptions<void, CreateAdDto>,
) =>
  useMutation({
    mutationFn: async (data: CreateAdDto) => {
      await Ads.v1.create(data);
    },
    ...options,
  });

export const useUpdateAdMutation = (
  options?: MutationOptions<void, { id: string; data: UpdateAdDto }>,
) =>
  useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateAdDto }) => {
      await Ads.v1.update(id, data);
    },
    ...options,
  });

export const useDeleteAdMutation = (
  options?: MutationOptions<void, { id: string }>,
) =>
  useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await Ads.v1.remove(id);
    },
    ...options,
  });
