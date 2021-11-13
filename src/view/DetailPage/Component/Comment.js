import React from "react";
import "../DetailPage.scss";
import StarRatingComponent from "react-star-rating-component";
import { StarFilled, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentAction } from "../../../redux/moduels/comment";
import EditInput from "./EditInput";

const Comment = ({ data }) => {
  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.name);
  const isEditing = useSelector(state => state.comment.isEditing);
  const deleteComment = () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      dispatch(commentAction.deleteCommentDataOnDB(data.commentId));
    }
  };
  const editComment = () => {
    dispatch(commentAction.editing(true));
  };
  return (
    <>
      <hr />

      {data.userName === userName && isEditing ? (
        <EditInput
          commentId={data.commentId}
          userStar={data.userStar}
          content={data.content}
        />
      ) : (
        <div className='commentBorder'>
          <div className='commentHeader'>
            <span
              className={`commentFont ${
                userName && userName === data.userName && "myCommentFont"
              }`}
            >
              {data.userName}
            </span>
            <div className='commentHeaderRight'>
              <StarRatingComponent
                name='rate'
                editing={false}
                renderStarIcon={() => (
                  <StarFilled
                    style={{
                      fontSize: "30px"
                    }}
                  />
                )}
                starCount={5}
                value={Number(data.userStar)}
              />
              {userName && userName === data.userName && (
                <>
                  <EditOutlined className='commentIcon' onClick={editComment} />
                  <CloseOutlined
                    className='commentIcon'
                    onClick={deleteComment}
                  />
                </>
              )}
            </div>
          </div>

          <p>{data.commentRegister.substr(0, 10)}</p>
          <p className='commentFont'>{data.content}</p>
        </div>
      )}
    </>
  );
};

export default Comment;
