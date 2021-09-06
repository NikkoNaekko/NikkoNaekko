import React from 'react'
import TopBar from '../../shared/menu/TopBar'

const MainPage = ({history}) => {
    return (
        <>
            <TopBar title="니꼬내꼬" history={history} rightMenu/>
            <div>
                MainPage입니다!
            </div>
        </>
    )
}

export default MainPage
