export interface IAuthResponse {
  message: string;
  data: {
    user: {
      name: string;
      phone_number: string;
      email: string;
      active: boolean;
    };
    role: string[];
    authorization: {
      token: string;
      type: string;
    };
  };
}
