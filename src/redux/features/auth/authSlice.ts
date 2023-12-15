import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface IAuthState {
  authenticated: boolean;
  accessToken: string | null;
  user: any;
  role?: string[];
  isAdmin?: boolean;
}

export const isAuthenticated = (): boolean => {
  let state = false;
  try {
    const accessTokenStore = localStorage.getItem("access_token");
    const user = jwtDecode(accessTokenStore || "");
    const userStore = localStorage.getItem("user");
    if (!!accessTokenStore && !!userStore) {
      state = true;
    }
  } catch (error) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
  }

  return state;
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

export const getRole = (): string[] => {
  const role = localStorage.getItem("role");
  return JSON.parse(role || "[]")!;
};

const initialState: IAuthState = {
  authenticated: isAuthenticated(),
  accessToken: getAccessToken(),
  user: getUser(),
  role: getRole(),
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
      state.role = action.payload.role ?? [];
      state.isAdmin = action.payload.isAdmin ?? false;
    },
    logoutApp: (state) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("userEmail");
      state.authenticated = false;
      state.accessToken = null;
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const { loginApp, logoutApp } = authSlice.actions;
