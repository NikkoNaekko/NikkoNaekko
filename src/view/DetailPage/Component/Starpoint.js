import React from "react";
import StarRatingComponent from "react-star-rating-component";
import { StarFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Starpoint = () => {
  const productStar = useSelector(state => state.items.selectedItems.productStar)

  return (
    <div className='starpointBorder'>
      <span className='starpoint'>{productStar}/5.0</span>
      <StarRatingComponent
        name='productStar'
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
