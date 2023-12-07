import { createSlice } from "@reduxjs/toolkit";

interface IChat {
  type: "bot" | "user" | "error";
  message: string;
  like?: true | false | null;
  id: number;
  chatId?: string;
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
      state.chats = [
        {
          id: 0,
          type: "bot",
          message:
            "Hai kak! Saya CIAMIC, asisten virtual Telkom Indonesia. Ada yang bisa saya bantu??",
        },
      ];
    },
    updateLike: (
      state,
      action: {
        payload: {
          chatId: string;
          like: true | false | null;
        };
      }
    ) => {
      const { chatId, like } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        if (chat.like === like) {
          chat.like = null;
        } else chat.like = like;
      }
    },
  },
});

export const { addChat, resetChat, updateLike } = chatSlice.actions;

export default chatSlice.reducer;
