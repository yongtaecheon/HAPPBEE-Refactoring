import { useState } from "react";
import { useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../redux/LoginReducer";

export const useLogin = () => {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(setLogin({ userId, userPassword }));
    navigate("/home");
  };

  return { userId, setUserId, userPassword, setUserPassword, handleLogin };
};
