import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SurveyState {
  didSurvey: boolean, // 지수 측정이 끝나야 다른 옵션에 접근가능
  answers: number[], //size14
  result: {
    totalScore: number,
    '경제': number,
    '관계': number,
    '자유': number,
    '감정': number,
    '삶의 만족도': number,
  },
}

const initialState: SurveyState = {
  didSurvey: false,
  answers: new Array(14).fill(0),
  result: {
    totalScore: 0,
    '경제': 0,
    '관계': 0,
    '자유': 0,
    '감정': 0,
    '삶의 만족도': 0,
  }
}

export const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setSurveyAnswer: (state:SurveyState, action: PayloadAction<{ idx: number, value: number }>) => {
      const idx = action.payload.idx;
      state.answers[idx] = action.payload.value;
      console.log(`SurveyReducer: survey${idx} = ${state.answers[idx]}`);
    }
  }
})

export const {setSurveyAnswer} = surveySlice.actions;
export default surveySlice.reducer;