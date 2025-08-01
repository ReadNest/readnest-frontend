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
    resBody: Types.GetFeatureResponsePagingResponseApiResponse;
  };

  post: {
    status: 200;
    /** OK */
    resBody: Types.StringApiResponse;
    reqBody: Types.CreateFeatureRequest;
  };
}>;
