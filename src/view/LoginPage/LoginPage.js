import TopBar from "../../shared/menu/TopBar";
import React from "react";
import NormalLoginForm from "../../components/NormalLoginForm/NormalLoginForm";
import { useSelector } from "react-redux";

const LoginPage = ({ history }) => {
  const isLogin = useSelector(state => state.user.isLogin);
  const isLoading = useSelector(state => state.user.isLoading);
  if (isLogin && !isLoading) {
    alert("잘못된 접근입니다.");
    history.replace("/main");
  }
  return (
    <>
      <TopBar title='로그인' history={history} />
      <div className='login'>
        <div className='container'>
          <NormalLoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
