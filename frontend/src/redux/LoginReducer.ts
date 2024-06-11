import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LoginState {
  isLoggedIn: boolean;
  username: string;
  password: string;
}

const initialState: LoginState = {
  isLoggedIn: false,
  username: "",
  password: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (
      state: LoginState,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      state.isLoggedIn = true;
      [state.username, state.password] = [
        action.payload.username,
        action.payload.password,
      ];
    },
    setLogout: (state: LoginState) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setLogin, setLogout } = loginSlice.actions;
export default loginSlice.reducer;
