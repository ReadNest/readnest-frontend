import type { ChatMessageCacheModel, RecentChatterResponse } from "@/api/@types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
    isLoading: boolean;
    isLoadingOldMessages: boolean;
    recentChatters: RecentChatterResponse[];
    oldMessagesHistory: ChatMessageCacheModel[];
} = {
    isLoading: false,
    isLoadingOldMessages: false,
    recentChatters: [],
    oldMessagesHistory: [],
};

const chatMessageSlice = createSlice({
    name: "chatMessage",
    initialState,
    reducers: {
        // Action to request fetching recent chatters
        fetchRecentChattersRequested: (_state, _action: PayloadAction<string>) => {},
        fetchRecentChattersStart: (state) => {
            state.isLoading = true;
        },
        fetchRecentChattersSuccess: (state, action: PayloadAction<RecentChatterResponse[]>) => {
            state.isLoading = false;
            state.recentChatters = action.payload;
        },
        fetchRecentChattersFailure: (state) => {
            state.isLoading = false;
        },

        // Action to request fetching messages by userAId and userBId
        fetchOldMessagesRequested: (
            _state,
            _action: PayloadAction<{ userAId: string; userBId: string }>
        ) => {},
        fetchOldMessagesStart: (state) => {
            state.isLoadingOldMessages = true;
        },
        fetchOldMessagesSuccess: (state, action: PayloadAction<ChatMessageCacheModel[]>) => {
            state.isLoadingOldMessages = false;
            state.oldMessagesHistory = action.payload;
        },
        fetchOldMessagesFailure: (state) => {
            state.isLoadingOldMessages = false;
        },

        // Action to receive new message and add it to the end of the list
        receiveMessageOnSignalR: (state, action: PayloadAction<ChatMessageCacheModel>) => {
            state.oldMessagesHistory.push(action.payload);
            // Update recentChatters: find the chatter matching the message and update lastMessage
            const message = action.payload;
            const chatterIndex = state.recentChatters.findIndex(
                (chatter) =>
                    chatter.userId === message.senderId ||
                    chatter.userId === message.receiverId
            );
            if (chatterIndex !== -1) {
                state.recentChatters[chatterIndex] = {
                    ...state.recentChatters[chatterIndex],
                    lastMessage: message.message,
                };
            }
        }
    },
});

export const {
    fetchRecentChattersRequested,
    fetchRecentChattersStart,
    fetchRecentChattersSuccess,
    fetchRecentChattersFailure,

    fetchOldMessagesRequested,
    fetchOldMessagesStart,
    fetchOldMessagesSuccess,
    fetchOldMessagesFailure,

    receiveMessageOnSignalR,

} = chatMessageSlice.actions;
export default chatMessageSlice.reducer;