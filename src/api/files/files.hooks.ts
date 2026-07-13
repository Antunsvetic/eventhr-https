import { useMutation } from '@tanstack/react-query';

import type { MutationOptions } from '@/api/common/types';
import type { UploadedFile } from './v1';
import Files from './index';

export const useUploadFileMutation = (
  options?: MutationOptions<UploadedFile, File>,
) =>
  useMutation({
    mutationFn: async (file: File) => {
      const response = await Files.v1.upload(file);
      return response.data;
    },
    ...options,
  });

export const useDeleteFileMutation = (
  options?: MutationOptions<void, { id: string }>,
) =>
  useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await Files.v1.remove(id);
    },
    ...options,
  });
