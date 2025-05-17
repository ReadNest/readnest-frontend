import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_9wu66v } from './api/v1/auth/login';
import type { Methods as Methods_1eq60rt } from './api/v1/auth/refresh-token';
import type { Methods as Methods_1p8w04r } from './api/v1/auth/register';
import type { Methods as Methods_r5qu0t } from './api/v1/users';
import type { Methods as Methods_lejw6y } from './api/v1/users/_userId@string';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/api/v1/auth/login';
  const PATH1 = '/api/v1/auth/refresh-token';
  const PATH2 = '/api/v1/auth/register';
  const PATH3 = '/api/v1/users';
  const GET = 'GET';
  const POST = 'POST';
  const DELETE = 'DELETE';

  return {
    api: {
      v1: {
        auth: {
          login: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_9wu66v['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_9wu66v['post']['resBody'], BasicHeaders, Methods_9wu66v['post']['status']>(prefix, PATH0, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_9wu66v['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_9wu66v['post']['resBody'], BasicHeaders, Methods_9wu66v['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH0}`,
          },
          refresh_token: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_1eq60rt['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1eq60rt['post']['resBody'], BasicHeaders, Methods_1eq60rt['post']['status']>(prefix, PATH1, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_1eq60rt['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1eq60rt['post']['resBody'], BasicHeaders, Methods_1eq60rt['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH1}`,
          },
          register: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_1p8w04r['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1p8w04r['post']['resBody'], BasicHeaders, Methods_1p8w04r['post']['status']>(prefix, PATH2, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_1p8w04r['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1p8w04r['post']['resBody'], BasicHeaders, Methods_1p8w04r['post']['status']>(prefix, PATH2, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH2}`,
          },
        },
        users: {
          _userId: (val3: string) => {
            const prefix3 = `${PATH3}/${val3}`;

            return {
              /**
               * @returns OK
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_lejw6y['get']['resBody'], BasicHeaders, Methods_lejw6y['get']['status']>(prefix, prefix3, GET, option).json(),
              /**
               * @returns OK
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_lejw6y['get']['resBody'], BasicHeaders, Methods_lejw6y['get']['status']>(prefix, prefix3, GET, option).json().then(r => r.body),
              /**
               * @returns OK
               */
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_lejw6y['delete']['resBody'], BasicHeaders, Methods_lejw6y['delete']['status']>(prefix, prefix3, DELETE, option).json(),
              /**
               * @returns OK
               */
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_lejw6y['delete']['resBody'], BasicHeaders, Methods_lejw6y['delete']['status']>(prefix, prefix3, DELETE, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_r5qu0t['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_r5qu0t['get']['resBody'], BasicHeaders, Methods_r5qu0t['get']['status']>(prefix, PATH3, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { query?: Methods_r5qu0t['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_r5qu0t['get']['resBody'], BasicHeaders, Methods_r5qu0t['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_r5qu0t['get']['query'] } | undefined) =>
            `${prefix}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
