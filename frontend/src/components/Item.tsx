import { useNavigate } from 'react-router-dom';
import { catImages,catItemImages,itemImages } from '../assets/img/images'
import { setItem } from '../redux/CatReducer';
import { useAppDispatch, useAppSelector } from '../redux/store';
import '../styles/Item.scss';

export default function Item() {
  const selectedItem = useAppSelector(state => state.cat.selectedItem);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const renderItems = () => {
    const arr = [];
    for (let i = 0; i < 9; i++){
      arr.push(
        // <figure className='item-img'>
          <button className='img-btn' value={i} onClick={(e)=>dispatch(setItem(+e.currentTarget.value))}>
            <img src={itemImages[i]} />
          </button>
        // </figure>
      );
    }
    return (
      <div className='item-group'>
        {arr.map((v)=>v)}
      </div>
    );
  }
  return (
    <section>
      <figure className='img-cat'>
        <img src={selectedItem===-1?catImages[2]:catItemImages[selectedItem]}/>
      </figure>
      {renderItems()}
      <button onClick={()=>dispatch(setItem(-1))}>되돌리기</button>
      <button onClick={()=>navigate('/home')}>홈으로 돌아가기</button>
    </section>
  )
}
