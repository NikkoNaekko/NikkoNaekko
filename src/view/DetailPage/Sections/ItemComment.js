import React from "react";
import CommentList from "./CommentList";
import CommentInput from "../Component/CommentInput";
import ImptyDiv from "../Component/ImptyDiv";
const ItemComment = ({ productId }) => {
  return (
    <div>
      <ImptyDiv />
      <CommentInput />
      <ImptyDiv />
      <CommentList productId={productId} />
    </div>
  );
};

export default ItemComment;
