import { configureStore } from "@reduxjs/toolkit";
import usecaseReducer from "./features/usecase/useCaseSlice";
import historyChatReducer from "./features/chatbot/history/historyChatSlice";
import chatRoomReducer from "./features/chatbot/chatRoom/chatRoomSlice";
import chatReducer from "./features/chatbot/chat/chatSlice";

export const store = configureStore({
  reducer: {
    useCase: usecaseReducer,
    historyChat: historyChatReducer,
    chatRoom: chatRoomReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
