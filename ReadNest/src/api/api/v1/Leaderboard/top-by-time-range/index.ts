/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../../../@types';

export type Methods = DefineMethods<{
  get: {
    query?: {
      from?: string | undefined;
      to?: string | undefined;
      top?: number | undefined;
    } | undefined;

    status: 200;
    /** OK */
    resBody: Types.LeaderboardResponseIEnumerableApiResponse;
  };
}>;
