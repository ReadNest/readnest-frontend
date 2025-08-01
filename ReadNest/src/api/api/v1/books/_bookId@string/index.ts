/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../../../@types';

export type Methods = DefineMethods<{
  get: {
    status: 200;
    /** OK */
    resBody: Types.GetBookResponseApiResponse;
  };

  put: {
    status: 200;
    /** OK */
    resBody: Types.GetBookResponseApiResponse;
    reqBody: Types.UpdateBookRequest;
  };
}>;
