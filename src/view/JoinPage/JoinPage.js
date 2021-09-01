import React from 'react'
import TopBar from '../../shared/menu/TopBar'

const JoinPage = ({history}) => {
    return (
        <>
            <TopBar title="회원가입" history={history}/>
            <div style={{marginTop:'var(--margin-bottom-topbar)'}}>
                JoinPage입니다!
            </div>
        </>
    )
}

export default JoinPage
