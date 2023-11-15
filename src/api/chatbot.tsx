import { api } from ".";

export const getHistoryChatApi = (token: string) => {
  return api.get("/chatbot/history", {
    headers: { Authorization: "Bearer " + token },
  });
};
