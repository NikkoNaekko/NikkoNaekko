import TopBar from '../../shared/menu/TopBar'
import React from 'react';
import NormalLoginForm from '../../components/NormalLoginForm/NormalLoginForm';
const LoginPage = ({history}) => {

    return (
        <>
            <TopBar title="로그인" history={history}/>
            <div className="login">
                <div className="container">
                    <NormalLoginForm/>
                </div>
            </div>
        </>
    )
}

export default LoginPage;
