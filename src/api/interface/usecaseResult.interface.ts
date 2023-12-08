export interface UsecaseResult {
  message: string;
  data: QuestionData[];
}

interface QuestionData {
  question_id: number;
  question: string;
  response: string[];
}
