/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../../../@types';

export type Methods = DefineMethods<{
  post: {
    query?: {
      userId?: string | undefined;
      badgeId?: string | undefined;
    } | undefined;

    status: 200;
    /** OK */
    resBody: Types.StringApiResponse;
  };
}>;
