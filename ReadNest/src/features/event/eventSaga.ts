import type {
    CreateEventRequest,
    UpdateEventRequest,
    EventResponseApiResponse,
    EventResponseIEnumerableApiResponse,
  } from "@/api/@types";
  import type { PayloadAction } from "@reduxjs/toolkit";
  import {
    createEventStart,
    updateEventStart,
    deleteEventStart,
    fetchEventsStart,
    setLoading,
    setSuccess,
    setEvents,
    addEvent,
    updateEventInList,
    removeEventFromList,
    setCurrentEvent,
    fetchCurrentEventStart,
  } from "./eventSlice";
  import { call, put, takeLatest } from "redux-saga/effects";
  import client from "@/lib/api/axiosClient";
  import { toast } from "react-toastify";
  import { setMessage, setDetailErrors } from "@/store/error/errorSlice";
  
  function* handleCreateEvent(action: PayloadAction<CreateEventRequest>) {
    try {
      yield put(setLoading(true));
      const res: EventResponseApiResponse = yield call(() =>
        client.api.v1.Event.post({ body: action.payload }).then((r) => r.body)
      );
  
      if (res.success && res.data) {
        yield put(addEvent(res.data));
        yield put(setSuccess(true));
        toast.success("Tạo sự kiện thành công!");
      } else {
        yield put(setSuccess(false));
        yield put(setDetailErrors(res.listDetailError ?? []));
        toast.error(res.message);
      }
    } catch (error: any) {
      yield put(
        setMessage({
          message: error?.response?.data?.message ?? "Có lỗi xảy ra",
          messageId: error?.response?.data?.messageId ?? "",
        })
      );
      yield put(setDetailErrors(error?.response?.data?.listDetailError ?? []));
    } finally {
      yield put(setLoading(false));
    }
  }
  
  function* handleUpdateEvent(action: PayloadAction<UpdateEventRequest>) {
    try {
      yield put(setLoading(true));
      const res: EventResponseApiResponse = yield call(() =>
        client.api.v1.Event.put({ body: action.payload }).then((r) => r.body)
      );
  
      if (res.success && res.data) {
        yield put(updateEventInList(res.data));
        yield put(setSuccess(true));
        toast.success("Cập nhật sự kiện thành công!");
      } else {
        yield put(setSuccess(false));
        yield put(setDetailErrors(res.listDetailError ?? []));
        toast.error(res.message);
      }
    } catch (error: any) {
      yield put(
        setMessage({
          message: error?.response?.data?.message ?? "Có lỗi xảy ra",
          messageId: error?.response?.data?.messageId ?? "",
        })
      );
      yield put(setDetailErrors(error?.response?.data?.listDetailError ?? []));
    } finally {
      yield put(setLoading(false));
    }
  }
  
  function* handleDeleteEvent(action: PayloadAction<string>) {
    try {
      yield put(setLoading(true));
      const res: EventResponseApiResponse = yield call(() =>
        client.api.v1.Event._id(action.payload).delete().then((r) => r.body)
      );
  
      if (res.success) {
        yield put(removeEventFromList(action.payload));
        yield put(setSuccess(true));
        toast.success("Xoá sự kiện thành công!");
      } else {
        yield put(setSuccess(false));
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error("Xảy ra lỗi khi xoá sự kiện");
    } finally {
      yield put(setLoading(false));
    }
  }
  
  function* fetchEvents() {
    try {
      yield put(setLoading(true));
      const res: EventResponseIEnumerableApiResponse = yield call(() =>
        client.api.v1.Event.all.get().then((r) => r.body)
      );
  
      if (res.success && res.data) {
        yield put(setEvents(res.data));
        yield put(setSuccess(true));
      } else {
        yield put(setSuccess(false));
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      yield put(setLoading(false));
    }
  }

  function* handleFetchCurrentEvent() {
    try {
      yield put(setLoading(true));
      const res: EventResponseApiResponse = yield call(() =>
        client.api.v1.Event.current.get().then((r) => r.body)
      );
      if (res.success && res.data) {
        yield put(setCurrentEvent(res.data));
        yield put(setSuccess(true));
      } else {
        toast.error(res.message);
        yield put(setSuccess(false));
      }
    } catch (error: any) {
      toast.error("Lỗi khi lấy sự kiện hiện tại");
    } finally {
      yield put(setLoading(false));
    }
  }
  
  export default function* eventSaga() {
    yield takeLatest(createEventStart.type, handleCreateEvent);
    yield takeLatest(updateEventStart.type, handleUpdateEvent);
    yield takeLatest(deleteEventStart.type, handleDeleteEvent);
    yield takeLatest(fetchEventsStart.type, fetchEvents);
    yield takeLatest(fetchCurrentEventStart.type, handleFetchCurrentEvent);
  }
  