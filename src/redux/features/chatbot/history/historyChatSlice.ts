import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHistoryChatApi } from "../../../../api/chatbot";

const getHistoryChat = createAsyncThunk(
  "historyChat/getHistoryChat",
  async (token: string) => {
    const response = await getHistoryChatApi(token);
    return response.data;
  }
);

interface IHistoryChatState {
  status: "idle" | "loading" | "failed";
  error: string | null;
  data: any;
}

const initialState: IHistoryChatState = {
  status: "idle",
  error: null,
  data: [],
};

const historyChatSlice = createSlice({
  name: "historyChat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHistoryChat.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getHistoryChat.fulfilled, (state, action) => {
      state.status = "idle";
      state.data = action.payload;
    });
    builder.addCase(getHistoryChat.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });
  },
});

export { getHistoryChat };
export default historyChatSlice.reducer;
