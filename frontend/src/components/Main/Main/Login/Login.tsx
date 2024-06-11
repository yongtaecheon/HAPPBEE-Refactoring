import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../../hooks/useLogin";
import "./Login.scss";

export default function Login() {
  const { username, setUsername, password, setPassword, handleLogin } =
    useLogin();
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="사용자명"
      ></input>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      ></input>
      <button onClick={handleLogin}>로그인</button>
      <button onClick={() => navigate("/signin")}>회원가입</button>
    </div>
  );
}
