import axios from "axios";
import { api } from ".";
import { getBearerTokenApi } from "./useCase";

interface SpeechToTextResponse {
  data: {
    all_text: string;
    seg_results: [number, number, string][];
  };
  inferenceDuration: number;
  message: string;
}

export const speechToText2 = async (file: File) => {
  const formData = new FormData();
  formData.append("audio", file);
  const response = await api.post("/chatbot/speech-to-text", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: getBearerTokenApi(),
    },
  });
  return response.data;
};

