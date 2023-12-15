export interface IApiResponseDetail {
  message: string;
  data: {
    _id: string;
    id_batch: string;
    response: ApiResponseItem[];
    created_by: string;
    updated_at: string;
    created_at: string;
  };
}

interface ApiResponseItem {
  question_id: number;
  question_text: string;
  answer: string;
}
