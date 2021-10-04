import React from "react";
import LikeButton from "../../../shared/LikeButton";

const Items = ({ item }) => {
  return (
    <div className='item'>
      <img src={item.imgSrc[0]} alt={item.name} />
      <LikeButton item={item} title={"recommend"} />
    </div>
  );
};

export default Items;
