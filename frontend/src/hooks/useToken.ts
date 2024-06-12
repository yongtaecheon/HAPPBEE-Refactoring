import { useAppDispatch } from "../redux/store";
import axios from "axios";
import { setLogin } from "../redux/LoginReducer";

//토큰으로 로그인시 사용
// 페이지 새로고침 또는 쿠키에 토큰이 남아있을 경우 자동로그인 시도
export const useToken = () => {
  const dispatch = useAppDispatch();
  const postTokenLogin = () =>
    axios.post("/auth/login/token").then((res) => {
      console.log(res.data);
      dispatch(setLogin({ username: res.data.username, password: "" }));
    });
  console.log("useToken called");
  postTokenLogin();
};
