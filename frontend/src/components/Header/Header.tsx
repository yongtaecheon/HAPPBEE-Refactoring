import { useLocation } from "react-router-dom";
import "./Header.scss";
import { useLogout } from "../../hooks/Login/useLogout";

export default function Header() {
  const location = useLocation();
  const { username, isLoggedIn, handleLogout } = useLogout();
  const pathname = () => {
    const links = ["/home", "/chat", "/survey", "/hospital"];
    const name = ["Home", "Chat", "Happbee Score", "Hospitals"];
    for (let i = 0; i < 4; i++) {
      if (location.pathname.startsWith(links[i])) return name[i];
    }
  };

  return (
    <header>
      <div>
        <h1>HAPPBEE</h1>
        <h2>{pathname()}</h2>
      </div>
      {isLoggedIn && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>{username}</span>
          <a href="/" onClick={handleLogout}>
            로그아웃
          </a>
        </div>
      )}
    </header>
  );
}
