import { useNavigate } from "react-router-dom";
import mainLogo from "../../../assets/img/main_logo.png";
import Login from "./Login/Login";
import "./Main.scss";

export default function Main() {
  const navigate = useNavigate();
  return (
    <section className="main-container">
      <img src={mainLogo} />
      <br />
      <Login />
      <button onClick={() => navigate("/survey/0")}>시작하기</button>
    </section>
  );
}
