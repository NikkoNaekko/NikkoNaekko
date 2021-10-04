import React, { useEffect } from "react";
import LikeButton from "../../../shared/LikeButton";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userAction } from "../../../redux/moduels/user";

const SquareList = ({ history, mood }) => {
  const dispatch = useDispatch();
  const userID = useSelector(state => state.user.id);

  useEffect(() => {
    dispatch(userAction.loadOneUserDataFromDB(userID));
  }, []);

  return (
    <div className='squareList'>
      {mood?.map(m => (
        <div className='item'>
          <img src={m.imgSrc[0]} alt={m.name} />
          <LikeButton title={"recommendResult"} itemID={m.id} />
        </div>
      ))}
    </div>
  );
};

export default SquareList;
