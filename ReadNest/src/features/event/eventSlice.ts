import type {
    CreateEventRequest,
    UpdateEventRequest,
    EventResponse,
  } from "@/api/@types";
import type { PagingRequest } from "@/lib/api/base/types";
  import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
  
  export const initialState: {
    isSuccess: boolean;
    loading: boolean;
    events: EventResponse[];
    currentEvent: EventResponse | null;
    pagingInfo: {
        totalItems?: number;
        pageIndex?: number;
        pageSize?: number;
      };
  } = {
    isSuccess: false,
    loading: false,
    events: [],
    currentEvent: null,
    pagingInfo: {
        totalItems: 0,
        pageIndex: 1,
        pageSize: 10,
      },
  };
  
  const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
      createEventStart: (_state, _action: PayloadAction<CreateEventRequest>) => {},
      updateEventStart: (_state, _action: PayloadAction<UpdateEventRequest>) => {},
      deleteEventStart: (_state, _action: PayloadAction<string>) => {},
      fetchEventsStart: (_state) => {},
      fetchCurrentEventStart: () => {},
      fetchPagedEventsStart: (_state, _action: PayloadAction<PagingRequest>) => {},

      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
      setSuccess: (state, action: PayloadAction<boolean>) => {
        state.isSuccess = action.payload;
      },
      setEvents: (state, action: PayloadAction<EventResponse[]>) => {
        state.events = action.payload;
      },
      setCurrentEvent: (state, action: PayloadAction<EventResponse>) => {
        state.currentEvent = action.payload;
      },
      setSelectedEventId(state, action: PayloadAction<string>) {
        const event = state.events.find(e => e.id === action.payload);
        if (event) {
          state.currentEvent = event;
        }
      },
      setPagingInfo: (
        state,
        action: PayloadAction<{
          totalItems?: number;
          pageIndex?: number;
          pageSize?: number;
        }>
      ) => {
        state.pagingInfo = action.payload;
      },

      addEvent: (state, action: PayloadAction<EventResponse>) => {
        state.events.unshift(action.payload);
      },
      updateEventInList: (state, action: PayloadAction<EventResponse>) => {
        const index = state.events.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      },
      removeEventFromList: (state, action: PayloadAction<string>) => {
        state.events = state.events.filter((e) => e.id !== action.payload);
      },
      resetEventState: (state) => {
        Object.assign(state, initialState);
      },
    },
  });
  
  export const {
    createEventStart,
    updateEventStart,
    deleteEventStart,
    fetchEventsStart,
    fetchCurrentEventStart,
    fetchPagedEventsStart,
    setLoading,
    setSuccess,
    setEvents,
    setCurrentEvent,
    setSelectedEventId,
    setPagingInfo,
    addEvent,
    updateEventInList,
    removeEventFromList,
    resetEventState,
  } = eventSlice.actions;
  
  export default eventSlice.reducer;
  