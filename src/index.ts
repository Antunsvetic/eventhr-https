// Default export — the pre-configured singleton client
export { default } from './api/EventhrHttp';

// Named exports
export * from './api';
export { queryClient } from './query-client';
export {
  instance,
  setBaseUrl,
  setHeaders,
  removeHeader,
  addRequestInterceptor,
  removeRequestInterceptor,
} from './instance';
