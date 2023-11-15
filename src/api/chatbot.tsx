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