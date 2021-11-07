import React from "react";
import "../DetailPage.scss";
import StarRatingComponent from "react-star-rating-component";
import { StarFilled, CloseOutlined } from "@ant-design/icons";

const Comment = ({ data }) => {
  return (
    <>
      <hr />
      <div className='commentBorder'>
        <div className='commentHeader'>
          <span className='commentFont'>{data.userName}</span>
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
              value={data.totalStar}
            />
            <CloseOutlined />
          </div>
        </div>

        <p>{data.commentRegister.substr(0, 10)}</p>
        <p className='commentFont'>{data.content}</p>
      </div>
    </>
  );
};

export default Comment;
