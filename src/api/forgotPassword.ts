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
