import { useState } from "react";
import { useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../redux/LoginReducer";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const postLogin = () =>
    axios
      .post("/user/login", { username, password })
      .then((res) => console.log(res));

  const { mutate: mutateLogin } = useMutation({
    mutationKey: ["login"],
    mutationFn: postLogin,
  });

  const handleLogin = () => {
    mutateLogin();
    dispatch(setLogin({ username, password }));
    navigate("/home");
  };

  return { username, setUsername, password, setPassword, handleLogin };
};
