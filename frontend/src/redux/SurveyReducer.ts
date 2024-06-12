import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SurveyResult, calculateResult, createSurvey } from "../assets/survey/surveyInfo";

interface SurveyState {
  didSurvey: boolean; // 지수 측정이 끝나야 다른 옵션에 접근가능
  question: string[];
  answer: number[]; //size14
  result: SurveyResult[];
}

const initialState: SurveyState = {
  didSurvey: false,
  question: new Array(14).fill(""),
  answer: new Array(14).fill(0),
  result: [],
};

export const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setSurveyInitialState: (state: SurveyState, action: PayloadAction<SurveyResult[]>) => {
      action.payload.forEach((v) => state.result.push(v));
      //설문 결과가 존재할 때만 설문 수행여부 true
      if (action.payload.length) state.didSurvey = true;
      console.log("surveyReducer : ", { suveyResult: [...state.result] });
    },
    setSurveyAnswer: (state: SurveyState, action: PayloadAction<{ idx: number; value: number }>) => {
      const idx = action.payload.idx;
      state.answer[idx] = action.payload.value;
      console.log(`SurveyReducer: survey${idx} = ${state.answer[idx]}`);
    },
    createNewSurvey: (state: SurveyState) => {
      state.question = createSurvey();
    },
    finishSurvey: (state: SurveyState) => {
      //결과 생성
      state.didSurvey = true;
      state.result.push(calculateResult(state.answer));
    },
  },
});

export const { setSurveyInitialState, setSurveyAnswer, createNewSurvey, finishSurvey } = surveySlice.actions;
export default surveySlice.reducer;
