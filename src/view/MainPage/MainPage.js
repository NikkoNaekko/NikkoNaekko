import React from "react";
import "./MainPage.scss";
import TopBar from "../../shared/menu/TopBar";
import BookMark from "./Sections/BookMark";
import NewProduct from "./Sections/NewProduct";
import PopularProduct from "./Sections/PopularProduct";
import Header from "./Header/Header";
import InfinityScroll from "../../shared/InfinityScroll";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as itemsAction } from "../../redux/moduels/items";

const MainPage = ({ history }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.items.isLoading);
  const paging = useSelector(state => state.items.paging);
  const isLogin = useSelector(state => state.user.isLogin);

  return (
    <>
      <InfinityScroll
        callNext={() => {
          if (isLoading === false) {
            dispatch(itemsAction.loadClothesDataOnDB());
          }
        }}
        is_next={paging.isEnd ? false : true}
        loading={isLoading}
      >
        <TopBar title='니꼬내꼬' history={history} rightMenu />
        <div className='mainBorder'>
          {isLogin ? (
            <div
              className='Section1'
              style={{ margin: "var(--margin-item-list)" }}
            >
              <Header title={"BookMark"} />
              <BookMark />
            </div>
          ) : null}
          <div
            className='Section2'
            style={{ margin: "var(--margin-item-list)" }}
          >
            <Header title={"PopularProduct"} />
            <PopularProduct />
          </div>
          <div
            className='Section3'
            style={{ margin: "var(--margin-item-list)" }}
          >
            <Header title={"NewProduct"} />
            <NewProduct />
          </div>
        </div>
      </InfinityScroll>
    </>
  );
};

export default MainPage;
