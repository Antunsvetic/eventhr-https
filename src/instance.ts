import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setBaseUrl = (url: string): void => {
  instance.defaults.baseURL = url;
};

export const setHeaders = (headers: Record<string, string>): void => {
  Object.assign(instance.defaults.headers.common, headers);
};

export const removeHeader = (key: string): void => {
  delete (instance.defaults.headers.common as Record<string, string>)[key];
};

export const addRequestInterceptor = (
  onFulfilled: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
  onRejected?: (error: unknown) => unknown,
): number => instance.interceptors.request.use(onFulfilled, onRejected);

export const removeRequestInterceptor = (id: number): void => {
  instance.interceptors.request.eject(id);
};

export { instance };
export default instance;
