import React, { useState, useRef } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SearchIcon from "@material-ui/icons/Search";
import MenuComponent from "./MenuComponent";
import "./TopBar.scss";

const TopBar = ({ title, history, rightMenu }) => {
  const [searching, setSearching] = useState(false);
  const inputRef = useRef();
  const onSearch = e => {
    const input = document.querySelector(".searchInput");

    if (searching) {
      setSearching(false);
      input.style.animation = "inputDisAppear 0.5s ease forwards";
      if (inputRef.current.value) {
        history.push(`/search/${inputRef.current.value}`);
      }
    } else {
      setSearching(true);
      input.style.animation = "inputAppear 0.5s ease forwards";
    }
  };
  const enterSearch = e => {
    if (e.key === "Enter") {
      history.push(`/search/${inputRef.current.value}`);
    }
  };

  return (
    <>
      <div className='topBar'>
        <div className='topBarMenu' style={{ color: "var(--color-font-gray)" }}>
          <ArrowBackIosIcon
            className='topBarLeftMenu'
            fontSize='large'
            onClick={() => history.goBack()}
          />
          {title === "니꼬내꼬" ? (
            <span
              className='topBarTitle hover'
              onClick={() => {
                history.push("/main");
              }}
            >
              {title}
            </span>
          ) : (
            <span className='topBarTitle'>{title}</span>
          )}
          {rightMenu ? (
            <div className='topBarRightMenu'>
              <div className='searchForm'>
                <input
                  className='searchInput'
                  ref={inputRef}
                  placeholder='상품명을 입력하세요'
                  onKeyPress={enterSearch}
                />
                <SearchIcon className='searchIcon' onClick={onSearch} />
              </div>
              <MenuComponent history={history} />
            </div>
          ) : null}
        </div>
        <hr style={{ margin: 0 }} />
      </div>
    </>
  );
};

TopBar.defaultProps = {
  rightMenu: null
};
export default TopBar;
