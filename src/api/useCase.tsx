import { api } from ".";
import { IApiResponseDetail } from "./interface/detailResponse.interface";
import { UsecaseHistory } from "./interface/usecaseHistory.interface";

export const getBearerTokenApi = () => {
  return `Bearer ${localStorage.getItem("access_token")}`;
};

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

export const getHistoryResponseApi = () => {
  return api.get<UsecaseHistory>("/chatbot/batch/history", {
    headers: { Authorization: getBearerTokenApi() },
  });
};

// get detail response http://193.203.160.51:8000/api/chatbot/batch/history/6554eeda8f86aa551c0cc609

export const getDetailResponseApi = (id: string) => {
  return api.get<IApiResponseDetail>(`/chatbot/batch/history/${id}`, {
    headers: { Authorization: getBearerTokenApi() },
  });
};