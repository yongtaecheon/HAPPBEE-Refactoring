import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CatState {
  selectedItem: number;
  chatCount: number;
  level: number;
}

const initialState: CatState = {
  selectedItem: -1, //0~9
  chatCount: 0,
  level: 0,
};

export const catSlice = createSlice({
  name: "cat",
  initialState,
  reducers: {
    setCatInitalState: (state: CatState, action: PayloadAction<CatState>) => {
      Object.assign(state, action.payload);
      console.log("catReducer : ", {
        selectedItem: state.selectedItem,
        chatCount: state.chatCount,
        level: state.level,
      });
    },
    setItem: (state: CatState, action: PayloadAction<number>) => {
      state.selectedItem = action.payload;
    },
    increaseChatCount: (state: CatState) => {
      state.chatCount++;
      if (state.chatCount === 5) {
        state.chatCount = 0;
        state.level++;
      }
    },
  },
});

export const { setCatInitalState, setItem, increaseChatCount } = catSlice.actions;
export default catSlice.reducer;
