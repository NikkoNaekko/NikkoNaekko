import React from "react";
import StarRatingComponent from "react-star-rating-component";
import { StarFilled } from "@ant-design/icons";

const Starpoint = () => {
  return (
    <div className='starpointBorder'>
      <span className='starpoint'>4.0/5.0</span>
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
        value={4}
      />
    </div>
  );
};

export default Starpoint;
