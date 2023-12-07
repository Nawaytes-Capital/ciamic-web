import { AxiosResponse } from "axios";
import { apiWithToken } from ".";
import {
  ICreateBatchResponse,
  IQuestionnaire,
} from "./interface/dashboard.interface";
import { FetchUsecaseBatchApiResponse } from "./interface/FetchUsecaseBatch";

export const fetchUsecasebatchApi = (
  page: number = 1
): Promise<AxiosResponse<FetchUsecaseBatchApiResponse>> => {
  return apiWithToken.get(`/chatbot/admin/batch?page=${page}`);
};

export const createNewBatchApi = (
  payload: IQuestionnaire
): Promise<AxiosResponse<ICreateBatchResponse>> => {
  return apiWithToken.post(`/chatbot/admin/batch`, payload);
};
