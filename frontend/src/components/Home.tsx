import { useAppSelector } from "../redux/store"
import {catImages, catItemImages} from '../assets/img/images';
import { useNavigate } from "react-router-dom";
import '../styles/Home.scss';

export default function Home() {
  const selectedItem = useAppSelector(state => state.cat.selectedItem);
  const cat = useAppSelector(state => state.cat);
  const navigate = useNavigate();
  return (
    <section>
      <div className='box-container'>
        <div className='box cat'>
          <h1>안녕! 난 햅비냥.</h1>
          <h2>나랑 이야기 하면서 기분전환 할래?</h2>
          <img src={selectedItem === -1 ? catImages[2] : catItemImages[selectedItem]} />
          <button onClick={()=>navigate('/home/item')}>햅비냥 꾸미기</button>
        </div>
        <div className='box'>
          <span><strong>대화 수</strong>를 채워 <strong>친밀도 레벨</strong>을 올려보세요.</span>
        </div>
        <div className='box chatcount'>
          <h1>대화 수</h1>
          <span><strong>{cat.chatCount}</strong>번</span>
          <progress value={cat.chatCount} max='5'></progress>
        </div>
        <div className='box level'>
          <h1>친밀도</h1>
          <span><strong>{cat.level}</strong>level</span>
        </div>
      </div>
    </section>
  )
}
