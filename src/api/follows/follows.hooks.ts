import { useMutation, useQuery } from '@tanstack/react-query';

import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { MutationOptions, Page, PageRequest, QueryOptions } from '@/api/common/types';
import type { Follow, FollowOrganizerDto } from './v1';
import Follows from './index';



export const useGetFollowsQuery = (
  params?: PageRequest,
  options?: QueryOptions<Page<Follow>>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.follows.list(params),
    queryFn: async () => {
      const response = await Follows.v1.getAll(params);
      return response.data;
    },
    ...options,
  });



export const useFollowOrganizerMutation = (
  options?: MutationOptions<void, FollowOrganizerDto>,
) =>
  useMutation({
    mutationFn: async (data: FollowOrganizerDto) => {
      await Follows.v1.follow(data);
    },
    ...options,
  });

export const useUnfollowOrganizerMutation = (
  options?: MutationOptions<void, { organizerId: string }>,
) =>
  useMutation({
    mutationFn: async ({ organizerId }: { organizerId: string }) => {
      await Follows.v1.unfollow(organizerId);
    },
    ...options,
  });
