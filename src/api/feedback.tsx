import { api } from ".";

interface IFeedbackRequest {
  name: string;
  email: string;
  notes: string;
}

export const sendFeedbackApi = (data: IFeedbackRequest) => {
  return api.post("/chatbot/feedback", data);
};
