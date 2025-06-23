/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../../@types';

export type Methods = DefineMethods<{
  post: {
    status: 200;
    /** OK */
    resBody: Types.EventResponseApiResponse;
    reqBody: Types.CreateEventRequest;
  };

  put: {
    status: 200;
    /** OK */
    resBody: Types.EventResponseApiResponse;
    reqBody: Types.UpdateEventRequest;
  };
}>;
