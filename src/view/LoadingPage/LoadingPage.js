import React from "react";
import { useSelector } from "react-redux";
import "./LoadingPage.scss";
function checkMobileDevice() {
  var mobileKeyWords = new Array(
    "Android",
    "iPhone",
    "iPod",
    "BlackBerry",
    "Windows CE",
    "SAMSUNG",
    "LG",
    "MOT",
    "SonyEricsson"
  );
  for (var info in mobileKeyWords) {
    if (window.navigator.userAgent.match(mobileKeyWords[info]) != null) {
      return true;
    }
  }
  return false;
}
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
          <button className='button' onClick={() => history.push("/version")}>
            업데이트 기록
          </button>
        </div>
        {checkMobileDevice() ? null : (
          <h4 style={{ color: "red", fontWeight: "bold" }}>
            모바일 환경을 권장합니다.
          </h4>
        )}
      </div>
    </>
  );
};

export default LoadingPage;
