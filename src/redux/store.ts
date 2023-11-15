import { configureStore } from "@reduxjs/toolkit";
import usecaseReducer from "./features/usecase/useCaseSlice";
import historyChatReducer from "./features/chatbot/history/historyChatSlice";
export const store = configureStore({
  reducer: {
    useCase: usecaseReducer,
    historyChat: historyChatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
