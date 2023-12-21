import { AxiosResponse } from "axios";
import { api, apiWithToken } from ".";
import {
  ICreateBatchResponse,
  IQuestionnaire,
} from "./interface/dashboard.interface";
import { FetchUsecaseBatchApiResponse } from "./interface/FetchUsecaseBatch";
import { fetchFeedbackResponse } from "./interface/feedbackresponse.interface";
import { UsecaseResult } from "./interface/usecaseResult.interface";
import { getBearerTokenApi } from "./useCase";
import { FetchAdminListResponse } from "./interface/fetchAdminList.interface";

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
  return apiWithToken.post(`/chatbot/admin/batch`, payload, {
    headers: {
      Authorization: getBearerTokenApi(),
    },
  });
};

export const fetchFeedbackApi = (
  page: number = 1,
  token: string
): Promise<AxiosResponse<fetchFeedbackResponse>> => {
  return apiWithToken.get(`/chatbot/admin/feedback?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBatchResultApi = (
  batchId: string,
  token: string
): Promise<AxiosResponse<UsecaseResult>> => {
  return apiWithToken.get(`/chatbot/admin/response/${batchId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAdminListApi = () => {
  return api.get<FetchAdminListResponse>(`/chatbot/admin/admin-management`, {
    headers: {
      Authorization: getBearerTokenApi(),
    },
  });
};

export interface ICreateAdmin {
  name: string;
  email: string;
  phone_number: string;
}
export const createAdminApi = (payload: ICreateAdmin) => {
  return api.post(`/chatbot/admin/admin-management`, payload, {
    headers: {
      Authorization: getBearerTokenApi(),
    },
  });
};