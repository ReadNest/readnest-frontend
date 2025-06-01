/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../../@types';

export type Methods = DefineMethods<{
  post: {
    status: 200;
    /** OK */
    resBody: Types.GetCommentResponseApiResponse;
    reqBody: Types.CreateCommentRequest;
  };

  put: {
    status: 200;
    /** OK */
    resBody: Types.StringApiResponse;
    reqBody: Types.UpdateCommentRequest;
  };
}>;
