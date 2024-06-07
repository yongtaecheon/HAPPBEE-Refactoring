import { configureStore } from "@reduxjs/toolkit";
import SurveyReducer from "./SurveyReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import CatReducer from "./CatReducer";
import ChatReducer from "./ChatReducer";
import LoginReducer from "./LoginReducer";

export const store = configureStore({
  reducer: {
    survey: SurveyReducer,
    cat: CatReducer,
    chat: ChatReducer,
    login: LoginReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
