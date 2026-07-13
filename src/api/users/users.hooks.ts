import { useMutation, useQuery } from '@tanstack/react-query';

import { EVENTHR_QUERY_KEYS } from '@/api/eventhrKeys';
import type { MutationOptions, Page, PageRequest, QueryOptions } from '@/api/common/types';
import type { CreateUserDto, EditUserDto, User } from './v1';
import Users from './index';



export const useGetUsersQuery = (
  params?: PageRequest,
  options?: QueryOptions<Page<User>>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.users.list(params),
    queryFn: async () => {
      const response = await Users.v1.getAll(params);
      return response.data;
    },
    ...options,
  });

export const useGetProfileQuery = (
  options?: QueryOptions<User>,
) =>
  useQuery({
    queryKey: EVENTHR_QUERY_KEYS.users.profile(),
    queryFn: async () => {
      const response = await Users.v1.getProfile();
      return response.data;
    },
    ...options,
  });

export const useCreateUserMutation = (
  options?: MutationOptions<void, CreateUserDto>,
) =>
  useMutation({
    mutationFn: async (data: CreateUserDto) => {
      await Users.v1.create(data);
    },
    ...options,
  });

export const useEditUserMutation = (
  options?: MutationOptions<void, { id: string; data: EditUserDto }>,
) =>
  useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EditUserDto }) => {
      await Users.v1.edit(id, data);
    },
    ...options,
  });
