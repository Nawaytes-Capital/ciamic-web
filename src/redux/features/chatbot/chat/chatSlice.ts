import { createSlice } from "@reduxjs/toolkit";

interface IChat {
  type: "bot" | "user" | "error";
  message: string;
  like?: true | false | null;
  id: number;
}

interface IChatState {
  chats: IChat[];
}

const initialState: IChatState = {
  chats: [
    {
      id: 0,
      type: "bot",
      message:
        "Hai kak! Saya CIAMIC, asisten virtual Telkom Indonesia. Ada yang bisa saya bantu??",
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (
      state,
      action: {
        payload: IChat;
      }
    ) => {
      state.chats.push(action.payload);
    },
    resetChat: (state) => {
      state.chats = [];
    },
  },
});

export const { addChat, resetChat } = chatSlice.actions;

export default chatSlice.reducer;
