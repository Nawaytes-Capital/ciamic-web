export interface fetchFeedbackResponse {
  message: string;
  current_page: number;
  last_page: number;
  data: UserData[];
  total: number;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  notes: string;
  created_by: string;
  updated_at: string;
  created_at: string;
}
