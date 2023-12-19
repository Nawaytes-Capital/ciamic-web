import { AxiosResponse } from "axios";
import { api } from ".";
import { IChatRoomDetailResponse } from "./interface/chatRoomDetail.interface";
import { getBearerTokenApi } from "./useCase";

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
  like: boolean | null,
  notes: string
) => {
  return api.post(
    `/chatbot/bot-feedback/${chatId}`,
    { like, notes },
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
};

// api/chatbot/history/:id

export const getHistoryChatByIdApi = (
  token: string,
  id: string
): Promise<AxiosResponse<IChatRoomDetailResponse>> => {
  return api.get(`/chatbot/history/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
};

interface IRelatedQuestion {
  message: string;
  data: string[];
}

export const getRelatedQuestionApi = (): Promise<
  AxiosResponse<IRelatedQuestion>
> => {
  return api.get(`/chatbot/related-question`, {
    headers: {
      Authorization: getBearerTokenApi(),
    },
  });
};
