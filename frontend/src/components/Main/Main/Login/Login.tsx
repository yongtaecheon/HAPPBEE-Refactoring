import { useLogin } from "../../../../hooks/useLogin";
import "./Login.scss";

export default function Login() {
  const { username, setUsername, password, setPassword, handleLogin } =
    useLogin();
  return (
    <div className="login-container">
      <input
        value={username}
        onChange={() => setUsername(username)}
        placeholder="사용자명"
      ></input>
      <input
        value={password}
        onChange={() => setPassword(password)}
        placeholder="비밀번호"
      ></input>
      <button onClick={handleLogin}>로그인</button>
      <button>회원가입</button>
    </div>
  );
}
