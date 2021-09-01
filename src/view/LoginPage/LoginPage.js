import React from 'react'
import TopBar from '../../shared/menu/TopBar'

const LoginPage = ({history}) => {
    return (
        <>
            <TopBar title="로그인" history={history}/>
            <div style={{marginTop:'var(--margin-bottom-topbar)'}}>
                LoginPage입니다
            </div>
        </>
    )
}

export default LoginPage
