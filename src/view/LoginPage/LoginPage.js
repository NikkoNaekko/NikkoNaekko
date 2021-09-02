import TopBar from '../../shared/menu/TopBar'
import React from 'react';
import NormalLoginForm from '../../components/NormalLoginForm/NormalLoginForm';

const LoginPage = ({history}) => {
    return (
        <>
            <TopBar title="로그인" history={history}/>
            <div className="login" style={{marginTop:'var(--margin-bottom-topbar)'}}>
                <div className="container">
                    <div>header</div>
                    <NormalLoginForm/>
                </div>
            </div>
        </>
    )
}

export default LoginPage;
