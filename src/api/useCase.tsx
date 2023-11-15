import { api } from ".";

export const getUseCaseLatestBatchApi = (token: string) => {
  return api.get("/chatbot/batch", {
    headers: { Authorization: "Bearer " + token },
  });
};

export interface IUseCaseResponse {
  batch_id: string;
  responses: { question_id: number; answer: string }[];
}

export const sendUsecaseResponseApi = (
  token: string,
  data: IUseCaseResponse
) => {
  return api.post("/chatbot/response", data, {
    headers: { Authorization: "Bearer " + token },
  });
};
