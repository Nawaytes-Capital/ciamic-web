export interface FetchUsecaseBatchApiResponse {
  message: string;
  current_page: number;
  last_page: number;
  total: number;
  data: DataItem[];
}

interface Question {
  id: number;
  question: string;
  required: boolean;
}

interface DataItem {
  _id: string;
  question: Question[];
  status: string;
  deleted_row: boolean;
  created_by: string;
  updated_at: string;
  created_at: string;
  count_response: number;
}
