import React from "react";
import { Link } from "react-router-dom";
import LikeButton from "../../../shared/LikeButton";
import PriceList from "../../../shared/PriceList";

const Item = ({ item, isVertical, isHorizen }) => {
  let truncatedString = "";
  if (item.productName.length > 7) {
    if (item.productName[7] !== " ") {
      truncatedString = item.productName.substr(0, 8) + "...";
    } else {
      truncatedString = item.productName.substr(0, 7) + "...";
    }
  } else {
    truncatedString = item.productName;
  }

  if (isHorizen) {
    return (
      <div className='item' style={{ marginRight: "20px" }}>
        <Link to={`/detail/${item.productId}`}>
          <img src={item.productImage[0]} alt={item.productName} />
        </Link>
        <div style={{ width: "120px" }}>
          <p className='font'>[{item.brand}]</p>
          <p className='font'>{truncatedString}</p>
          <p style={{ color: "red" }}>
            <PriceList price={item.productPrice} title={"main"} />
          </p>
          <div className='likedDiv'>
            <LikeButton itemID={item.productId} />
            <span style={{ marginLeft: "10px" }}>{item.productLike}</span>
          </div>
        </div>
      </div>
    );
  } else if (isVertical) {
    return (
      <div className='item'>
        <Link to={`/detail/${item.productId}`}>
          <img src={item.productImage[0]} alt={item.productName} />
        </Link>
        <div style={{ width: "120px" }}>
          <p className='font'>[{item.brand}]</p>
          <p className='font'>{truncatedString}</p>
          <p style={{ color: "red" }}>
            <PriceList price={item.productPrice} />
          </p>
          <div className='likedDiv'>
            <LikeButton itemID={item.productId} />
            <span style={{ marginLeft: "10px" }}>{item.productLike}</span>
          </div>
        </div>
      </div>
    );
  }
};

Item.defaultProps = {
  isVertical: null,
  isHorizen: null
};

export default Item;
