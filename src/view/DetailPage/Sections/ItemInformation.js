import React from "react";
import LikeButton from "../../../shared/LikeButton";
import "../DetailPage.scss";
import PriceList from "../../../shared/PriceList";
import CartButton from "../../../shared/CartButton";
import { categoryList } from "../../../data/categoryInfomation";
import Starpoint from "../Component/Starpoint";
const ItemInformation = ({ item }) => {
  return (
    <>
      <div className='detailBorder'>
        <p className='font gray'>
          {item.brand} [{categoryList[item.categoryId]}]
        </p>
        <p className='font bold'>{item.productName}</p>
        <div className='detailBorderHorizen'>
          <div className='icons'>
            <div className='liked'>
              <LikeButton itemID={item.productId} />
              {item.productLike}
            </div>
            <div className='purchased'>
              <CartButton itemID={item.productId} />
              {item.productSold}
            </div>
          </div>
          <div className='price'>
            <p className='font red'>
              <PriceList price={item.productPrice} />
            </p>
          </div>
        </div>
        <Starpoint productStar={item.productStar} />
      </div>
    </>
  );
};

export default ItemInformation;
