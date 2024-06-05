import { useNavigate, useParams } from 'react-router-dom'
import '../styles/Survey.scss';
import { useAppDispatch } from '../redux/store';
import { setSurveyAnswer } from '../redux/SurveyReducer';

export default function Survey() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const validateId = () => {
    if (params.id !== undefined && +params.id >= 0 && +params.id < 14)
      return true;
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSurveyBtn = (e: any) => {
    if (typeof params.id !== "undefined") {
      console.log(`clicked ${e.target.value}`);
      dispatch(setSurveyAnswer({ idx: +params.id, value: +e.target.value }));
      navigate(`/survey/${+params.id + 1}`);
    }
  }

  const renderSurveyBtns = () => {
    const arr = [];
    for (let i = 1; i <= 10; i++){
      arr.push(
        <button className='survey-btn' key={i} value={i} onClick={(e)=>handleSurveyBtn(e)}>{i}</button>
      )
    }
    return (
    <div className='btn-group'>
      {arr.map((v)=>v)}
    </div>);
  }
  return (
    <section>
      <div className='survey'>
        {validateId() ?
        (<>
          <h1>햅비지수 측정문항 {params.id}</h1>
          <h1>this is survey </h1>
          <p>순간적으로 떠오르는 느낌에 따라 답변해 주세요.</p>
          {renderSurveyBtns()}
        </>)
        : (<h1>유효하지 않은 페이지 입니다.</h1>)}
      </div>
    </section>
  )
}
