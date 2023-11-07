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