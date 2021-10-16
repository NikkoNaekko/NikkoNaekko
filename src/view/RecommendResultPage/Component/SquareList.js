import React, { useEffect } from "react";
import LikeButton from "../../../shared/LikeButton";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userAction } from "../../../redux/moduels/user";

const SquareList = ({ history, items }) => {
  return (
    <div className='squareList'>
      {items &&
        items.map(item => (
          <div className='item'>
            <img src={item.productImage[0]} alt={item.productName} />
            <LikeButton title={"recommendResult"} itemID={item.productId} />
          </div>
        ))}
    </div>
  );
};

export default SquareList;
