import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateChatRoomApi } from "../../../../api/chatbot";

const generateChatRoom = createAsyncThunk(
  "chatRoom/generateChatRoom",
  async (token: string) => {
    const response = await generateChatRoomApi(token);
    return response.data;
  }
);

interface IChatRoomState {
  status: "idle" | "loading" | "failed";
  error: string | null;
  data: any;
  roomId: string | null;
}

const initialState: IChatRoomState = {
  status: "idle",
  error: null,
  data: null,
  roomId: null,
};

const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  reducers: {
    resetChatRoom: (state) => {
      state.status = "idle";
      state.error = null;
      state.data = null;
      state.roomId = null;
    },
    changeChatRoom: (state, action) => {
      state.roomId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateChatRoom.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(generateChatRoom.fulfilled, (state, action) => {
      state.status = "idle";
      state.data = action.payload;
      state.roomId = action.payload.data.id;
    });
    builder.addCase(generateChatRoom.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });
  },
});

export { generateChatRoom };
export default chatRoomSlice.reducer;
export const { resetChatRoom, changeChatRoom } = chatRoomSlice.actions;
