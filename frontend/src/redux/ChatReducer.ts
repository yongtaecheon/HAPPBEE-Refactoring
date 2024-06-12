import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Chat {
  id: number;
  userReq: string;
  aiRes: string;
}

interface ChatState {
  chats: Chat[];
  length: number;
}

const initialState: ChatState = {
  chats: [],
  length: 0,
};

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChatInitialState: (state, action: PayloadAction<Chat[]>) => {
      action.payload.forEach((v) => state.chats.push(v));
      state.length = action.payload.length;
      console.log("chatReducer : ", { chats: [...state.chats], length: state.length });
    },
    addUserChat: (state: ChatState, action: PayloadAction<string>) => {
      state.chats.push({ id: 0, userReq: action.payload, aiRes: "" });
      state.length++;
      // console.log('ChatReducer : ', state.user[state.length - 1]);
    },
    addAiChat: (state: ChatState, action: PayloadAction<string>) => {
      state.chats[state.length - 1].aiRes = action.payload;
      // console.log('ChatReducer : ', state.ai[state.length - 1]);
    },
  },
});

export const { setChatInitialState, addUserChat, addAiChat } = chatSlice.actions;
export default chatSlice.reducer;
