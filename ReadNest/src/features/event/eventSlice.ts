import type {
    CreateEventRequest,
    UpdateEventRequest,
    EventResponse,
  } from "@/api/@types";
  import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
  
  export const initialState: {
    isSuccess: boolean;
    loading: boolean;
    events: EventResponse[];
    currentEvent: EventResponse | null;
  } = {
    isSuccess: false,
    loading: false,
    events: [],
    currentEvent: null,
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
    setLoading,
    setSuccess,
    setEvents,
    setCurrentEvent,
    setSelectedEventId,
    addEvent,
    updateEventInList,
    removeEventFromList,
    resetEventState,
  } = eventSlice.actions;
  
  export default eventSlice.reducer;
  