import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setLogout } from "../../redux/LoginReducer";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const login = useAppSelector((state) => state.login);
  const handleLogout = async () => {
    await axios.delete("/auth/logout").then((res) => console.log(res.data));
    dispatch(setLogout());
  };
  return { isLoggedIn: login.isLoggedIn, username: login.username, handleLogout };
};
