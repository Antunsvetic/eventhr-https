import { useMutation, useQuery } from '@tanstack/react-query';

import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { MutationOptions, QueryOptions } from '@/api/common/types';
import type { CreateOnboardingDto, Onboarding, UpdateOnboardingDto } from './v1';
import Onboardings from './index';



export const useGetOnboardingQuery = (
  options?: QueryOptions<Onboarding>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.onboardings.detail(),
    queryFn: async () => {
      const response = await Onboardings.v1.getByUser();
      return response.data;
    },
    ...options,
  });

export const useCreateOnboardingMutation = (
  options?: MutationOptions<Onboarding, CreateOnboardingDto>,
) =>
  useMutation({
    mutationFn: async (data: CreateOnboardingDto) => {
      const response = await Onboardings.v1.create(data);
      return response.data;
    },
    ...options,
  });

export const useUpdateOnboardingMutation = (
  options?: MutationOptions<Onboarding, UpdateOnboardingDto>,
) =>
  useMutation({
    mutationFn: async (data: UpdateOnboardingDto) => {
      const response = await Onboardings.v1.update(data);
      return response.data;
    },
    ...options,
  });
