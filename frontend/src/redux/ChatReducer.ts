import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Chat = string[];

interface ChatState {
  user: Chat,
  ai: Chat,
  length: number,
}

const initialState: ChatState = {
  user: [],
  ai: [],
  length: 0,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addUserChat: (state: ChatState, action: PayloadAction<string>) => {
      state.user.push(action.payload);
      state.length++;
      // console.log('ChatReducer : ', state.user[state.length - 1]);
    },
    addAiChat: (state: ChatState, action: PayloadAction<string>) => {
      state.ai.push(action.payload);
      // console.log('ChatReducer : ', state.ai[state.length - 1]);
    }
  }
});

export const { addUserChat, addAiChat } = chatSlice.actions;
export default chatSlice.reducer;