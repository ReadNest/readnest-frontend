/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../../@types';

export type Methods = DefineMethods<{
  get: {
    query?: {
      PageIndex?: number | undefined;
      PageSize?: number | undefined;
    } | undefined;

    status: 200;
    /** OK */
    resBody: Types.GetPostResponsePagingResponseApiResponse;
  };

  post: {
    status: 200;
    /** OK */
    resBody: Types.GetPostResponseApiResponse;
    reqBody: Types.CreatePostRequest;
  };

  put: {
    status: 200;
    /** OK */
    resBody: Types.GetPostResponseApiResponse;
    reqBody: Types.UpdatePostRequest;
  };
}>;
