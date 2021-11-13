import React, { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import { StarFilled } from "@ant-design/icons";
import { Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentAction } from "../../../redux/moduels/comment";
const { TextArea } = Input;
const CommentInput = () => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [content, setContent] = useState("");
  const uid = useSelector(state => state.user.uid);
  const isLoading = useSelector(state => state.comment.isLoading);
  const preventingNonMemberEvents = () => {
    if (!uid) {
      alert("로그인 후 이용해주세요.");
      document.activeElement.blur();
      setContent("");
      return false;
    }
    return true;
  };
  const submitComment = () => {
    if (!preventingNonMemberEvents()) {
      return;
    }
    dispatch(commentAction.saveCommentDataOnDB(rating, content));
    setContent("");
  };
  const onStarClick = nextValue => {
    if (!preventingNonMemberEvents()) {
      return;
    }
    setRating(nextValue);
  };

  const onChangeTextArea = e => {
    setContent(e.target.value);
  };
  const onFocusInputArea = e => {
    if (!preventingNonMemberEvents()) {
      return;
    }
  };
  const enterSubmitComment = e => {
    if (!preventingNonMemberEvents()) {
      return;
    }
    if (e.key === "Enter") {
      dispatch(commentAction.saveCommentDataOnDB(rating, content));
      setContent("");
    }
  };
  return (
    <div className='CommentInputBorder'>
      <div className='CommentInput'>
        <span style={{ fontSize: "18px" }}>리뷰작성</span>
        <StarRatingComponent
          name='userStar'
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
      placeholder="상품 하나당 한 개의 댓글만 작성하실 수 있습니다."
        rows={4}
        value={content}
        onChange={onChangeTextArea}
        onFocus={onFocusInputArea}
        onKeyPress={enterSubmitComment}
      />

      {isLoading ? (
        <Button
          type='primary'
          style={{ marginTop: "15px", float: "right" }}
          loading
        >
          작성 중
        </Button>
      ) : (
        <Button
          type='primary'
          size='middle'
          style={{ marginTop: "15px", float: "right" }}
          onClick={submitComment}
        >
          작성
        </Button>
      )}
    </div>
  );
};

export default CommentInput;
