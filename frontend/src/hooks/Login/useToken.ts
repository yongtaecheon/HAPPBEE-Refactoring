import axios from "axios";
import { useAppDispatch } from "../../redux/store";
import { setLogin } from "../../redux/LoginReducer";
import { useEffect } from "react";

//토큰으로 로그인시 사용
// 페이지 새로고침 또는 쿠키에 토큰이 남아있을 경우 자동로그인 시도
export const useToken = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("useToken - postTokenLogin called");
    postTokenLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const postTokenLogin = () =>
    axios.post("/auth/login/token").then((res) => {
      dispatch(setLogin({ username: res.data.username, password: "" }));
    });
};
