import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as itemsAction } from "../../../redux/moduels/items";
import HorizenItemList from "../Component/HorizenItemList";

const PopularProduct = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(itemsAction.loadPopularClothesDataOnDB());
  }, []);
  return (
    <div style={{ marginTop: "40px" }}>
      <HorizenItemList />
    </div>
  );
};

export default PopularProduct;
