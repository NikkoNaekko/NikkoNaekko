import React, { useState, useEffect } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as itemsAction } from "../redux/moduels/items";
import { actionCreators as userAction } from "../redux/moduels/user";
import "./button/button.scss";

const LikeButton = ({ item, title, itemID }) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const likedItems = useSelector((state) => state.user.likedItems);
  const userID = useSelector((state) => state.user.id);

  useEffect(() => {
    if (likedItems.includes(itemID)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [likedItems, itemID]);

  const handleLike = () => {
    if (title === "recommend") {
      const mood = item.mood;

      if (!isChecked) {
        //유저가 좋아하면
        dispatch(itemsAction.addMood(mood));
        setIsChecked(true);
      } else {
        //유저가 싫어하면
        dispatch(itemsAction.deleteMood(mood));
        setIsChecked(false);
      }
    } else if (title === "recommendResult") {
      if (!isChecked) {
        setIsChecked(true);
        dispatch(userAction.Like(itemID));
        dispatch(userAction.syncStateAndDB(userID));
      } else {
        setIsChecked(false);
        dispatch(userAction.disLike(itemID));
        dispatch(userAction.syncStateAndDB(userID));
      }
    } else {
      if (!isChecked) {
        setIsChecked(true);
        dispatch(userAction.Like(itemID));
      } else {
        setIsChecked(false);
        dispatch(userAction.disLike(itemID));
      }
    }
  };

  return (
    <div className="icons-list" onClick={() => handleLike()}>
      {isChecked ? (
        <HeartFilled className="iconButton red" />
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
  item: [],
};

export default LikeButton;
