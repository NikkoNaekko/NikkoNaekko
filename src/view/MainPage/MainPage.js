import React from "react";
import "./MainPage.scss";
import TopBar from "../../shared/menu/TopBar";
import BookMark from "./Sections/BookMark";
import NewProduct from "./Sections/NewProduct";
import PopularProduct from "./Sections/PopularProduct";
import Header from "./Header/Header";
import InfinityScroll from "./Component/InfinityScroll";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as itemsAction } from "../../redux/moduels/items";

const MainPage = ({ history }) => {
  const dispatch = useDispatch();
  const is_loading = useSelector(state => state.items.is_loading);
  const paging = useSelector(state => state.items.paging);

  return (
    <>
      <InfinityScroll
        callNext={() => {
          dispatch(itemsAction.loadClothesDataOnDB());
        }}
        is_next={paging.isEnd ? false : true}
        loading={is_loading}
      >
        <TopBar title='니꼬내꼬' history={history} rightMenu />
        <div className='mainBorder'>
          <div
            className='Section1'
            style={{ margin: "var(--margin-item-list)" }}
          >
            <Header title={"BookMark"} />
            <BookMark />
          </div>
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
