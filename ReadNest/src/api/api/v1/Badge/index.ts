/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../../@types';

export type Methods = DefineMethods<{
  get: {
    status: 200;
    /** OK */
    resBody: Types.GetBadgeResponseApiResponse;
  };

  post: {
    status: 200;
    /** OK */
    resBody: Types.CreateBadgeResponseApiResponse;
    reqBody: Types.CreateBadgeRequest;
  };

  put: {
    status: 200;
    /** OK */
    resBody: Types.StringApiResponse;
    reqBody: Types.UpdateBadgeRequest;
  };
}>;
