import React from 'react'
import './LoadingPage.scss'
const LoadingPage = ({history}) => {
    return (
        <>
            <div className="container">
                <span className="title">니꼬내꼬</span>
                <div className="buttonList">
                    <button className="button" onClick={() => history.push('/login')}>로그인</button>
                    <button className="button" onClick={() => history.push('/join')}>회원가입</button>
                    <button className="button" onClick={() => history.push('/main')}>둘러보기</button>
                </div>
            </div>
        </>
    )
}

export default LoadingPage
