import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LoginState {
  isLoggedIn: boolean;
  userId: string;
  userPassword: string;
}

const initialState: LoginState = {
  isLoggedIn: false,
  userId: "",
  userPassword: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (
      state: LoginState,
      action: PayloadAction<{ userId: string; userPassword: string }>
    ) => {
      state.isLoggedIn = true;
      [state.userId, state.userPassword] = [
        action.payload.userId,
        action.payload.userPassword,
      ];
    },
  },
});

export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;
