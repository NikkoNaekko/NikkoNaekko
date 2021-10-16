import React from "react";
import TopBar from "../../shared/menu/TopBar";
import RegistrationForm from "./component/RegistrationForm";
import { useSelector } from "react-redux";

const JoinPage = ({ history }) => {
  const isLogin = useSelector(state => state.user.isLogin);
  if (isLogin) {
    alert("잘못된 접근입니다.");
    history.replace("/main");
  }

  return (
    <>
      <TopBar title='회원가입' history={history} />
      <div className='join'>
        <div className='container'>
          <RegistrationForm />
        </div>
      </div>
    </>
  );
};

export default JoinPage;
