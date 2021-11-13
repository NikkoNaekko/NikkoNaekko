import React, { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import { StarFilled } from "@ant-design/icons";
import { Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentAction } from "../../../redux/moduels/comment";

const { TextArea } = Input;

const EditInput = ({ commentId, userStar, content }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(userStar);
  const [comment, setComment] = useState(content);
  const isLoading = useSelector(state => state.comment.isLoading);

  const onStarClick = nextValue => {
    setRating(nextValue);
  };

  const onChangeTextArea = e => {
    setComment(e.target.value);
  };
  const enterSubmitComment = e => {
    if (e.key === "Enter") {
      setComment("");
    }
  };
  const cancleEditComment = () => {
    dispatch(commentAction.editing(false));
  };
  const editComment = () => {
    dispatch(commentAction.editCommentDataOnDB(commentId, rating, comment));
  };
  return (
    <div className='CommentInputBorder'>
      <div className='CommentInput'>
        <span style={{ fontSize: "18px" }}>리뷰수정</span>
        <StarRatingComponent
          name='editStar'
          editing={true}
          renderStarIcon={() => (
            <StarFilled
              style={{
                fontSize: "30px"
              }}
            />
          )}
          starCount={5}
          value={rating}
          onStarClick={onStarClick}
        />
      </div>
      <TextArea
        rows={4}
        value={comment}
        onChange={onChangeTextArea}
        onKeyPress={enterSubmitComment}
      />
      <Button
        type='primary'
        size='middle'
        style={{ marginTop: "15px", float: "right" }}
        onClick={cancleEditComment}
      >
        취소
      </Button>
      {isLoading ? (
        <Button
          type='primary'
          style={{ marginTop: "15px", marginRight: "15px", float: "right" }}
          loading
        >
          수정 중
        </Button>
      ) : (
        <Button
          type='primary'
          size='middle'
          style={{ marginTop: "15px", marginRight: "15px", float: "right" }}
          onClick={editComment}
        >
          수정
        </Button>
      )}
    </div>
  );
};

export default EditInput;
