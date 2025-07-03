import type { ChatMessageCacheModel, RecentChatterResponse } from "@/api/@types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState: {
    isLoading: boolean;
    isLoadingOldMessages: boolean;
    recentChatters: RecentChatterResponse[];
    oldMessagesHistory: Record<string, ChatMessageCacheModel[]>;
    newChatUser?: RecentChatterResponse;
    isNewChatUserLoading?: boolean;
} = {
    isLoading: false,
    isLoadingOldMessages: false,
    recentChatters: [],
    oldMessagesHistory: {},
    newChatUser: undefined,
    isNewChatUserLoading: false,
};

const chatMessageSlice = createSlice({
    name: "chatMessage",
    initialState,
    reducers: {
        // Action to request fetching recent chatters
        fetchRecentChattersRequested: (_state, _action: PayloadAction<string>) => { },
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
        ) => { },
        fetchOldMessagesStart: (state) => {
            state.isLoadingOldMessages = true;
        },
        fetchOldMessagesSuccess: (state, action: PayloadAction<{ userId: string, messages: ChatMessageCacheModel[] }>) => {
            state.isLoadingOldMessages = false;
            state.oldMessagesHistory[action.payload.userId] = action.payload.messages;
        },
        fetchOldMessagesFailure: (state) => {
            state.isLoadingOldMessages = false;
        },

        receiveMessageOnSignalR: (state, action: PayloadAction<{ message: ChatMessageCacheModel, currentUserId: string }>) => {
            // Lấy message và currentUserId từ payload
            const { message, currentUserId } = action.payload;

            // Xác định userId của người còn lại trong cuộc trò chuyện
            // Current user là người trong auth, other user là người còn lại trong cuộc trò chuyện
            // Nếu message.senderId là currentUserId thì otherUserId là receiverId, ngược lại
            const otherUserId = message.senderId === currentUserId ? message.receiverId : message.senderId;

            // Nếu không xác định được otherUserId thì return (không làm gì)
            if (!otherUserId) {
                return;
            }

            // Tìm vị trí của chatter trong danh sách recentChatters dựa trên userId
            const chatterIndex = state.recentChatters.findIndex((c) => c.userId === otherUserId);

            if (chatterIndex !== -1) {
                // Nếu đã có chatter trong danh sách, cập nhật lastMessage và đưa lên đầu danh sách
                const updatedChatter = {
                    ...state.recentChatters[chatterIndex],
                    lastMessage: message.message,
                };
                state.recentChatters.splice(chatterIndex, 1); // Xóa chatter cũ khỏi vị trí cũ
                state.recentChatters.unshift(updatedChatter); // Thêm chatter đã cập nhật lên đầu
            } else if (
                // Nếu chưa có, kiểm tra nếu newChatUser là người gửi hoặc nhận thì thêm vào đầu danh sách
                state.newChatUser &&
                (state.newChatUser.userId === message.senderId || state.newChatUser.userId === message.receiverId)
            ) {
                state.recentChatters.unshift({
                    ...state.newChatUser,
                    lastMessage: message.message,
                });
            }

            // Xóa newChatUser sau khi đã xử lý
            state.newChatUser = undefined;

            // 👉 Thêm message vào đúng history theo user
            if (!state.oldMessagesHistory[otherUserId]) {
                // Nếu chưa có history cho user này thì khởi tạo mảng rỗng
                state.oldMessagesHistory[otherUserId] = [];
            }
            // Thêm message vào history của user
            state.oldMessagesHistory[otherUserId].push(message);
        },

        //Action fetch new Chatter
        fetchNewChatterRequested: (_state, _action: PayloadAction<string>) => {
            console.log("Fetching new chatter for username:", _action.payload);
        },
        fetchNewChatterStart: (state) => {
            state.isNewChatUserLoading = true;
        },
        fetchNewChatterSuccess: (state, action: PayloadAction<RecentChatterResponse>) => {
            state.isNewChatUserLoading = false;
            state.newChatUser = action.payload;
        },
        fetchNewChatterFailure: (state) => {
            state.isNewChatUserLoading = false;
            state.newChatUser = undefined;
        },

        // Action fetch new Chatter by id
        fetchNewChatterByIdRequested: (_state, _action: PayloadAction<string>) => {
            console.log("Fetching new chatter for userId:", _action.payload);
        },
        fetchNewChatterByIdStart: (state) => {
            state.isNewChatUserLoading = true;
        },
        fetchNewChatterByIdSuccess: (state, action: PayloadAction<RecentChatterResponse>) => {
            state.isNewChatUserLoading = false;
            state.newChatUser = action.payload;
            // state.oldMessagesHistory = []; // Reset old messages history when fetching new chatter
        },
        fetchNewChatterByIdFailure: (state) => {
            state.isNewChatUserLoading = false;
            state.newChatUser = undefined;
        },
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

    fetchNewChatterRequested,
    fetchNewChatterStart,
    fetchNewChatterSuccess,
    fetchNewChatterFailure,

    fetchNewChatterByIdRequested,
    fetchNewChatterByIdStart,
    fetchNewChatterByIdSuccess,
    fetchNewChatterByIdFailure,

} = chatMessageSlice.actions;
export default chatMessageSlice.reducer;