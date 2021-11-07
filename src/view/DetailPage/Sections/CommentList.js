import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentAction } from "../../../redux/moduels/comment";
import Comment from "../Component/Comment";
const CommentList = ({ productId }) => {
  const dispatch = useDispatch();
  const commentList = useSelector(state => state.comment.comment);
  useEffect(() => {
    dispatch(commentAction.loadCommentDataOnDB(productId));
  }, []);
  return (
    <div>
      {commentList.map(comment => {
        return <Comment data={comment} />;
      })}
    </div>
  );
};

export default CommentList;
