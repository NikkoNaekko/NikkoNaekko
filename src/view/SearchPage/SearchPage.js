import React, { useEffect } from "react";
import "./SearchPage.scss";
import TopBar from "../../shared/menu/TopBar";
import Header from "../MainPage/Header/Header";
import VerticalItemList from "../MainPage/Component/VerticalItemList";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as itemAction } from "../../redux/moduels/items";
import Spinner from "../../shared/Spinner";
const SearchPage = props => {
  const dispatch = useDispatch();
  const searchName = props.match.params.name;
  const isLoading = useSelector(state => state.items.isLoading);
  useEffect(() => {
    dispatch(itemAction.loadSearchedClothesDataOnDB(searchName));
  }, [searchName]);
  return (
    <>
      <TopBar title='니꼬내꼬' history={props.history} rightMenu />
      <div className='searchBorder'>
        <div style={{ margin: "var(--margin-item-list)" }}>
          <Header title={"Search"} />
          {isLoading ? <Spinner /> : <VerticalItemList isSearchProduct />}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
