import React, { useState, useEffect } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as itemsAction } from "../redux/moduels/items";
import { actionCreators as userAction } from "../redux/moduels/user";
import "./button/button.scss";

const LikeButton = ({ item, title, itemID }) => {
  const isLogin = useSelector(state => state.user.isLogin);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const likedItemsID = useSelector(state => state.user.likedItemsID);
  const userID = useSelector(state => state.user.id);

  useEffect(() => {
    if (likedItemsID.includes(itemID)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [likedItemsID, itemID]);

  const handleLike = () => {
    if (!isLogin) {
      alert("로그인 후 이용하실 수 있습니다.");
      return;
    }
    if (title === "recommend") {
      if (!isChecked) {
        //유저가 좋아하면
        dispatch(itemsAction.addMood(item.categoryId));
        setIsChecked(true);
      } else {
        //유저가 싫어하면
        dispatch(itemsAction.deleteMood(item.categoryId));
        setIsChecked(false);
      }
    } else if (title === "recommendResult") {
      if (!isChecked) {
        setIsChecked(true);
        dispatch(userAction.like(itemID));
      } else {
        setIsChecked(false);
        dispatch(userAction.disLike(itemID));
      }
    } else {
      if (!isChecked) {
        setIsChecked(true);
        dispatch(userAction.likeOnDB(itemID));
      } else {
        setIsChecked(false);
        dispatch(userAction.disLikeOnDB(itemID));
      }
    }
  };

  return (
    <div className='icons-list' onClick={() => handleLike()}>
      {isChecked ? (
        <HeartFilled className='iconButton red' />
      ) : (
        <HeartOutlined
          className={
            title === "recommendResult"
              ? "iconButton transparent"
              : "iconButton"
          }
        />
      )}
    </div>
  );
};

LikeButton.defafultProps = {
  title: "",
  item: []
};

export default LikeButton;
