import type { PayloadAction } from "@reduxjs/toolkit";

import { call, put, takeLatest } from "redux-saga/effects";
import client from "@/lib/api/axiosClient";
import { setDetailErrors, setMessage } from "@/store/error/errorSlice";
import { createAffiliateStart, setLoading, setSuccess } from "./affiliateSlice";
import type {
  AffiliateLinkRequest,
  CreateAffiliateLinkRequest,
  StringApiResponse,
} from "@/api/@types";

function* handleCreateAffiliate(
  action: PayloadAction<{
    bookId: string;
    affiliateLinks: AffiliateLinkRequest[];
  }>
) {
  try {
    yield put(setLoading(true));

    const requestBody: CreateAffiliateLinkRequest = {
      affiliateLinkRequests: action.payload.affiliateLinks,
    };

    const res: StringApiResponse = yield call(() =>
      client.api.v1.books._bookId(action.payload.bookId).affiliate_links.$post({
        body: requestBody,
      })
    );

    yield put(
      setMessage({ message: res.message ?? "", messageId: res.messageId ?? "" })
    );

    if (res.success) {
      yield put(setSuccess(true));
    } else {
      yield put(setSuccess(false));
      yield put(setDetailErrors(res.listDetailError ?? []));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errBody = error?.response.data || {};
    yield put(
      setMessage({
        message: errBody.message ?? "",
        messageId: errBody.messageId ?? "",
      })
    );
    yield put(setDetailErrors(errBody.listDetailError ?? []));
  } finally {
    yield put(setLoading(false));
  }
}

export default function* affiliateSaga() {
  yield takeLatest(createAffiliateStart.type, handleCreateAffiliate);
}
