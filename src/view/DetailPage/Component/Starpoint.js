import React from "react";
import StarRatingComponent from "react-star-rating-component";
import { StarFilled } from "@ant-design/icons";

const Starpoint = ({ productStar }) => {
  return (
    <div className='starpointBorder'>
      <span className='starpoint'>{productStar}/5.0</span>
      <StarRatingComponent
        name='rate2'
        editing={false}
        renderStarIcon={() => (
          <StarFilled
            style={{
              fontSize: "30px"
            }}
          />
        )}
        starCount={5}
        value={productStar}
      />
    </div>
  );
};

export default Starpoint;
