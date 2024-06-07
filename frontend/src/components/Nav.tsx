import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Nav.scss';
// import "../sidebars.css";

export default function Nav() {
  const location = useLocation();
  const lists = useMemo(() => {
    return {
      links: ['/home', '/chat', '/survey', '/hospital'],
      icons: ['home', 'sms', 'equalizer', 'local_hospital'],
    }
  }, []);
  const renderLists = () => {
    const arr = [];
    for (let i = 0; i < 4; i++){
      const selected = (location.pathname.startsWith(lists.links[i])) ? 'selected' : '';
      arr.push(
        <Link to = {lists.links[i]} key={i}>
          <li className="">
            <span className={`material-symbols-outlined ${selected}`}>{lists.icons[i]}</span>
          </li>
        </Link>
      );
    }
    return arr;
  }

  return (
      <nav>
        <ul>
          {renderLists()}
        </ul>
      </nav>
    );
}
