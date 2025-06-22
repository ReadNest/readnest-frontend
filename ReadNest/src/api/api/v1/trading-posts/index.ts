/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../../@types';

export type Methods = DefineMethods<{
  get: {
    query?: {
      UserId?: string | undefined;
      PageIndex?: number | undefined;
      PageSize?: number | undefined;
    } | undefined;

    status: 200;
    /** OK */
    resBody: Types.GetBookTradingPostResponsePagingResponseApiResponse;
  };

  post: {
    status: 200;
    /** OK */
    resBody: Types.StringApiResponse;
    reqBody: Types.CreateTradingPostRequest;
  };
}>;
