import React from "react";
import { useSelector } from "react-redux";
import "./LoadingPage.scss";

const LoadingPage = ({ history }) => {
  const isLogin = useSelector(state => state.user.isLogin);
  if (isLogin) {
    alert("잘못된 접근입니다.");
    history.replace("/main");
  }
  return (
    <>
      <div className='container'>
        <span className='title'>니꼬내꼬</span>
        <div className='buttonList'>
          <button className='button' onClick={() => history.push("/login")}>
            로그인
          </button>
          <button className='button' onClick={() => history.push("/join")}>
            회원가입
          </button>
          <button className='button' onClick={() => history.push("/main")}>
            홈페이지
          </button>
        </div>
      </div>
    </>
  );
};

export default LoadingPage;
