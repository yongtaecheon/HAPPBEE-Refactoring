import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { createNewSurvey } from "../../../redux/SurveyReducer";
import SurveyChart from "./SurveyChart";
import "./Survey.scss";

export default function Survey() {
  const survey = useAppSelector((state) => state.survey);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSurveyStart = () => {
    if (survey.didSurvey && !window.confirm("현재 설문결과가 초기화됩니다. 진행하시겠습니까?")) return;
    dispatch(createNewSurvey());
    navigate("/survey/0");
  };
  return (
    <section className="survey-container">
      {survey.didSurvey ? <SurveyChart /> : <p>햅비지수를 측정해보세요. </p>}
      <button onClick={handleSurveyStart}>{survey.didSurvey ? "햅비지수 재측정" : "햅비지수 측정하기"}</button>
    </section>
  );
}
