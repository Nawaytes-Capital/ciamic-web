export interface FetchAdminListResponse {
  message: string;
  current_page: number;
  last_page: number;
  total: number;
  data: Admin[];
}

export interface Admin {
  name: string;
  phone_number: string;
  email: string;
  verif_code: null;
  verif_exp: null;
  active: boolean;
  user_id: number;
  role_id: number;
}
