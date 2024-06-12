import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setLogout } from "../redux/LoginReducer";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
  const handleLogout = async () => {
    await axios.delete("/auth/logout").then((res) => console.log(res.data));
    dispatch(setLogout());
    navigate("/");
  };
  return { isLoggedIn, handleLogout };
};
