import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HorizenItemList from "../Component/HorizenItemList";
import Spinner from "../../../shared/Spinner";
import { actionCreators as itemsAction } from "../../../redux/moduels/items";
const BookMark = () => {
  const dispatch = useDispatch();
  const isLikedDataLoading = useSelector(
    state => state.items.isLikedDataLoading
  );

  useEffect(() => {
    dispatch(itemsAction.loadLikedClothesDataOnDB());
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      {isLikedDataLoading ? <Spinner /> : <HorizenItemList isBookMark />}
    </div>
  );
};

export default BookMark;
