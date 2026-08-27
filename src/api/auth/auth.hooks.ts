import { useMutation } from '@tanstack/react-query';

import type { MutationOptions } from '@/api/common/types';
import type { AuthTokenResponse, LoginDto, RefreshTokenDto, SocialAuthDto, SocialAuthResponse } from './v1';
import Auth from './index';

export const useLoginMutation = (
  options?: MutationOptions<AuthTokenResponse, LoginDto>,
) =>
  useMutation({
    mutationFn: async (data: LoginDto) => {
      const response = await Auth.v1.login(data);
      return response.data;
    },
    ...options,
  });

export const useSocialAuthMutation = (
  options?: MutationOptions<SocialAuthResponse, SocialAuthDto>,
) =>
  useMutation({
    mutationFn: async (data: SocialAuthDto) => {
      const response = await Auth.v1.social(data);
      return response.data;
    },
    ...options,
  });

export const useRefreshTokenMutation = (
  options?: MutationOptions<AuthTokenResponse, RefreshTokenDto>,
) =>
  useMutation({
    mutationFn: async (data: RefreshTokenDto) => {
      const response = await Auth.v1.refresh(data);
      return response.data;
    },
    ...options,
  });
