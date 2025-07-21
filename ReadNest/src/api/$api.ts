import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_1r0pymj } from './api/user-subscriptions';
import type { Methods as Methods_kz5zxa } from './api/v1/Badge';
import type { Methods as Methods_ytcegm } from './api/v1/Badge/_code@string';
import type { Methods as Methods_17u6g9d } from './api/v1/ChatMessages/get-all-chatters-by-user-id/_id@string';
import type { Methods as Methods_175qj1 } from './api/v1/ChatMessages/get-chatter-by-user-id/_senderId@string';
import type { Methods as Methods_d6uvu8 } from './api/v1/ChatMessages/get-chatter-by-user-name/_senderUserName@string';
import type { Methods as Methods_1fevt5v } from './api/v1/ChatMessages/get-full-conversation/_userAId@string/_userBId@string';
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
import type { Methods as Methods_1vez6b1 } from './api/v1/Event';
import type { Methods as Methods_vasura } from './api/v1/Event/_eventId@string/rewards';
import type { Methods as Methods_1nrs6kb } from './api/v1/Event/_id@string';
import type { Methods as Methods_4mqld1 } from './api/v1/Event/all';
import type { Methods as Methods_qj9hr8 } from './api/v1/Event/all-paging';
import type { Methods as Methods_dc508v } from './api/v1/Event/current';
import type { Methods as Methods_12yf79u } from './api/v1/Leaderboard/rank/_eventId@string/_userId@string';
import type { Methods as Methods_w2o46m } from './api/v1/Leaderboard/recalculate-scores/_eventId@string';
import type { Methods as Methods_e520uw } from './api/v1/Leaderboard/top/_eventId@string/_top@number';
import type { Methods as Methods_s81qhi } from './api/v1/Leaderboard/top-by-time-range';
import type { Methods as Methods_9fncnl } from './api/v1/Leaderboard/user/_eventId@string/_userId@string';
import type { Methods as Methods_gpznh7 } from './api/v1/UserBadges/assign-badge-to-all-users';
import type { Methods as Methods_zuqg05 } from './api/v1/UserBadges/select-user-badge';
import type { Methods as Methods_b7a7g9 } from './api/v1/UserBadges/set-all-badges-active';
import type { Methods as Methods_9wu66v } from './api/v1/auth/login';
import type { Methods as Methods_1eq60rt } from './api/v1/auth/refresh-token';
import type { Methods as Methods_1p8w04r } from './api/v1/auth/register';
import type { Methods as Methods_1jq8r4r } from './api/v1/books';
import type { Methods as Methods_e95g2u } from './api/v1/books/_bookId@string';
import type { Methods as Methods_1m0b8n6 } from './api/v1/books/_bookId@string/affiliate-links';
import type { Methods as Methods_1xmkclx } from './api/v1/books/_id@string';
import type { Methods as Methods_2ssmp3 } from './api/v1/books/all';
import type { Methods as Methods_etv2da } from './api/v1/books/filter';
import type { Methods as Methods_cyey74 } from './api/v1/books/search';
import type { Methods as Methods_3uzp0j } from './api/v1/categories';
import type { Methods as Methods_4nql1b } from './api/v1/categories/all';
import type { Methods as Methods_khf1pa } from './api/v1/favoriteBooks/favorites/_userId@string';
import type { Methods as Methods_fan7fs } from './api/v1/favoriteBooks/toggle';
import type { Methods as Methods_bxzk2o } from './api/v1/features';
import type { Methods as Methods_e3tpjw } from './api/v1/features/_id@string';
import type { Methods as Methods_1alr8do } from './api/v1/features/all';
import type { Methods as Methods_18onvqa } from './api/v1/packages';
import type { Methods as Methods_1bd4y0a } from './api/v1/packages/_id@string';
import type { Methods as Methods_1tulz1e } from './api/v1/payment/init-webhook';
import type { Methods as Methods_za6i4m } from './api/v1/payment/payment-links';
import type { Methods as Methods_1ol7w11 } from './api/v1/payment/webhook';
import type { Methods as Methods_xu0xli } from './api/v1/posts';
import type { Methods as Methods_17xendo } from './api/v1/posts/_postId@string';
import type { Methods as Methods_11d8yh9 } from './api/v1/posts/book/_bookId@string';
import type { Methods as Methods_2472sl } from './api/v1/posts/filter';
import type { Methods as Methods_1kc0w7e } from './api/v1/posts/increase-views/_postId@string';
import type { Methods as Methods_1w8n6s8 } from './api/v1/posts/like';
import type { Methods as Methods_w93l98 } from './api/v1/posts/top-liked/_count@number';
import type { Methods as Methods_pkt47z } from './api/v1/posts/top-viewed/_count@number';
import type { Methods as Methods_18rduul } from './api/v1/posts/user/_userId@string';
import type { Methods as Methods_16ysl8q } from './api/v1/trading-posts';
import type { Methods as Methods_11tp38y } from './api/v1/trading-posts/_id@string';
import type { Methods as Methods_37394b } from './api/v1/trading-posts/_tradingPostId@string';
import type { Methods as Methods_142qpja } from './api/v1/trading-posts/_tradingPostId@string/trading-requests';
import type { Methods as Methods_7iiz88 } from './api/v1/trading-posts/_tradingPostId@string/trading-requests/_tradingRequestId@string';
import type { Methods as Methods_1rm27j2 } from './api/v1/trading-posts/top';
import type { Methods as Methods_12pld7f } from './api/v1/trading-posts/v2';
import type { Methods as Methods_13ddqp1 } from './api/v1/trading-requests';
import type { Methods as Methods_r5qu0t } from './api/v1/users';
import type { Methods as Methods_lejw6y } from './api/v1/users/_userId@string';
import type { Methods as Methods_1xqu5x7 } from './api/v1/users/profile';
import type { Methods as Methods_yk6d61 } from './api/v1/users/username/_userName@string';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/api/user-subscriptions';
  const PATH1 = '/api/v1/Badge';
  const PATH2 = '/api/v1/ChatMessages/get-all-chatters-by-user-id';
  const PATH3 = '/api/v1/ChatMessages/get-chatter-by-user-id';
  const PATH4 = '/api/v1/ChatMessages/get-chatter-by-user-name';
  const PATH5 = '/api/v1/ChatMessages/get-full-conversation';
  const PATH6 = '/api/v1/Comment';
  const PATH7 = '/api/v1/Comment/like';
  const PATH8 = '/api/v1/Comment/pending-reported-comments';
  const PATH9 = '/api/v1/Comment/top-3-most-liked-comments';
  const PATH10 = '/api/v1/Comment/top-3-recent-comments';
  const PATH11 = '/api/v1/CommentReport';
  const PATH12 = '/api/v1/CommentReport/approve';
  const PATH13 = '/api/v1/CommentReport/reject';
  const PATH14 = '/api/v1/Event';
  const PATH15 = '/rewards';
  const PATH16 = '/api/v1/Event/all';
  const PATH17 = '/api/v1/Event/all-paging';
  const PATH18 = '/api/v1/Event/current';
  const PATH19 = '/api/v1/Leaderboard/rank';
  const PATH20 = '/api/v1/Leaderboard/recalculate-scores';
  const PATH21 = '/api/v1/Leaderboard/top';
  const PATH22 = '/api/v1/Leaderboard/top-by-time-range';
  const PATH23 = '/api/v1/Leaderboard/user';
  const PATH24 = '/api/v1/UserBadges/assign-badge-to-all-users';
  const PATH25 = '/api/v1/UserBadges/select-user-badge';
  const PATH26 = '/api/v1/UserBadges/set-all-badges-active';
  const PATH27 = '/api/v1/auth/login';
  const PATH28 = '/api/v1/auth/refresh-token';
  const PATH29 = '/api/v1/auth/register';
  const PATH30 = '/api/v1/books';
  const PATH31 = '/affiliate-links';
  const PATH32 = '/api/v1/books/all';
  const PATH33 = '/api/v1/books/filter';
  const PATH34 = '/api/v1/books/search';
  const PATH35 = '/api/v1/categories';
  const PATH36 = '/api/v1/categories/all';
  const PATH37 = '/api/v1/favoriteBooks/favorites';
  const PATH38 = '/api/v1/favoriteBooks/toggle';
  const PATH39 = '/api/v1/features';
  const PATH40 = '/api/v1/features/all';
  const PATH41 = '/api/v1/packages';
  const PATH42 = '/api/v1/payment/init-webhook';
  const PATH43 = '/api/v1/payment/payment-links';
  const PATH44 = '/api/v1/payment/webhook';
  const PATH45 = '/api/v1/posts';
  const PATH46 = '/api/v1/posts/book';
  const PATH47 = '/api/v1/posts/filter';
  const PATH48 = '/api/v1/posts/increase-views';
  const PATH49 = '/api/v1/posts/like';
  const PATH50 = '/api/v1/posts/top-liked';
  const PATH51 = '/api/v1/posts/top-viewed';
  const PATH52 = '/api/v1/posts/user';
  const PATH53 = '/api/v1/trading-posts';
  const PATH54 = '/trading-requests';
  const PATH55 = '/api/v1/trading-posts/top';
  const PATH56 = '/api/v1/trading-posts/v2';
  const PATH57 = '/api/v1/trading-requests';
  const PATH58 = '/api/v1/users';
  const PATH59 = '/api/v1/users/profile';
  const PATH60 = '/api/v1/users/username';
  const GET = 'GET';
  const POST = 'POST';
  const PUT = 'PUT';
  const DELETE = 'DELETE';
  const PATCH = 'PATCH';

  return {
    api: {
      user_subscriptions: {
        /**
         * @returns OK
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1r0pymj['get']['resBody'], BasicHeaders, Methods_1r0pymj['get']['status']>(prefix, PATH0, GET, option).json(),
        /**
         * @returns OK
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1r0pymj['get']['resBody'], BasicHeaders, Methods_1r0pymj['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
      v1: {
        Badge: {
          _code: (val3: string) => {
            const prefix3 = `${PATH1}/${val3}`;

            return {
              /**
               * @returns OK
               */
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_ytcegm['delete']['resBody'], BasicHeaders, Methods_ytcegm['delete']['status']>(prefix, prefix3, DELETE, option).json(),
              /**
               * @returns OK
               */
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_ytcegm['delete']['resBody'], BasicHeaders, Methods_ytcegm['delete']['status']>(prefix, prefix3, DELETE, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
          /**
           * @returns OK
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_kz5zxa['get']['resBody'], BasicHeaders, Methods_kz5zxa['get']['status']>(prefix, PATH1, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_kz5zxa['get']['resBody'], BasicHeaders, Methods_kz5zxa['get']['status']>(prefix, PATH1, GET, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods_kz5zxa['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_kz5zxa['post']['resBody'], BasicHeaders, Methods_kz5zxa['post']['status']>(prefix, PATH1, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_kz5zxa['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_kz5zxa['post']['resBody'], BasicHeaders, Methods_kz5zxa['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          put: (option: { body: Methods_kz5zxa['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_kz5zxa['put']['resBody'], BasicHeaders, Methods_kz5zxa['put']['status']>(prefix, PATH1, PUT, option).json(),
          /**
           * @returns OK
           */
          $put: (option: { body: Methods_kz5zxa['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_kz5zxa['put']['resBody'], BasicHeaders, Methods_kz5zxa['put']['status']>(prefix, PATH1, PUT, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH1}`,
        },
        ChatMessages: {
          get_all_chatters_by_user_id: {
            _id: (val4: string) => {
              const prefix4 = `${PATH2}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_17u6g9d['get']['resBody'], BasicHeaders, Methods_17u6g9d['get']['status']>(prefix, prefix4, GET, option).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_17u6g9d['get']['resBody'], BasicHeaders, Methods_17u6g9d['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          get_chatter_by_user_id: {
            _senderId: (val4: string) => {
              const prefix4 = `${PATH3}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_175qj1['get']['resBody'], BasicHeaders, Methods_175qj1['get']['status']>(prefix, prefix4, GET, option).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_175qj1['get']['resBody'], BasicHeaders, Methods_175qj1['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          get_chatter_by_user_name: {
            _senderUserName: (val4: string) => {
              const prefix4 = `${PATH4}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_d6uvu8['get']['resBody'], BasicHeaders, Methods_d6uvu8['get']['status']>(prefix, prefix4, GET, option).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_d6uvu8['get']['resBody'], BasicHeaders, Methods_d6uvu8['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          get_full_conversation: {
            _userAId: (val4: string) => {
              const prefix4 = `${PATH5}/${val4}`;

              return {
                _userBId: (val5: string) => {
                  const prefix5 = `${prefix4}/${val5}`;

                  return {
                    /**
                     * @returns OK
                     */
                    get: (option?: { config?: T | undefined } | undefined) =>
                      fetch<Methods_1fevt5v['get']['resBody'], BasicHeaders, Methods_1fevt5v['get']['status']>(prefix, prefix5, GET, option).json(),
                    /**
                     * @returns OK
                     */
                    $get: (option?: { config?: T | undefined } | undefined) =>
                      fetch<Methods_1fevt5v['get']['resBody'], BasicHeaders, Methods_1fevt5v['get']['status']>(prefix, prefix5, GET, option).json().then(r => r.body),
                    $path: () => `${prefix}${prefix5}`,
                  };
                },
              };
            },
          },
        },
        Comment: {
          _bookId: (val3: string) => {
            const prefix3 = `${PATH6}/${val3}`;

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
            const prefix3 = `${PATH6}/${val3}`;

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
              fetch<Methods_13ir33a['post']['resBody'], BasicHeaders, Methods_13ir33a['post']['status']>(prefix, PATH7, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_13ir33a['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_13ir33a['post']['resBody'], BasicHeaders, Methods_13ir33a['post']['status']>(prefix, PATH7, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH7}`,
          },
          pending_reported_comments: {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_idg5yl['get']['resBody'], BasicHeaders, Methods_idg5yl['get']['status']>(prefix, PATH8, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_idg5yl['get']['resBody'], BasicHeaders, Methods_idg5yl['get']['status']>(prefix, PATH8, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH8}`,
          },
          top_3_most_liked_comments: {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_b4lw45['get']['resBody'], BasicHeaders, Methods_b4lw45['get']['status']>(prefix, PATH9, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_b4lw45['get']['resBody'], BasicHeaders, Methods_b4lw45['get']['status']>(prefix, PATH9, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH9}`,
          },
          top_3_recent_comments: {
            _userName: (val4: string) => {
              const prefix4 = `${PATH10}/${val4}`;

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
            fetch<Methods_e8ufco['post']['resBody'], BasicHeaders, Methods_e8ufco['post']['status']>(prefix, PATH6, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_e8ufco['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_e8ufco['post']['resBody'], BasicHeaders, Methods_e8ufco['post']['status']>(prefix, PATH6, POST, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          put: (option: { body: Methods_e8ufco['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_e8ufco['put']['resBody'], BasicHeaders, Methods_e8ufco['put']['status']>(prefix, PATH6, PUT, option).json(),
          /**
           * @returns OK
           */
          $put: (option: { body: Methods_e8ufco['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_e8ufco['put']['resBody'], BasicHeaders, Methods_e8ufco['put']['status']>(prefix, PATH6, PUT, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH6}`,
        },
        CommentReport: {
          approve: {
            _commentId: (val4: string) => {
              const prefix4 = `${PATH12}/${val4}`;

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
              const prefix4 = `${PATH13}/${val4}`;

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
            fetch<Methods_8p99oi['post']['resBody'], BasicHeaders, Methods_8p99oi['post']['status']>(prefix, PATH11, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_8p99oi['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_8p99oi['post']['resBody'], BasicHeaders, Methods_8p99oi['post']['status']>(prefix, PATH11, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH11}`,
        },
        Event: {
          _eventId: (val3: string) => {
            const prefix3 = `${PATH14}/${val3}`;

            return {
              rewards: {
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_vasura['get']['resBody'], BasicHeaders, Methods_vasura['get']['status']>(prefix, `${prefix3}${PATH15}`, GET, option).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_vasura['get']['resBody'], BasicHeaders, Methods_vasura['get']['status']>(prefix, `${prefix3}${PATH15}`, GET, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH15}`,
              },
            };
          },
          _id: (val3: string) => {
            const prefix3 = `${PATH14}/${val3}`;

            return {
              /**
               * @returns OK
               */
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_1nrs6kb['delete']['resBody'], BasicHeaders, Methods_1nrs6kb['delete']['status']>(prefix, prefix3, DELETE, option).json(),
              /**
               * @returns OK
               */
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_1nrs6kb['delete']['resBody'], BasicHeaders, Methods_1nrs6kb['delete']['status']>(prefix, prefix3, DELETE, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
          all: {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_4mqld1['get']['resBody'], BasicHeaders, Methods_4mqld1['get']['status']>(prefix, PATH16, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_4mqld1['get']['resBody'], BasicHeaders, Methods_4mqld1['get']['status']>(prefix, PATH16, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH16}`,
          },
          all_paging: {
            /**
             * @returns OK
             */
            get: (option?: { query?: Methods_qj9hr8['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_qj9hr8['get']['resBody'], BasicHeaders, Methods_qj9hr8['get']['status']>(prefix, PATH17, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { query?: Methods_qj9hr8['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_qj9hr8['get']['resBody'], BasicHeaders, Methods_qj9hr8['get']['status']>(prefix, PATH17, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_qj9hr8['get']['query'] } | undefined) =>
              `${prefix}${PATH17}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          current: {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_dc508v['get']['resBody'], BasicHeaders, Methods_dc508v['get']['status']>(prefix, PATH18, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_dc508v['get']['resBody'], BasicHeaders, Methods_dc508v['get']['status']>(prefix, PATH18, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH18}`,
          },
          /**
           * @returns OK
           */
          post: (option: { body: Methods_1vez6b1['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1vez6b1['post']['resBody'], BasicHeaders, Methods_1vez6b1['post']['status']>(prefix, PATH14, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_1vez6b1['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1vez6b1['post']['resBody'], BasicHeaders, Methods_1vez6b1['post']['status']>(prefix, PATH14, POST, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          put: (option: { body: Methods_1vez6b1['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1vez6b1['put']['resBody'], BasicHeaders, Methods_1vez6b1['put']['status']>(prefix, PATH14, PUT, option).json(),
          /**
           * @returns OK
           */
          $put: (option: { body: Methods_1vez6b1['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1vez6b1['put']['resBody'], BasicHeaders, Methods_1vez6b1['put']['status']>(prefix, PATH14, PUT, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH14}`,
        },
        Leaderboard: {
          rank: {
            _eventId: (val4: string) => {
              const prefix4 = `${PATH19}/${val4}`;

              return {
                _userId: (val5: string) => {
                  const prefix5 = `${prefix4}/${val5}`;

                  return {
                    /**
                     * @returns OK
                     */
                    get: (option?: { config?: T | undefined } | undefined) =>
                      fetch<Methods_12yf79u['get']['resBody'], BasicHeaders, Methods_12yf79u['get']['status']>(prefix, prefix5, GET, option).json(),
                    /**
                     * @returns OK
                     */
                    $get: (option?: { config?: T | undefined } | undefined) =>
                      fetch<Methods_12yf79u['get']['resBody'], BasicHeaders, Methods_12yf79u['get']['status']>(prefix, prefix5, GET, option).json().then(r => r.body),
                    $path: () => `${prefix}${prefix5}`,
                  };
                },
              };
            },
          },
          recalculate_scores: {
            _eventId: (val4: string) => {
              const prefix4 = `${PATH20}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                post: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_w2o46m['post']['resBody'], BasicHeaders, Methods_w2o46m['post']['status']>(prefix, prefix4, POST, option).json(),
                /**
                 * @returns OK
                 */
                $post: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_w2o46m['post']['resBody'], BasicHeaders, Methods_w2o46m['post']['status']>(prefix, prefix4, POST, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          top: {
            _eventId: (val4: string) => {
              const prefix4 = `${PATH21}/${val4}`;

              return {
                _top: (val5: number) => {
                  const prefix5 = `${prefix4}/${val5}`;

                  return {
                    /**
                     * @returns OK
                     */
                    get: (option?: { config?: T | undefined } | undefined) =>
                      fetch<Methods_e520uw['get']['resBody'], BasicHeaders, Methods_e520uw['get']['status']>(prefix, prefix5, GET, option).json(),
                    /**
                     * @returns OK
                     */
                    $get: (option?: { config?: T | undefined } | undefined) =>
                      fetch<Methods_e520uw['get']['resBody'], BasicHeaders, Methods_e520uw['get']['status']>(prefix, prefix5, GET, option).json().then(r => r.body),
                    $path: () => `${prefix}${prefix5}`,
                  };
                },
              };
            },
          },
          top_by_time_range: {
            /**
             * @returns OK
             */
            get: (option?: { query?: Methods_s81qhi['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_s81qhi['get']['resBody'], BasicHeaders, Methods_s81qhi['get']['status']>(prefix, PATH22, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { query?: Methods_s81qhi['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_s81qhi['get']['resBody'], BasicHeaders, Methods_s81qhi['get']['status']>(prefix, PATH22, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_s81qhi['get']['query'] } | undefined) =>
              `${prefix}${PATH22}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          user: {
            _eventId: (val4: string) => {
              const prefix4 = `${PATH23}/${val4}`;

              return {
                _userId: (val5: string) => {
                  const prefix5 = `${prefix4}/${val5}`;

                  return {
                    /**
                     * @returns OK
                     */
                    get: (option?: { config?: T | undefined } | undefined) =>
                      fetch<Methods_9fncnl['get']['resBody'], BasicHeaders, Methods_9fncnl['get']['status']>(prefix, prefix5, GET, option).json(),
                    /**
                     * @returns OK
                     */
                    $get: (option?: { config?: T | undefined } | undefined) =>
                      fetch<Methods_9fncnl['get']['resBody'], BasicHeaders, Methods_9fncnl['get']['status']>(prefix, prefix5, GET, option).json().then(r => r.body),
                    $path: () => `${prefix}${prefix5}`,
                  };
                },
              };
            },
          },
        },
        UserBadges: {
          assign_badge_to_all_users: {
            /**
             * @returns OK
             */
            post: (option?: { query?: Methods_gpznh7['post']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_gpznh7['post']['resBody'], BasicHeaders, Methods_gpznh7['post']['status']>(prefix, PATH24, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option?: { query?: Methods_gpznh7['post']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_gpznh7['post']['resBody'], BasicHeaders, Methods_gpznh7['post']['status']>(prefix, PATH24, POST, option).json().then(r => r.body),
            $path: (option?: { method: 'post'; query: Methods_gpznh7['post']['query'] } | undefined) =>
              `${prefix}${PATH24}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          select_user_badge: {
            /**
             * @returns OK
             */
            post: (option?: { query?: Methods_zuqg05['post']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_zuqg05['post']['resBody'], BasicHeaders, Methods_zuqg05['post']['status']>(prefix, PATH25, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option?: { query?: Methods_zuqg05['post']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_zuqg05['post']['resBody'], BasicHeaders, Methods_zuqg05['post']['status']>(prefix, PATH25, POST, option).json().then(r => r.body),
            $path: (option?: { method: 'post'; query: Methods_zuqg05['post']['query'] } | undefined) =>
              `${prefix}${PATH25}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          set_all_badges_active: {
            /**
             * @returns OK
             */
            post: (option?: { query?: Methods_b7a7g9['post']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_b7a7g9['post']['resBody'], BasicHeaders, Methods_b7a7g9['post']['status']>(prefix, PATH26, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option?: { query?: Methods_b7a7g9['post']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_b7a7g9['post']['resBody'], BasicHeaders, Methods_b7a7g9['post']['status']>(prefix, PATH26, POST, option).json().then(r => r.body),
            $path: (option?: { method: 'post'; query: Methods_b7a7g9['post']['query'] } | undefined) =>
              `${prefix}${PATH26}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
        },
        auth: {
          login: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_9wu66v['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_9wu66v['post']['resBody'], BasicHeaders, Methods_9wu66v['post']['status']>(prefix, PATH27, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_9wu66v['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_9wu66v['post']['resBody'], BasicHeaders, Methods_9wu66v['post']['status']>(prefix, PATH27, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH27}`,
          },
          refresh_token: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_1eq60rt['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1eq60rt['post']['resBody'], BasicHeaders, Methods_1eq60rt['post']['status']>(prefix, PATH28, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_1eq60rt['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1eq60rt['post']['resBody'], BasicHeaders, Methods_1eq60rt['post']['status']>(prefix, PATH28, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH28}`,
          },
          register: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_1p8w04r['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1p8w04r['post']['resBody'], BasicHeaders, Methods_1p8w04r['post']['status']>(prefix, PATH29, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_1p8w04r['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1p8w04r['post']['resBody'], BasicHeaders, Methods_1p8w04r['post']['status']>(prefix, PATH29, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH29}`,
          },
        },
        books: {
          _bookId: (val3: string) => {
            const prefix3 = `${PATH30}/${val3}`;

            return {
              affiliate_links: {
                /**
                 * @returns OK
                 */
                post: (option: { body: Methods_1m0b8n6['post']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods_1m0b8n6['post']['resBody'], BasicHeaders, Methods_1m0b8n6['post']['status']>(prefix, `${prefix3}${PATH31}`, POST, option).json(),
                /**
                 * @returns OK
                 */
                $post: (option: { body: Methods_1m0b8n6['post']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods_1m0b8n6['post']['resBody'], BasicHeaders, Methods_1m0b8n6['post']['status']>(prefix, `${prefix3}${PATH31}`, POST, option).json().then(r => r.body),
                /**
                 * @returns OK
                 */
                put: (option: { body: Methods_1m0b8n6['put']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods_1m0b8n6['put']['resBody'], BasicHeaders, Methods_1m0b8n6['put']['status']>(prefix, `${prefix3}${PATH31}`, PUT, option).json(),
                /**
                 * @returns OK
                 */
                $put: (option: { body: Methods_1m0b8n6['put']['reqBody'], config?: T | undefined }) =>
                  fetch<Methods_1m0b8n6['put']['resBody'], BasicHeaders, Methods_1m0b8n6['put']['status']>(prefix, `${prefix3}${PATH31}`, PUT, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH31}`,
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
            const prefix3 = `${PATH30}/${val3}`;

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
          all: {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_2ssmp3['get']['resBody'], BasicHeaders, Methods_2ssmp3['get']['status']>(prefix, PATH32, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_2ssmp3['get']['resBody'], BasicHeaders, Methods_2ssmp3['get']['status']>(prefix, PATH32, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH32}`,
          },
          filter: {
            /**
             * @returns OK
             */
            get: (option?: { query?: Methods_etv2da['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_etv2da['get']['resBody'], BasicHeaders, Methods_etv2da['get']['status']>(prefix, PATH33, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { query?: Methods_etv2da['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_etv2da['get']['resBody'], BasicHeaders, Methods_etv2da['get']['status']>(prefix, PATH33, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_etv2da['get']['query'] } | undefined) =>
              `${prefix}${PATH33}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          search: {
            /**
             * @returns OK
             */
            get: (option?: { query?: Methods_cyey74['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_cyey74['get']['resBody'], BasicHeaders, Methods_cyey74['get']['status']>(prefix, PATH34, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { query?: Methods_cyey74['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_cyey74['get']['resBody'], BasicHeaders, Methods_cyey74['get']['status']>(prefix, PATH34, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_cyey74['get']['query'] } | undefined) =>
              `${prefix}${PATH34}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_1jq8r4r['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_1jq8r4r['get']['resBody'], BasicHeaders, Methods_1jq8r4r['get']['status']>(prefix, PATH30, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { query?: Methods_1jq8r4r['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_1jq8r4r['get']['resBody'], BasicHeaders, Methods_1jq8r4r['get']['status']>(prefix, PATH30, GET, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods_1jq8r4r['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1jq8r4r['post']['resBody'], BasicHeaders, Methods_1jq8r4r['post']['status']>(prefix, PATH30, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_1jq8r4r['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_1jq8r4r['post']['resBody'], BasicHeaders, Methods_1jq8r4r['post']['status']>(prefix, PATH30, POST, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_1jq8r4r['get']['query'] } | undefined) =>
            `${prefix}${PATH30}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        categories: {
          all: {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_4nql1b['get']['resBody'], BasicHeaders, Methods_4nql1b['get']['status']>(prefix, PATH36, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_4nql1b['get']['resBody'], BasicHeaders, Methods_4nql1b['get']['status']>(prefix, PATH36, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH36}`,
          },
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_3uzp0j['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_3uzp0j['get']['resBody'], BasicHeaders, Methods_3uzp0j['get']['status']>(prefix, PATH35, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { query?: Methods_3uzp0j['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_3uzp0j['get']['resBody'], BasicHeaders, Methods_3uzp0j['get']['status']>(prefix, PATH35, GET, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods_3uzp0j['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_3uzp0j['post']['resBody'], BasicHeaders, Methods_3uzp0j['post']['status']>(prefix, PATH35, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_3uzp0j['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_3uzp0j['post']['resBody'], BasicHeaders, Methods_3uzp0j['post']['status']>(prefix, PATH35, POST, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          put: (option: { body: Methods_3uzp0j['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_3uzp0j['put']['resBody'], BasicHeaders, Methods_3uzp0j['put']['status']>(prefix, PATH35, PUT, option).json(),
          /**
           * @returns OK
           */
          $put: (option: { body: Methods_3uzp0j['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_3uzp0j['put']['resBody'], BasicHeaders, Methods_3uzp0j['put']['status']>(prefix, PATH35, PUT, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_3uzp0j['get']['query'] } | undefined) =>
            `${prefix}${PATH35}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        favoriteBooks: {
          favorites: {
            _userId: (val4: string) => {
              const prefix4 = `${PATH37}/${val4}`;

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
              fetch<Methods_fan7fs['post']['resBody'], BasicHeaders, Methods_fan7fs['post']['status']>(prefix, PATH38, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_fan7fs['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_fan7fs['post']['resBody'], BasicHeaders, Methods_fan7fs['post']['status']>(prefix, PATH38, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH38}`,
          },
        },
        features: {
          _id: (val3: string) => {
            const prefix3 = `${PATH39}/${val3}`;

            return {
              /**
               * @returns OK
               */
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_e3tpjw['delete']['resBody'], BasicHeaders, Methods_e3tpjw['delete']['status']>(prefix, prefix3, DELETE, option).json(),
              /**
               * @returns OK
               */
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_e3tpjw['delete']['resBody'], BasicHeaders, Methods_e3tpjw['delete']['status']>(prefix, prefix3, DELETE, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
          all: {
            /**
             * @returns OK
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1alr8do['get']['resBody'], BasicHeaders, Methods_1alr8do['get']['status']>(prefix, PATH40, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1alr8do['get']['resBody'], BasicHeaders, Methods_1alr8do['get']['status']>(prefix, PATH40, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH40}`,
          },
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_bxzk2o['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_bxzk2o['get']['resBody'], BasicHeaders, Methods_bxzk2o['get']['status']>(prefix, PATH39, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { query?: Methods_bxzk2o['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_bxzk2o['get']['resBody'], BasicHeaders, Methods_bxzk2o['get']['status']>(prefix, PATH39, GET, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods_bxzk2o['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_bxzk2o['post']['resBody'], BasicHeaders, Methods_bxzk2o['post']['status']>(prefix, PATH39, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_bxzk2o['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_bxzk2o['post']['resBody'], BasicHeaders, Methods_bxzk2o['post']['status']>(prefix, PATH39, POST, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_bxzk2o['get']['query'] } | undefined) =>
            `${prefix}${PATH39}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        packages: {
          _id: (val3: string) => {
            const prefix3 = `${PATH41}/${val3}`;

            return {
              /**
               * @returns OK
               */
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_1bd4y0a['delete']['resBody'], BasicHeaders, Methods_1bd4y0a['delete']['status']>(prefix, prefix3, DELETE, option).json(),
              /**
               * @returns OK
               */
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_1bd4y0a['delete']['resBody'], BasicHeaders, Methods_1bd4y0a['delete']['status']>(prefix, prefix3, DELETE, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_18onvqa['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_18onvqa['get']['resBody'], BasicHeaders, Methods_18onvqa['get']['status']>(prefix, PATH41, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { query?: Methods_18onvqa['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_18onvqa['get']['resBody'], BasicHeaders, Methods_18onvqa['get']['status']>(prefix, PATH41, GET, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods_18onvqa['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_18onvqa['post']['resBody'], BasicHeaders, Methods_18onvqa['post']['status']>(prefix, PATH41, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_18onvqa['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_18onvqa['post']['resBody'], BasicHeaders, Methods_18onvqa['post']['status']>(prefix, PATH41, POST, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_18onvqa['get']['query'] } | undefined) =>
            `${prefix}${PATH41}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        payment: {
          init_webhook: {
            post: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods_1tulz1e['post']['status']>(prefix, PATH42, POST, option).send(),
            $post: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods_1tulz1e['post']['status']>(prefix, PATH42, POST, option).send().then(r => r.body),
            $path: () => `${prefix}${PATH42}`,
          },
          payment_links: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_za6i4m['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_za6i4m['post']['resBody'], BasicHeaders, Methods_za6i4m['post']['status']>(prefix, PATH43, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_za6i4m['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_za6i4m['post']['resBody'], BasicHeaders, Methods_za6i4m['post']['status']>(prefix, PATH43, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH43}`,
          },
          webhook: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_1ol7w11['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1ol7w11['post']['resBody'], BasicHeaders, Methods_1ol7w11['post']['status']>(prefix, PATH44, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_1ol7w11['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1ol7w11['post']['resBody'], BasicHeaders, Methods_1ol7w11['post']['status']>(prefix, PATH44, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH44}`,
          },
        },
        posts: {
          _postId: (val3: string) => {
            const prefix3 = `${PATH45}/${val3}`;

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
              /**
               * @returns OK
               */
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_17xendo['delete']['resBody'], BasicHeaders, Methods_17xendo['delete']['status']>(prefix, prefix3, DELETE, option).json(),
              /**
               * @returns OK
               */
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_17xendo['delete']['resBody'], BasicHeaders, Methods_17xendo['delete']['status']>(prefix, prefix3, DELETE, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
          book: {
            _bookId: (val4: string) => {
              const prefix4 = `${PATH46}/${val4}`;

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
          filter: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_2472sl['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_2472sl['post']['resBody'], BasicHeaders, Methods_2472sl['post']['status']>(prefix, PATH47, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_2472sl['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_2472sl['post']['resBody'], BasicHeaders, Methods_2472sl['post']['status']>(prefix, PATH47, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH47}`,
          },
          increase_views: {
            _postId: (val4: string) => {
              const prefix4 = `${PATH48}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                post: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_1kc0w7e['post']['resBody'], BasicHeaders, Methods_1kc0w7e['post']['status']>(prefix, prefix4, POST, option).json(),
                /**
                 * @returns OK
                 */
                $post: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_1kc0w7e['post']['resBody'], BasicHeaders, Methods_1kc0w7e['post']['status']>(prefix, prefix4, POST, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix4}`,
              };
            },
          },
          like: {
            /**
             * @returns OK
             */
            post: (option: { body: Methods_1w8n6s8['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1w8n6s8['post']['resBody'], BasicHeaders, Methods_1w8n6s8['post']['status']>(prefix, PATH49, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_1w8n6s8['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1w8n6s8['post']['resBody'], BasicHeaders, Methods_1w8n6s8['post']['status']>(prefix, PATH49, POST, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH49}`,
          },
          top_liked: {
            _count: (val4: number) => {
              const prefix4 = `${PATH50}/${val4}`;

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
              const prefix4 = `${PATH51}/${val4}`;

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
              const prefix4 = `${PATH52}/${val4}`;

              return {
                /**
                 * @returns OK
                 */
                get: (option?: { query?: Methods_18rduul['get']['query'] | undefined, config?: T | undefined } | undefined) =>
                  fetch<Methods_18rduul['get']['resBody'], BasicHeaders, Methods_18rduul['get']['status']>(prefix, prefix4, GET, option).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { query?: Methods_18rduul['get']['query'] | undefined, config?: T | undefined } | undefined) =>
                  fetch<Methods_18rduul['get']['resBody'], BasicHeaders, Methods_18rduul['get']['status']>(prefix, prefix4, GET, option).json().then(r => r.body),
                $path: (option?: { method?: 'get' | undefined; query: Methods_18rduul['get']['query'] } | undefined) =>
                  `${prefix}${prefix4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
              };
            },
          },
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_xu0xli['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_xu0xli['get']['resBody'], BasicHeaders, Methods_xu0xli['get']['status']>(prefix, PATH45, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { query?: Methods_xu0xli['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_xu0xli['get']['resBody'], BasicHeaders, Methods_xu0xli['get']['status']>(prefix, PATH45, GET, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods_xu0xli['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_xu0xli['post']['resBody'], BasicHeaders, Methods_xu0xli['post']['status']>(prefix, PATH45, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_xu0xli['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_xu0xli['post']['resBody'], BasicHeaders, Methods_xu0xli['post']['status']>(prefix, PATH45, POST, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          put: (option: { body: Methods_xu0xli['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_xu0xli['put']['resBody'], BasicHeaders, Methods_xu0xli['put']['status']>(prefix, PATH45, PUT, option).json(),
          /**
           * @returns OK
           */
          $put: (option: { body: Methods_xu0xli['put']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_xu0xli['put']['resBody'], BasicHeaders, Methods_xu0xli['put']['status']>(prefix, PATH45, PUT, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_xu0xli['get']['query'] } | undefined) =>
            `${prefix}${PATH45}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        trading_posts: {
          _id: (val3: string) => {
            const prefix3 = `${PATH53}/${val3}`;

            return {
              /**
               * @returns OK
               */
              delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_11tp38y['delete']['resBody'], BasicHeaders, Methods_11tp38y['delete']['status']>(prefix, prefix3, DELETE, option).json(),
              /**
               * @returns OK
               */
              $delete: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_11tp38y['delete']['resBody'], BasicHeaders, Methods_11tp38y['delete']['status']>(prefix, prefix3, DELETE, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
          _tradingPostId: (val3: string) => {
            const prefix3 = `${PATH53}/${val3}`;

            return {
              trading_requests: {
                _tradingRequestId: (val5: string) => {
                  const prefix5 = `${prefix3}${PATH54}/${val5}`;

                  return {
                    /**
                     * @returns OK
                     */
                    patch: (option: { body: Methods_7iiz88['patch']['reqBody'], config?: T | undefined }) =>
                      fetch<Methods_7iiz88['patch']['resBody'], BasicHeaders, Methods_7iiz88['patch']['status']>(prefix, prefix5, PATCH, option).json(),
                    /**
                     * @returns OK
                     */
                    $patch: (option: { body: Methods_7iiz88['patch']['reqBody'], config?: T | undefined }) =>
                      fetch<Methods_7iiz88['patch']['resBody'], BasicHeaders, Methods_7iiz88['patch']['status']>(prefix, prefix5, PATCH, option).json().then(r => r.body),
                    $path: () => `${prefix}${prefix5}`,
                  };
                },
                /**
                 * @returns OK
                 */
                get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_142qpja['get']['resBody'], BasicHeaders, Methods_142qpja['get']['status']>(prefix, `${prefix3}${PATH54}`, GET, option).json(),
                /**
                 * @returns OK
                 */
                $get: (option?: { config?: T | undefined } | undefined) =>
                  fetch<Methods_142qpja['get']['resBody'], BasicHeaders, Methods_142qpja['get']['status']>(prefix, `${prefix3}${PATH54}`, GET, option).json().then(r => r.body),
                $path: () => `${prefix}${prefix3}${PATH54}`,
              },
              /**
               * @returns OK
               */
              put: (option: { body: Methods_37394b['put']['reqBody'], config?: T | undefined }) =>
                fetch<Methods_37394b['put']['resBody'], BasicHeaders, Methods_37394b['put']['status']>(prefix, prefix3, PUT, option).json(),
              /**
               * @returns OK
               */
              $put: (option: { body: Methods_37394b['put']['reqBody'], config?: T | undefined }) =>
                fetch<Methods_37394b['put']['resBody'], BasicHeaders, Methods_37394b['put']['status']>(prefix, prefix3, PUT, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix3}`,
            };
          },
          top: {
            /**
             * @returns OK
             */
            get: (option?: { query?: Methods_1rm27j2['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_1rm27j2['get']['resBody'], BasicHeaders, Methods_1rm27j2['get']['status']>(prefix, PATH55, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { query?: Methods_1rm27j2['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_1rm27j2['get']['resBody'], BasicHeaders, Methods_1rm27j2['get']['status']>(prefix, PATH55, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_1rm27j2['get']['query'] } | undefined) =>
              `${prefix}${PATH55}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          v2: {
            /**
             * @returns OK
             */
            get: (option?: { query?: Methods_12pld7f['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_12pld7f['get']['resBody'], BasicHeaders, Methods_12pld7f['get']['status']>(prefix, PATH56, GET, option).json(),
            /**
             * @returns OK
             */
            $get: (option?: { query?: Methods_12pld7f['get']['query'] | undefined, config?: T | undefined } | undefined) =>
              fetch<Methods_12pld7f['get']['resBody'], BasicHeaders, Methods_12pld7f['get']['status']>(prefix, PATH56, GET, option).json().then(r => r.body),
            /**
             * @returns OK
             */
            post: (option: { body: Methods_12pld7f['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_12pld7f['post']['resBody'], BasicHeaders, Methods_12pld7f['post']['status']>(prefix, PATH56, POST, option).json(),
            /**
             * @returns OK
             */
            $post: (option: { body: Methods_12pld7f['post']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_12pld7f['post']['resBody'], BasicHeaders, Methods_12pld7f['post']['status']>(prefix, PATH56, POST, option).json().then(r => r.body),
            $path: (option?: { method?: 'get' | undefined; query: Methods_12pld7f['get']['query'] } | undefined) =>
              `${prefix}${PATH56}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
          },
          /**
           * @returns OK
           */
          get: (option?: { query?: Methods_16ysl8q['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_16ysl8q['get']['resBody'], BasicHeaders, Methods_16ysl8q['get']['status']>(prefix, PATH53, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { query?: Methods_16ysl8q['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_16ysl8q['get']['resBody'], BasicHeaders, Methods_16ysl8q['get']['status']>(prefix, PATH53, GET, option).json().then(r => r.body),
          /**
           * @returns OK
           */
          post: (option: { body: Methods_16ysl8q['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_16ysl8q['post']['resBody'], BasicHeaders, Methods_16ysl8q['post']['status']>(prefix, PATH53, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_16ysl8q['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_16ysl8q['post']['resBody'], BasicHeaders, Methods_16ysl8q['post']['status']>(prefix, PATH53, POST, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_16ysl8q['get']['query'] } | undefined) =>
            `${prefix}${PATH53}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
        trading_requests: {
          /**
           * @returns OK
           */
          post: (option: { body: Methods_13ddqp1['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_13ddqp1['post']['resBody'], BasicHeaders, Methods_13ddqp1['post']['status']>(prefix, PATH57, POST, option).json(),
          /**
           * @returns OK
           */
          $post: (option: { body: Methods_13ddqp1['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_13ddqp1['post']['resBody'], BasicHeaders, Methods_13ddqp1['post']['status']>(prefix, PATH57, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH57}`,
        },
        users: {
          _userId: (val3: string) => {
            const prefix3 = `${PATH58}/${val3}`;

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
              fetch<Methods_1xqu5x7['put']['resBody'], BasicHeaders, Methods_1xqu5x7['put']['status']>(prefix, PATH59, PUT, option).json(),
            /**
             * @returns OK
             */
            $put: (option: { body: Methods_1xqu5x7['put']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_1xqu5x7['put']['resBody'], BasicHeaders, Methods_1xqu5x7['put']['status']>(prefix, PATH59, PUT, option).json().then(r => r.body),
            $path: () => `${prefix}${PATH59}`,
          },
          username: {
            _userName: (val4: string) => {
              const prefix4 = `${PATH60}/${val4}`;

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
            fetch<Methods_r5qu0t['get']['resBody'], BasicHeaders, Methods_r5qu0t['get']['status']>(prefix, PATH58, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { query?: Methods_r5qu0t['get']['query'] | undefined, config?: T | undefined } | undefined) =>
            fetch<Methods_r5qu0t['get']['resBody'], BasicHeaders, Methods_r5qu0t['get']['status']>(prefix, PATH58, GET, option).json().then(r => r.body),
          $path: (option?: { method?: 'get' | undefined; query: Methods_r5qu0t['get']['query'] } | undefined) =>
            `${prefix}${PATH58}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
        },
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
