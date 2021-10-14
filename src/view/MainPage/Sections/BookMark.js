import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import VerticalItemList from "../Component/VerticalItemList";
import { actionCreators as itemsAction } from "../../../redux/moduels/items";
const BookMark = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(itemsAction.loadLikedClothesDataOnDB());
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      <VerticalItemList isBookMark />
    </div>
  );
};

export default BookMark;
