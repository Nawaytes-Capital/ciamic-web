import { api } from ".";

export const forgotPassword = (email: string) => {
  return api.post(
    "/chatbot/forgot-password",
    { email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};


interface ChangePassword {
  email: string;
  forgot_key: string;
  new_password: string;
}

export const changePassword = (data: ChangePassword) => {
  return api.post("/chatbot/change-password", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};