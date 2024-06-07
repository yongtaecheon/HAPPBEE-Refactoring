import { useLogin } from "../../../../hooks/useLogin";
import "./Login.scss";

export default function Login() {
  const { userId, setUserId, userPassword, setUserPassword, handleLogin } =
    useLogin();
  return (
    <div className="login-container">
      <input
        value={userId}
        onChange={() => setUserId(userId)}
        placeholder="아이디"
      ></input>
      <input
        value={userPassword}
        onChange={() => setUserPassword(userPassword)}
        placeholder="비밀번호"
      ></input>
      <button onClick={handleLogin}>로그인</button>
      <button>회원가입</button>
    </div>
  );
}
