import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  authenticated: boolean;
  accessToken: string | null;
  user: any;
  isAdmin?: boolean;
}

export const isAuthenticated = (): boolean => {
  const accessTokenStore = localStorage.getItem("access_token");
  const userStore = localStorage.getItem("user");

  if (!!accessTokenStore && !!userStore) {
    return true;
  }
  return false;
};

export const getAccessToken = (): string | null => {
  const accessTokenStore = localStorage.getItem("access_token");
  return accessTokenStore;
};

export const getUser = (): object => {
  const userStore = localStorage.getItem("user");
  return JSON.parse(userStore || "{}")!;
};

export const getIsAdmin = (): boolean => {
  const isAdmin = localStorage.getItem("is_admin");
  const user = JSON.parse(isAdmin || "false")!;
  return user.role === "admin";
};

const initialState: IAuthState = {
  authenticated: isAuthenticated(),
  accessToken: getAccessToken(),
  user: getUser(),
  isAdmin: getIsAdmin(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginApp: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin ?? false;
    },
    logoutApp: (state) => {
      state.authenticated = false;
      state.accessToken = null;
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const { loginApp, logoutApp } = authSlice.actions;
