export interface IQuestionnaire {
  status: "done" | "draft";
  questions: Question[];
}

interface Question {
  question: string;
  required: boolean;
}

export interface ICreateBatchResponse {
  message: string;
  data: QuestionData;
}

interface QuestionData {
  question: Question[];
  status: "done" | "draft";
  deleted_row: boolean;
  created_by: string;
  updated_at: string;
  created_at: string;
  _id: string;
}

interface Question {
  id: number;
  question: string;
  required: boolean;
}
