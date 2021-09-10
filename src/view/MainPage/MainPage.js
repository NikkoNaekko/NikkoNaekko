import React, {useEffect} from 'react'
import './MainPage.scss'
import TopBar from '../../shared/menu/TopBar'
import BookMark from './Sections/BookMark'
import NewProduct from './Sections/NewProduct'
import PopularProduct from './Sections/PopularProduct'
import Header from './Header/Header'

const MainPage = ({history}) => {

    return (
        <>
            <TopBar title="니꼬내꼬" history={history} rightMenu/>
            <div className="mainBorder">
                <div className="Section1" style={{margin:'var(--margin-item-list)'}}>
                    <Header title={'BookMark'}/>
                    <BookMark/>
                </div>
                <div className="Section2" style={{margin:'var(--margin-item-list)'}}>
                    <Header title={'PopularProduct'}/>
                    <PopularProduct/>
                </div>
                <div className="Section3" style={{margin:'var(--margin-item-list)'}}>
                    <Header title={'NewProduct'}/>
                    <NewProduct/>
                </div>
            </div>
        </>
    )
}

export default MainPage
