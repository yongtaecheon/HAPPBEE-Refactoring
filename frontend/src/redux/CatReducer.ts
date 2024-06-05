import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CatState{
  selectedItem: number,
  chatCount: number,
  level: number,
}

const initialState: CatState= {
  selectedItem: -1, //0~9
  chatCount: 0,
  level: 0,
}

export const catSlice = createSlice({
  name: 'cat',
  initialState,
  reducers: {
    setItem: (state:CatState, action: PayloadAction<number>) => {
      state.selectedItem = action.payload;
    },
    increaseChatCount: (state:CatState) => {
      state.chatCount++;
      if (state.chatCount === 5) {
        state.chatCount = 0;
        state.level++;
      }
    },
  }
});

export const {setItem, increaseChatCount} = catSlice.actions;
export default catSlice.reducer;