import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentAction } from "../../../redux/moduels/comment";
import Comment from "../Component/Comment";
import InfinityScroll from "../../../shared/InfinityScroll";
import { Empty } from "antd";
const CommentList = () => {
  const dispatch = useDispatch();
  const commentList = useSelector(state => state.comment.comment);
  const index = useSelector(state => state.comment.index);
  const isLoading = useSelector(state => state.comment.isLoading);
  useEffect(() => {
    dispatch(commentAction.loadCommentDataOnDB());
  }, []);
  return (
    <>
      <InfinityScroll
        callNext={() => {
          if (isLoading === false) {
            dispatch(commentAction.loadCommentDataOnDB());
          }
        }}
        is_next={index.isEnd ? false : true}
        loading={isLoading}
      >
        <h3 style={{ marginLeft: "20px", fontWeight: "bold" }}>
          리뷰 ({commentList.length})
        </h3>
        <div>
          {commentList.length !== 0 ? (
            commentList.map(comment => {
              return <Comment key={comment.commentId} data={comment} />;
            })
          ) : (
            <div className='emptyBorder'>
              <Empty description={false} />
              <h3>아직 댓글이 없습니다.</h3>
            </div>
          )}
        </div>
      </InfinityScroll>
    </>
  );
};

export default CommentList;
