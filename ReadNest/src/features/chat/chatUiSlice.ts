import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ChatUiState {
    isExpanded: boolean;
    activeChatUsername: string | null;
}

const initialState: ChatUiState = {
    isExpanded: false,
    activeChatUsername: null,
};

const chatUiSlice = createSlice({
    name: "chatUi",
    initialState,
    reducers: {
        openChatWithUsername: (state, action: PayloadAction<string>) => {
            state.isExpanded = true;
            state.activeChatUsername = action.payload;
        },
        closeChat: (state) => {
            state.isExpanded = false;
            state.activeChatUsername = null;
        },
        resetActiveChatUsername: (state) => {
            state.activeChatUsername = null;
        },
    },
});

export const {
    openChatWithUsername,
    closeChat,
    resetActiveChatUsername,
} = chatUiSlice.actions;
export default chatUiSlice.reducer;
