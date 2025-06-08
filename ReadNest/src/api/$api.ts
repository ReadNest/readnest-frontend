import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_1q4gm9e } from './api/Badge';
import type { Methods as Methods_1lfruo2 } from './api/Badge/_code@string';
import type { Methods as Methods_e8ufco } from './api/v1/Comment';
import type { Methods as Methods_1r0ydxv } from './api/v1/Comment/_bookId@string';
import type { Methods as Methods_ptzq43 } from './api/v1/Comment/_commentId@string';
import type { Methods as Methods_13ir33a } from './api/v1/Comment/like';
import type { Methods as Methods_idg5yl } from './api/v1/Comment/pending-reported-comments';
import type { Methods as Methods_b4lw45 } from './api/v1/Comment/top-3-most-liked-comments';
import type { Methods as Methods_kb7s70 } from './api/v1/Comment/top-3-recent-comments/_userName@string';
import type { Methods as Methods_8p99oi } from './api/v1/CommentReport';
import type { Methods as Methods_r8tngn } from './api/v1/CommentReport/approve/_commentId@string';
import type { Methods as Methods_p6i82n } from './api/v1/CommentReport/reject/_commentId@string';
import type { Methods as Methods_9wu66v } from './api/v1/auth/login';
import type { Methods as Methods_1eq60rt } from './api/v1/auth/refresh-token';
import type { Methods as Methods_1p8w04r } from './api/v1/auth/register';
import type { Methods as Methods_1jq8r4r } from './api/v1/books';
import type { Methods as Methods_e95g2u } from './api/v1/books/_bookId@string';
import type { Methods as Methods_1m0b8n6 } from './api/v1/books/_bookId@string/affiliate-links';
import type { Methods as Methods_1xmkclx } from './api/v1/books/_id@string';
import type { Methods as Methods_etv2da } from './api/v1/books/filter';
import type { Methods as Methods_cyey74 } from './api/v1/books/search';
import type { Methods as Methods_3uzp0j } from './api/v1/categories';
import type { Methods as Methods_4nql1b } from './api/v1/categories/all';
import type { Methods as Methods_khf1pa } from './api/v1/favoriteBooks/favorites/_userId@string';
import type { Methods as Methods_fan7fs } from './api/v1/favoriteBooks/toggle';
import type { Methods as Methods_xu0xli } from './api/v1/posts';
import type { Methods as Methods_17xendo } from './api/v1/posts/_postId@string';
import type { Methods as Methods_11d8yh9 } from './api/v1/posts/book/_bookId@string';
import type { Methods as Methods_1w8n6s8 } from './api/v1/posts/like';
import type { Methods as Methods_1ql27cz } from './api/v1/posts/search';
import type { Methods as Methods_w93l98 } from './api/v1/posts/top-liked/_count@number';
import type { Methods as Methods_pkt47z } from './api/v1/posts/top-viewed/_count@number';
import type { Methods as Methods_18rduul } from './api/v1/posts/user/_userId@string';
import type { Methods as Methods_r5qu0t } from './api/v1/users';
import type { Methods as Methods_lejw6y } from './api/v1/users/_userId@string';
import type { Methods as Methods_1xqu5x7 } from './api/v1/users/profile';
import type { Methods as Methods_yk6d61 } from './api/v1/users/username/_userName@string';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/api/Badge';
  const PATH1 = '/api/v1/Comment';
  const PATH2 = '/api/v1/Comment/like';
  const PATH3 = '/api/v1/Comment/pending-reported-comments';
  const PATH4 = '/api/v1/Comment/top-3-most-liked-comments';
  const PATH5 = '/api/v1/Comment/top-3-recent-comments';
  const PATH6 = '/api/v1/CommentReport';
  const PATH7 = '/api/v1/CommentReport/approve';
  const PATH8 = '/api/v1/CommentReport/reject';
  const PATH9 = '/api/v1/auth/login';
  const PATH10 = '/api/v1/auth/refresh-token';
  const PATH11 = '/api/v1/auth/register';
  const PATH12 = '/api/v1/books';
  const PATH13 = '/affiliate-links';
  const PATH14 = '/api/v1/books/filter';
  const PATH15 = '/api/v1/books/search';
  const PATH16 = '/api/v1/categories';
  const PATH17 = '/api/v1/categories/all';
  const PATH18 = '/api/v1/favoriteBooks/favorites';
  const PATH19 = '/api/v1/favoriteBooks/toggle';
  const PATH20 = '/api/v1/posts';
  const PATH21 = '/api/v1/posts/book';
  const PATH22 = '/api/v1/posts/like';
  const PATH23 = '/api/v1/posts/search';
  const PATH24 = '/api/v1/posts/top-liked';
  const PATH25 = '/api/v1/posts/top-viewed';
  const PATH26 = '/api/v1/posts/user';
  const PATH27 = '/api/v1/users';
  const PATH28 = '/api/v1/users/profile';
  const PATH29 = '/api/v1/users/username';
  const GET = 'GET';
  const POST = 'POST';
  const PUT = 'PUT';
  const DELETE = 'DELETE';

  return {
    api: {
      Badge: {
        _code: (val2: string) => {
          const prefix2 = `${PATH0}/${val2}`;

          return {
            /**
             * @returns OK
             */
            delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1lfruo2['delete']['resBody'], BasicHeaders, Methods_1lfruo2['delete']['status']>(prefix, prefix2, DELETE, option).json(),
            /**
             * @returns OK
             */
            $delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1lfruo2['delete']['resBody'], BasicHeaders, Methods_1lfruo2['delete']['status']>(prefix, prefix2, DELETE, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
        /**
         * @returns OK
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1q4gm9e['get']['resBody'], BasicHeaders, Methods_1q4gm9e['get']['status']>(prefix, PATH0, GET, option).json(),
        /**
         * @returns OK
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1q4gm9e['get']['resBody'], BasicHeaders, Methods_1q4gm9e['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
        /**
         * @returns OK
         */
        post: (option: { body: Methods_1q4gm9e['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_1q4gm9e['post']['resBody'], BasicHeaders, Methods_1q4gm9e['post']['status']>(prefix, PATH0, POST, option).json(),
        /**
         * @returns OK
         */
        $post: (option: { body: Methods_1q4gm9e['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_1q4gm9e['post']['resBody'], BasicHeaders, Methods_1q4gm9e['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
        /**
         * @returns OK
         */
        put: (option: { body: Methods_1q4gm9e['put']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_1q4gm9e['put']['resBody'], BasicHeaders, Methods_1q4gm9e['put']['status']>(prefix, PATH0, PUT, option).json(),
        /**
         * @returns OK
         */
        $put: (option: { body: Methods_1q4gm9e['put']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_1q4gm9e['put']['resBody'], BasicHeaders, Methods_1q4gm9e['put']['status']>(prefix, PATH0, PUT, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
      v1: {
        Comment: {
          _bookId: (val3: string) => {
            const prefix3 = `${PATH1}/${val3}`;

            return {
              /**
               * @returns OK
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_1r0ydxv['get']['resBody'], BasicHeaders, Methods_1r0ydxv['get']['status']>(prefix, prefix3, GET, option).json(),
              /**
               * @returns OK
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_1r0ydxv['get']['resBody'], BasicHeaders, Methods_1r0ydxv['get']['status']>(prefix, prefix3, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
          _commentId: (val3: string) => {
            const prefix3 = `${PATH1}/${val3}`;

            return {
              /**
               * @returns OK
               */
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_ptzq43['delete']['resBody'], BasicHeaders, Methods_ptzq43['delete']['status']>(prefix, prefix3, DELETE, option).json(),
              /**
               * @returns OK
               */
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_ptzq43['delete']['resBody'], BasicHeaders, Methods_ptzq43['delete']['status']>(prefix, prefix3, DELETE, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
          like: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_13ir33a['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_13ir33a['post']['resBody'], BasicHeaders, Methods_13ir33a['post']['status']>(prefix, PATH2, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_13ir33a['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_13ir33a['post']['resBody'], BasicHeaders, Methods_13ir33a['post']['status']>(prefix, PATH2, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH2}`,
          },
          pending_reported_comments: {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_idg5yl['get']['resBody'], BasicHeaders, Methods_idg5yl['get']['status']>(prefix, PATH3, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_idg5yl['get']['resBody'], BasicHeaders, Methods_idg5yl['get']['status']>(prefix, PATH3, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH3}`,
          },
          top_3_most_liked_comments: {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_b4lw45['get']['resBody'], BasicHeaders, Methods_b4lw45['get']['status']>(prefix, PATH4, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_b4lw45['get']['resBody'], BasicHeaders, Methods_b4lw45['get']['status']>(prefix, PATH4, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH4}`,
          },
          top_3_recent_comments: {
            _userName: (val4: string) => {
              const prefix4 = `${PATH5}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_kb7s70['get']['resBody'], BasicHeaders, Methods_kb7s70['get']['status']>(prefix, prefix4, GET, option).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_kb7s70['get']['resBody'], BasicHeaders, Methods_kb7s70['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          /**
           * @returns OK
           */
          post: (option: { body: Methods_e8ufco['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_e8ufco['post']['resBody'], BasicHeaders, Methods_e8ufco['post']['status']>(prefix, PATH1, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_e8ufco['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_e8ufco['post']['resBody'], BasicHeaders, Methods_e8ufco['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          put: (option: { body: Methods_e8ufco['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_e8ufco['put']['resBody'], BasicHeaders, Methods_e8ufco['put']['status']>(prefix, PATH1, PUT, option).json(),
          /**
           * @returns OK
           */
          $put: (option: { body: Methods_e8ufco['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_e8ufco['put']['resBody'], BasicHeaders, Methods_e8ufco['put']['status']>(prefix, PATH1, PUT, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH1}`,
        },
        CommentReport: {
          approve: {
            _commentId: (val4: string) => {
              const prefix4 = `${PATH7}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                post: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_r8tngn['post']['resBody'], BasicHeaders, Methods_r8tngn['post']['status']>(prefix, prefix4, POST, option).json(),
                /**
                 * @returns OK
                 */
                $post: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_r8tngn['post']['resBody'], BasicHeaders, Methods_r8tngn['post']['status']>(prefix, prefix4, POST, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          reject: {
            _commentId: (val4: string) => {
              const prefix4 = `${PATH8}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                post: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_p6i82n['post']['resBody'], BasicHeaders, Methods_p6i82n['post']['status']>(prefix, prefix4, POST, option).json(),
                /**
                 * @returns OK
                 */
                $post: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_p6i82n['post']['resBody'], BasicHeaders, Methods_p6i82n['post']['status']>(prefix, prefix4, POST, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          /**
           * @returns OK
           */
          post: (option: { body: Methods_8p99oi['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_8p99oi['post']['resBody'], BasicHeaders, Methods_8p99oi['post']['status']>(prefix, PATH6, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_8p99oi['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_8p99oi['post']['resBody'], BasicHeaders, Methods_8p99oi['post']['status']>(prefix, PATH6, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH6}`,
        },
        auth: {
          login: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_9wu66v['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_9wu66v['post']['resBody'], BasicHeaders, Methods_9wu66v['post']['status']>(prefix, PATH9, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_9wu66v['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_9wu66v['post']['resBody'], BasicHeaders, Methods_9wu66v['post']['status']>(prefix, PATH9, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH9}`,
          },
          refresh_token: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_1eq60rt['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1eq60rt['post']['resBody'], BasicHeaders, Methods_1eq60rt['post']['status']>(prefix, PATH10, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_1eq60rt['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1eq60rt['post']['resBody'], BasicHeaders, Methods_1eq60rt['post']['status']>(prefix, PATH10, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH10}`,
          },
          register: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_1p8w04r['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1p8w04r['post']['resBody'], BasicHeaders, Methods_1p8w04r['post']['status']>(prefix, PATH11, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_1p8w04r['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1p8w04r['post']['resBody'], BasicHeaders, Methods_1p8w04r['post']['status']>(prefix, PATH11, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH11}`,
          },
        },
        books: {
          _bookId: (val3: string) => {
            const prefix3 = `${PATH12}/${val3}`;

            return {
              affiliate_links: {
                /**
                 * @returns OK
                 */
                post: (option: { body: Methods_1m0b8n6['post']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods_1m0b8n6['post']['resBody'], BasicHeaders, Methods_1m0b8n6['post']['status']>(prefix, `${prefix3}${PATH13}`, POST, option).json(),
                /**
                 * @returns OK
                 */
                $post: (option: { body: Methods_1m0b8n6['post']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods_1m0b8n6['post']['resBody'], BasicHeaders, Methods_1m0b8n6['post']['status']>(prefix, `${prefix3}${PATH13}`, POST, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH13}`,
              },
              /**
               * @returns OK
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_e95g2u['get']['resBody'], BasicHeaders, Methods_e95g2u['get']['status']>(prefix, prefix3, GET, option).json(),
              /**
               * @returns OK
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_e95g2u['get']['resBody'], BasicHeaders, Methods_e95g2u['get']['status']>(prefix, prefix3, GET, option).json().then(r => r.body),
              /**
               * @returns OK
               */
              put: (option: { body: Methods_e95g2u['put']['reqBody'], config?: T | undefined }) =>
                fetch<Methods_e95g2u['put']['resBody'], BasicHeaders, Methods_e95g2u['put']['status']>(prefix, prefix3, PUT, option).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods_e95g2u['put']['reqBody'], config?: T | undefined }) =>
                fetch<Methods_e95g2u['put']['resBody'], BasicHeaders, Methods_e95g2u['put']['status']>(prefix, prefix3, PUT, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
          _id: (val3: string) => {
            const prefix3 = `${PATH12}/${val3}`;

            return {
              /**
               * @returns OK
               */
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_1xmkclx['delete']['resBody'], BasicHeaders, Methods_1xmkclx['delete']['status']>(prefix, prefix3, DELETE, option).json(),
              /**
               * @returns OK
               */
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_1xmkclx['delete']['resBody'], BasicHeaders, Methods_1xmkclx['delete']['status']>(prefix, prefix3, DELETE, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
          filter: {
            /**
             * @returns OK
             */
            get: (option?: { query?: Methods_etv2da['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_etv2da['get']['resBody'], BasicHeaders, Methods_etv2da['get']['status']>(prefix, PATH14, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { query?: Methods_etv2da['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_etv2da['get']['resBody'], BasicHeaders, Methods_etv2da['get']['status']>(prefix, PATH14, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_etv2da['get']['query'] } | undefined) =>
              `${prefix}${PATH14}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          search: {
            /**
             * @returns OK
             */
            get: (option?: { query?: Methods_cyey74['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_cyey74['get']['resBody'], BasicHeaders, Methods_cyey74['get']['status']>(prefix, PATH15, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { query?: Methods_cyey74['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_cyey74['get']['resBody'], BasicHeaders, Methods_cyey74['get']['status']>(prefix, PATH15, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_cyey74['get']['query'] } | undefined) =>
              `${prefix}${PATH15}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_1jq8r4r['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_1jq8r4r['get']['resBody'], BasicHeaders, Methods_1jq8r4r['get']['status']>(prefix, PATH12, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { query?: Methods_1jq8r4r['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_1jq8r4r['get']['resBody'], BasicHeaders, Methods_1jq8r4r['get']['status']>(prefix, PATH12, GET, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods_1jq8r4r['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1jq8r4r['post']['resBody'], BasicHeaders, Methods_1jq8r4r['post']['status']>(prefix, PATH12, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_1jq8r4r['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1jq8r4r['post']['resBody'], BasicHeaders, Methods_1jq8r4r['post']['status']>(prefix, PATH12, POST, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_1jq8r4r['get']['query'] } | undefined) =>
            `${prefix}${PATH12}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        categories: {
          all: {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_4nql1b['get']['resBody'], BasicHeaders, Methods_4nql1b['get']['status']>(prefix, PATH17, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_4nql1b['get']['resBody'], BasicHeaders, Methods_4nql1b['get']['status']>(prefix, PATH17, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH17}`,
          },
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_3uzp0j['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_3uzp0j['get']['resBody'], BasicHeaders, Methods_3uzp0j['get']['status']>(prefix, PATH16, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { query?: Methods_3uzp0j['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_3uzp0j['get']['resBody'], BasicHeaders, Methods_3uzp0j['get']['status']>(prefix, PATH16, GET, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods_3uzp0j['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_3uzp0j['post']['resBody'], BasicHeaders, Methods_3uzp0j['post']['status']>(prefix, PATH16, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_3uzp0j['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_3uzp0j['post']['resBody'], BasicHeaders, Methods_3uzp0j['post']['status']>(prefix, PATH16, POST, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          put: (option: { body: Methods_3uzp0j['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_3uzp0j['put']['resBody'], BasicHeaders, Methods_3uzp0j['put']['status']>(prefix, PATH16, PUT, option).json(),
          /**
           * @returns OK
           */
          $put: (option: { body: Methods_3uzp0j['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_3uzp0j['put']['resBody'], BasicHeaders, Methods_3uzp0j['put']['status']>(prefix, PATH16, PUT, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_3uzp0j['get']['query'] } | undefined) =>
            `${prefix}${PATH16}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        favoriteBooks: {
          favorites: {
            _userId: (val4: string) => {
              const prefix4 = `${PATH18}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { query?: Methods_khf1pa['get']['query'] | undefined, config?: T | undefined } | undefined) =>
                  fetch<Methods_khf1pa['get']['resBody'], BasicHeaders, Methods_khf1pa['get']['status']>(prefix, prefix4, GET, option).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { query?: Methods_khf1pa['get']['query'] | undefined, config?: T | undefined } | undefined) =>
                  fetch<Methods_khf1pa['get']['resBody'], BasicHeaders, Methods_khf1pa['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                $path: (option?: { method?: 'get' | undefined; query: Methods_khf1pa['get']['query'] } | undefined) =>
                  `${prefix}${prefix4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
              };
            },
          },
          toggle: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_fan7fs['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_fan7fs['post']['resBody'], BasicHeaders, Methods_fan7fs['post']['status']>(prefix, PATH19, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_fan7fs['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_fan7fs['post']['resBody'], BasicHeaders, Methods_fan7fs['post']['status']>(prefix, PATH19, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH19}`,
          },
        },
        posts: {
          _postId: (val3: string) => {
            const prefix3 = `${PATH20}/${val3}`;

            return {
              /**
               * @returns OK
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_17xendo['get']['resBody'], BasicHeaders, Methods_17xendo['get']['status']>(prefix, prefix3, GET, option).json(),
              /**
               * @returns OK
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_17xendo['get']['resBody'], BasicHeaders, Methods_17xendo['get']['status']>(prefix, prefix3, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
          book: {
            _bookId: (val4: string) => {
              const prefix4 = `${PATH21}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_11d8yh9['get']['resBody'], BasicHeaders, Methods_11d8yh9['get']['status']>(prefix, prefix4, GET, option).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_11d8yh9['get']['resBody'], BasicHeaders, Methods_11d8yh9['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          like: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_1w8n6s8['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1w8n6s8['post']['resBody'], BasicHeaders, Methods_1w8n6s8['post']['status']>(prefix, PATH22, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_1w8n6s8['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1w8n6s8['post']['resBody'], BasicHeaders, Methods_1w8n6s8['post']['status']>(prefix, PATH22, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH22}`,
          },
          search: {
            /**
             * @returns OK
             */
            get: (option?: { query?: Methods_1ql27cz['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_1ql27cz['get']['resBody'], BasicHeaders, Methods_1ql27cz['get']['status']>(prefix, PATH23, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { query?: Methods_1ql27cz['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_1ql27cz['get']['resBody'], BasicHeaders, Methods_1ql27cz['get']['status']>(prefix, PATH23, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_1ql27cz['get']['query'] } | undefined) =>
              `${prefix}${PATH23}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          top_liked: {
            _count: (val4: number) => {
              const prefix4 = `${PATH24}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_w93l98['get']['resBody'], BasicHeaders, Methods_w93l98['get']['status']>(prefix, prefix4, GET, option).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_w93l98['get']['resBody'], BasicHeaders, Methods_w93l98['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          top_viewed: {
            _count: (val4: number) => {
              const prefix4 = `${PATH25}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_pkt47z['get']['resBody'], BasicHeaders, Methods_pkt47z['get']['status']>(prefix, prefix4, GET, option).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_pkt47z['get']['resBody'], BasicHeaders, Methods_pkt47z['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          user: {
            _userId: (val4: string) => {
              const prefix4 = `${PATH26}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_18rduul['get']['resBody'], BasicHeaders, Methods_18rduul['get']['status']>(prefix, prefix4, GET, option).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_18rduul['get']['resBody'], BasicHeaders, Methods_18rduul['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          /**
           * @returns OK
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_xu0xli['get']['resBody'], BasicHeaders, Methods_xu0xli['get']['status']>(prefix, PATH20, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_xu0xli['get']['resBody'], BasicHeaders, Methods_xu0xli['get']['status']>(prefix, PATH20, GET, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods_xu0xli['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_xu0xli['post']['resBody'], BasicHeaders, Methods_xu0xli['post']['status']>(prefix, PATH20, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_xu0xli['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_xu0xli['post']['resBody'], BasicHeaders, Methods_xu0xli['post']['status']>(prefix, PATH20, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH20}`,
        },
        users: {
          _userId: (val3: string) => {
            const prefix3 = `${PATH27}/${val3}`;

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
          profile: {
            /**
             * @returns OK
             */
            put: (option: { body: Methods_1xqu5x7['put']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1xqu5x7['put']['resBody'], BasicHeaders, Methods_1xqu5x7['put']['status']>(prefix, PATH28, PUT, option).json(),
            /**
             * @returns OK
             */
            $put: (option: { body: Methods_1xqu5x7['put']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1xqu5x7['put']['resBody'], BasicHeaders, Methods_1xqu5x7['put']['status']>(prefix, PATH28, PUT, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH28}`,
          },
          username: {
            _userName: (val4: string) => {
              const prefix4 = `${PATH29}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_yk6d61['get']['resBody'], BasicHeaders, Methods_yk6d61['get']['status']>(prefix, prefix4, GET, option).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_yk6d61['get']['resBody'], BasicHeaders, Methods_yk6d61['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_r5qu0t['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_r5qu0t['get']['resBody'], BasicHeaders, Methods_r5qu0t['get']['status']>(prefix, PATH27, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { query?: Methods_r5qu0t['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_r5qu0t['get']['resBody'], BasicHeaders, Methods_r5qu0t['get']['status']>(prefix, PATH27, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_r5qu0t['get']['query'] } | undefined) =>
            `${prefix}${PATH27}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
