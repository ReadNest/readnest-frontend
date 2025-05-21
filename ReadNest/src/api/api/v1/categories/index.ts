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
    resBody: Types.GetCategoryResponsePagingResponseApiResponse;
  };

  post: {
    status: 200;
    /** OK */
    resBody: Types.GetCategoryResponseApiResponse;
    reqBody: Types.CreateCategoryRequest;
  };

  put: {
    status: 200;
    /** OK */
    resBody: Types.GetCategoryResponseApiResponse;
    reqBody: Types.UpdateCategoryRequest;
  };
}>;
