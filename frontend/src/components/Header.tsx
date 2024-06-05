import { useLocation } from "react-router-dom"
import '../styles/Header.scss';

export default function Header() {
  const location = useLocation();
  const pathname = () => {
    const links = ['/home', '/chat', '/survey', '/hospital'];
    const name = ['Home', 'Chat', 'Happbee Score', 'Hospitals'];
    for (let i = 0; i < 4; i++){
      if (location.pathname.startsWith(links[i]))
        return name[i];
    }
  }
  return (
    <header>
      <h1>HAPPBEE</h1>
      <h2>{pathname()}</h2>
    </header>
  )
}
