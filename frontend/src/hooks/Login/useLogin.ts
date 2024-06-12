import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../redux/store";
import { setLogin } from "../../redux/LoginReducer";

export const useLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const postLogin = () => axios.post("/auth/login", { username, password }).then((res) => console.log(res));

  const { mutate: mutateLogin } = useMutation({
    mutationKey: ["login"],
    mutationFn: postLogin,
    onSuccess: () => {
      dispatch(setLogin({ username, password }));
      navigate("/home");
    },
    onError: () => {
      alert("해당 유저가 존재하지 않거나 비밀번호가 틀렸습니다.");
    },
  });

  const handleLogin = () => {
    if (username === "") alert("사용자명을 입력해 주세요.");
    else if (password === "") alert("비밀번호를 입력해 주세요");
    else mutateLogin();
  };

  return { username, setUsername, password, setPassword, handleLogin };
};
