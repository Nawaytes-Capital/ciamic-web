import { AxiosResponse } from "axios";
import { apiWithToken } from ".";
import {
  ICreateBatchResponse,
  IQuestionnaire,
} from "./interface/dashboard.interface";
import { FetchUsecaseBatchApiResponse } from "./interface/FetchUsecaseBatch";
import { fetchFeedbackResponse } from "./interface/feedbackresponse.interface";
import { UsecaseResult } from "./interface/usecaseResult.interface";

export const fetchUsecasebatchApi = (
  token: string,
  page: number = 1
): Promise<AxiosResponse<FetchUsecaseBatchApiResponse>> => {
  return apiWithToken.get(`/chatbot/admin/batch?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createNewBatchApi = (
  payload: IQuestionnaire
): Promise<AxiosResponse<ICreateBatchResponse>> => {
  return apiWithToken.post(`/chatbot/admin/batch`, payload);
};

export const fetchFeedbackApi = (
  page: number = 1
): Promise<AxiosResponse<fetchFeedbackResponse>> => {
  return apiWithToken.get(`/chatbot/admin/feedback?page=${page}`);
};

export const getBatchResultApi = (
  batchId: string
): Promise<AxiosResponse<UsecaseResult>> => {
  return apiWithToken.get(`/chatbot/admin/response/${batchId}`);
};