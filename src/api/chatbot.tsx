import { api } from ".";

export const getHistoryChatApi = (token: string) => {
  return api.get("/chatbot/history", {
    headers: { Authorization: "Bearer " + token },
  });
};

export const generateChatRoomApi = (token: string) => {
  return api.post(
    "/chatbot/room",
    {},
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
};

interface IChat {
  chat: string;
  room_id: string;
}

export const sendChatApi = (token: string, payload: IChat) => {
  return api.post("/chatbot/chat", payload, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const sendChatFeedbackApi = (
  token: string,
  chatId: string,
  like: boolean | null
) => {
  return api.post(
    `/chatbot/bot-feedback/${chatId}`,
    { like },
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
};