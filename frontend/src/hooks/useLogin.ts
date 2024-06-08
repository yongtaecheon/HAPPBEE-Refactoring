import { useState } from "react";
import { useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../redux/LoginReducer";

export const useLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(setLogin({ username, password }));
    navigate("/home");
  };

  return { username, setUsername, password, setPassword, handleLogin };
};
