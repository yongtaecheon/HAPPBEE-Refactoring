import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { finishSurvey, setSurveyAnswer } from "../../../redux/SurveyReducer";
import "./Survey.scss";
import { useSurveySave } from "../../../hooks/useSurveySave";

function SurveyContent({ id }: { id: number }) {
  const survey = useAppSelector((state) => state.survey);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mutateSurveySave } = useSurveySave();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSurveyBtn = async (e: any) => {
    console.log(`clicked ${e.target.value}`);
    dispatch(setSurveyAnswer({ idx: id, value: +e.target.value }));
    if (id < 13) navigate(`/survey/${id + 1}`);
    else {
      await Promise.resolve(dispatch(finishSurvey())).then(() => mutateSurveySave());
      navigate("/survey");
    }
  };

  const renderSurveyBtns = () => {
    const arr = [];
    for (let i = 1; i <= 10; i++) {
      arr.push(
        <button className="survey-btn" key={i} value={i} onClick={(e) => handleSurveyBtn(e)}>
          {i}
        </button>
      );
    }
    return <div className="btn-group">{arr.map((v) => v)}</div>;
  };

  return (
    <>
      <h1 className="survey-question">{survey.question[id]}</h1>
      <p>
        순간적으로 떠오르는 느낌에 따라 답변해 주세요.
        <br />
        문항에 공감할수록 높은 수로 응답해 주세요.
      </p>
      {renderSurveyBtns()}
    </>
  );
}

function InvalidSurveyPage() {
  const navigate = useNavigate();
  return (
    <div style={{ flexDirection: "column" }}>
      <h1>유효하지 않은 페이지 입니다.</h1>
      <button onClick={() => navigate("/survey")}>돌아가기</button>
    </div>
  );
}

export default function SurveyList() {
  const params = useParams();
  //validate params
  if (params.id === undefined || +params.id < 0 || +params.id > 13) return <InvalidSurveyPage />;
  const id = +params.id;
  return (
    <section className="survey-container">
      <h2 className="survey-number">
        햅비지수 측정문항 <strong>{id + 1}</strong> / 14
      </h2>
      <SurveyContent id={id} />
    </section>
  );
}
