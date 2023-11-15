import { api } from ".";

export const getUseCaseLatestBatchApi = (token: string) => {
  return api.get("/chatbot/batch", {
    headers: { Authorization: "Bearer " + token },
  });
};
