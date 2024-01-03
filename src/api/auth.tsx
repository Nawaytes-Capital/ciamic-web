import { api } from ".";

interface ILoginRequest {
    email : string,
    password : string,
    application_id : number
}

interface IRegisterRequest {
    name : string,
    email : string,
    password : string,
}

export const login = (data: ILoginRequest) => {
	return api.post("/login", data);
};

export const register = (data: IRegisterRequest) => {
	return api.post("/chatbot/register", data);
};

export const verifyApi = (token: string) => {
  return api.post(`/chatbot/verification`, {
    verif_code: token,
  });
};

// POST chatbot/resend-verification

export const resendVerification = (email: string) => {
  return api.post(`/chatbot/resend-verification`, {
    email: email,
  });
};