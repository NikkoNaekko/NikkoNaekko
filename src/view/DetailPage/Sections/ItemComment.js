import React from "react";
import CommentList from "./CommentList";
import CommentInput from "../Component/CommentInput";
import ImptyDiv from "../Component/ImptyDiv";
const ItemComment = () => {
  return (
    <div>
      <ImptyDiv />
      <CommentInput />
      <ImptyDiv />
      <CommentList />
    </div>
  );
};

export default ItemComment;
