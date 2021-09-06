import React from 'react'
import './TopBar.scss'
import MenuComponent from './MenuComponent'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';

const TopBar = ({title, history, rightMenu}) => {

    return (
        <>
            <div className="topBar">
                <div className="topBarMenu">
                    <ArrowBackIosIcon className="topBarLeftMenu" fontSize="large" onClick={() => history.goBack()}/>
                    <span className="topBarTitle">{title}</span>
                    {
                        rightMenu?
                        <div className="topBarRightMenu">
                            <SearchIcon fontSize="large"/>
                            <MenuComponent history={history}/>
                        </div>
                        :
                        null
                    }
                </div>
                <hr style={{margin:0}}/>
            </div>
        </>
    )
}

TopBar.defaultProps = {
    rightMenu : null
}
export default TopBar
