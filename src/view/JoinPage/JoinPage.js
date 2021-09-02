import React from 'react'
import TopBar from '../../shared/menu/TopBar'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

const JoinPage = ({history}) => {
    return (
        <>
            <TopBar title="회원가입" history={history}/>
            <div className="join" style={{marginTop:'var(--margin-bottom-topbar)'}}>
                <div className="container">
                    <div>header</div>
                    <RegistrationForm/>
                </div>
            </div>
        </>
    )
}

export default JoinPage
