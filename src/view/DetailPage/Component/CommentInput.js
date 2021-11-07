import React, { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import { StarFilled } from "@ant-design/icons";
import { Input, Button } from "antd";
const { TextArea } = Input;
const CommentInput = () => {
  const [rating, setRating] = useState(1);
  const [inputText, setInputText] = useState("");
  const onStarClick = nextValue => {
    setRating(nextValue);
  };
  const onChangeInput = e => {
    setInputText(e.currentTarget.value);
    console.log(inputText);
  };
  return (
    <div className='CommentInputBorder'>
      <div className='CommentInput'>
        <span style={{ fontSize: "18px" }}>리뷰작성</span>
        <StarRatingComponent
          name='rate2'
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
      <TextArea rows={4} onChange={onChangeInput} />
      <Button
        type='primary'
        size='middle'
        style={{ marginTop: "15px", float: "right" }}
      >
        작성
      </Button>
    </div>
  );
};

export default CommentInput;
