import React, {useState} from 'react'
import './TopBar.scss'
import MenuComponent from './MenuComponent'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SearchIcon from '@material-ui/icons/Search';

const TopBar = ({title, history, rightMenu}) => {

    const [searching, setSearching] = useState(false);

    const onSearch = (e) => {
        const title = document.querySelector(".topBarTitle");
        const input = document.querySelector(".searchInput");
        if(searching){
            setSearching(false);
            title.style.animation = 'appear 0.5s ease forwards';
            input.style.animation = "inputDisAppear 0.5s ease forwards";
        } else {
            setSearching(true);
            title.style.animation = 'disAppear 0.5s ease forwards';
            input.style.animation = "inputAppear 0.5s ease forwards";
        }
    }

    return (
        <>
            <div className="topBar">
                <div className="topBarMenu" style={{color:'var(--color-font-gray)'}}>
                    <ArrowBackIosIcon className="topBarLeftMenu" fontSize="large" onClick={() => history.goBack()}/>
                    {
                        title === "니꼬내꼬"?
                        <span className="topBarTitle hover" onClick={() => {history.push('/main')}}>{title}</span>:
                        <span className="topBarTitle">{title}</span>
                    }
                    {
                        rightMenu?
                        <div className="topBarRightMenu">
                            <div>
                                <input className="searchInput" placeholder="상품명을 입력하세요"/>
                                <SearchIcon className="searchIcon" onClick={onSearch}/>
                            </div>
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
