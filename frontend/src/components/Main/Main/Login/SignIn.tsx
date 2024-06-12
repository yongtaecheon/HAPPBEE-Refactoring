import { useSignIn } from "../../../../hooks/Login/useSignIn";

export default function SignIn() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    checkUsernameText,
    confirmPasswordText,
    handleCheckUsername,
    handleSignIn,
  } = useSignIn();
  return (
    <div className="login-container">
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="사용자명"></input>
      <span>{checkUsernameText}</span>
      <button onClick={handleCheckUsername}>중복확인</button>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      ></input>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
      ></input>
      <span>{confirmPasswordText}</span>
      <button onClick={handleSignIn}>회원가입</button>
    </div>
  );
}
