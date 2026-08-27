import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

export interface BaseValueObject {
  id: string;
  name: string;
}

export interface FileVo {
  id: string;
  url: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface CountryVo {
  country: BaseValueObject;
  county: BaseValueObject;
  city: BaseValueObject;
}

export interface PageRequest {
  page?: number;
  size?: number;
  sort?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  numberOfElements: number;
}

export type QueryOptions<T> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;
export type MutationOptions<TData, TVariables, TError = Error> = Omit<
  UseMutationOptions<TData, TError, TVariables>,
  'mutationFn'
>;
