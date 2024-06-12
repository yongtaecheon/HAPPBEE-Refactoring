import axios from "axios";
import { useAppDispatch } from "../../redux/store";
import { CatState, setCatInitalState } from "../../redux/CatReducer";
import { Chat, setChatInitialState } from "../../redux/ChatReducer";
import { SurveyResult } from "../../assets/survey/surveyInfo";
import { setSurveyInitialState } from "../../redux/SurveyReducer";
import { useEffect } from "react";

interface UserInfoDto {
  username: string;
  catInfo: CatState;
  chatInfo: Chat[];
  surveyInfo: SurveyResult[];
}

export const useUserInfo = () => {
  const dispatch = useAppDispatch();

  const getUserInfo = async () => {
    await axios.get("/user/info").then((res) => {
      const userInfo: UserInfoDto = res.data;
      dispatch(setCatInitalState(userInfo.catInfo));
      dispatch(setChatInitialState(userInfo.chatInfo));
      dispatch(setSurveyInitialState(userInfo.surveyInfo));
    });
  };

  useEffect(() => {
    console.log("useUserInfo - getUserInfo called");
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
