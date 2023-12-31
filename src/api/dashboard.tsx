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

export const getAdminListApi = (page: number) => {
  return api.get<FetchAdminListResponse>(
    `/chatbot/admin/admin-management?page=${page}`,
    {
      headers: {
        Authorization: getBearerTokenApi(),
      },
    }
  );
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

// DELETE chatbot/admin/admin-management/64

export const deleteAdminApi = (id: number) => {
  return api.delete(`/chatbot/admin/admin-management/${id}`, {
    headers: {
      Authorization: getBearerTokenApi(),
    },
  });
};

// PATCH chatbot/admin/admin-management/25

export interface IUpdateAdmin {
  name: string;
  email: string;
  phone_number: string;
}

export const updateAdminApi = (id: number, payload: IUpdateAdmin) => {
  return api.patch(`/chatbot/admin/admin-management/${id}`, payload, {
    headers: {
      Authorization: getBearerTokenApi(),
    },
  });
};

//POST chatbot/admin/batch

export interface ICreatBatch {
  status: string;
  questions: {
    question: string;
    required: boolean;
  }[];
}

export const createBatchApi = (payload: ICreatBatch) => {
  return api.post(`/chatbot/admin/batch`, payload, {
    headers: {
      Authorization: getBearerTokenApi(),
    },
  });
};