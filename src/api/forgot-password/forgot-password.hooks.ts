import { useMutation } from '@tanstack/react-query';

import type { MutationOptions } from '@/api/common/types';
import type { ChangeForgotPasswordDto, ForgotPasswordCreateDto } from './v1';
import ForgotPassword from './index';



export const useCreateForgotPasswordMutation = (
  options?: MutationOptions<void, ForgotPasswordCreateDto>,
) =>
  useMutation({
    mutationFn: async (data: ForgotPasswordCreateDto) => {
      await ForgotPassword.v1.create(data);
    },
    ...options,
  });

export const useChangePasswordMutation = (
  options?: MutationOptions<void, { id: string; data: ChangeForgotPasswordDto }>,
) =>
  useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ChangeForgotPasswordDto }) => {
      await ForgotPassword.v1.changePassword(id, data);
    },
    ...options,
  });
