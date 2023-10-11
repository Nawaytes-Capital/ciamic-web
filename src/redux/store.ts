import { configureStore } from "@reduxjs/toolkit";
import usecaseReducer from "./features/usecase/useCaseSlice";
export const store = configureStore({
  reducer: {
    useCase: usecaseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
