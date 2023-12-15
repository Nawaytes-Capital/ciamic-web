import axios from "axios";

interface SpeechToTextResponse {
  data: {
    all_text: string;
    seg_results: [number, number, string][];
  };
  inferenceDuration: number;
  message: string;
}
export const speechToText = async (file: File) => {
  const formData = new FormData();
  formData.append("audio", file);
  formData.append("lang", "indonesian");
  const response = await axios.post<SpeechToTextResponse>(
    "https://telkom-bac-api.apilogy.id/Speech_To_Text_Service/1.0.0/stt_inference",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": "XwUzo2MEl39V9LI6mhLmfwYEaYXrNA3v",
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
