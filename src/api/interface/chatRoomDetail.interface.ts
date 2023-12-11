interface Message {
  _id: string;
  from: string;
  room_id: string;
  created_by: string;
  message?: string;
  created_at: string;
  updated_at: string;
  like?: boolean;
  updated_by: string;
}

export interface IChatRoomDetailResponse {
  message: string;
  data: Message[];
}
