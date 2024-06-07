import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SurveyResult, calculateResult, createSurvey } from "../assets/survey/surveyInfo";

interface SurveyState {
  didSurvey: boolean, // 지수 측정이 끝나야 다른 옵션에 접근가능
  question: string[],
  answer: number[], //size14
  result: SurveyResult,
}

const initialState: SurveyState = {
  didSurvey: false,
  question: new Array(14).fill(''),
  answer: new Array(14).fill(0),
  result: {
    totalScore: 0,
    olsResult: 0,
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
      state.answer[idx] = action.payload.value;
      console.log(`SurveyReducer: survey${idx} = ${state.answer[idx]}`);
    },
    createNewSurvey: (state: SurveyState) => {
      state.question = createSurvey();
      state.didSurvey = false;
    },
    finishSurvey: (state: SurveyState) => {
      state.didSurvey = true;
      //결과 생성
      state.result = calculateResult(state.answer);
    },
  }
})

export const {setSurveyAnswer, createNewSurvey, finishSurvey} = surveySlice.actions;
export default surveySlice.reducer;