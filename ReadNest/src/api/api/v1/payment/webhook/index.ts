/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../../../@types';

export type Methods = DefineMethods<{
  post: {
    status: 200;
    /** OK */
    resBody: Types.StringApiResponse;
    reqBody: Types.WebhookType;
  };
}>;
