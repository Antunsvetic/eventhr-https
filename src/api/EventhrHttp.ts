import { setBaseUrl, setHeaders, removeHeader, addRequestInterceptor, removeRequestInterceptor } from '../instance';
import type { InternalAxiosRequestConfig } from 'axios';
import Events from './events';
import Auth from './auth';
import Categories from './categories';
import Collections from './collections';
import Users from './users';
import Files from './files';

export interface EventhrHttpConfig {
  baseUrl?: string;
  headers?: Record<string, string>;
}

export class EventhrHttpClient {
  readonly Auth = Auth;
  readonly Events = Events;
  readonly Categories = Categories;
  readonly Collections = Collections;
  readonly Users = Users;
  readonly Files = Files;

  configure({ baseUrl, headers }: EventhrHttpConfig): void {
    if (baseUrl !== undefined) {
      setBaseUrl(baseUrl);
    }
    if (headers !== undefined) {
      setHeaders(headers);
    }
  }

  removeHeader(key: string): void {
    removeHeader(key);
  }

  addInterceptor(
    onFulfilled: (
      config: InternalAxiosRequestConfig,
    ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
    onRejected?: (error: unknown) => unknown,
  ): number {
    return addRequestInterceptor(onFulfilled, onRejected);
  }

  removeInterceptor(id: number): void {
    removeRequestInterceptor(id);
  }
}

const EventhrHttp = new EventhrHttpClient();
export default EventhrHttp;
