import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as itemsAction } from "../../../redux/moduels/items";
import HorizenItemList from "../Component/HorizenItemList";
import Spinner from "../../../shared/Spinner";

const PopularProduct = () => {
  const dispatch = useDispatch();
  const popluarItems = useSelector(state => state.items.popluarItems);

  useEffect(() => {
    dispatch(itemsAction.loadPopularClothesDataOnDB());
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      {popluarItems.length > 0 ? <HorizenItemList /> : <Spinner />}
    </div>
  );
};

export default PopularProduct;
