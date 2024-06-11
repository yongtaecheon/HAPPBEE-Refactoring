import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignIn = () => {
  const [username, setUsername] = useState<string>("");
  const [checkUsername, setCheckUsername] = useState<boolean>(false);
  const [checkUsernameText, setCheckUsernameText] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordText, setConfirmPasswordText] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (password === "" && confirmPassword === "") return;
    if (password === confirmPassword)
      setConfirmPasswordText("비밀번호가 일치합니다.");
    else setConfirmPasswordText("비밀번호가 다릅니다.");
  }, [password, confirmPassword]);

  const handleCheckUsername = () => {
    axios.get(`/user/exist/${username}`).then((res) => {
      console.log(res.data);
      if (res.data) {
        setCheckUsername(true);
        setCheckUsernameText("사용 가능한 사용자명 입니다.");
      } else {
        setCheckUsernameText("이미 사용 중인 사용자명 입니다");
      }
    });
  };

  const handleSignIn = async () => {
    if (checkUsername === false)
      return alert("사용자명 중복확인이 필요합니다.");
    await axios
      .post("/user/signin", { username, password })
      .then(() => {
        alert("회원가입이 완료되었습니다.");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        alert("해당 유저가 이미 존재합니다.");
      });
  };

  return {
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
  };
};
