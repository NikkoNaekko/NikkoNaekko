import React from "react";
import { Link } from "react-router-dom";
import { categoryList } from "../../../data/categoryInfomation";
import PriceList from "../../../shared/PriceList";

const Product = ({ order }) => {
  return (
    <div className='product'>
      <div className='mood'>{categoryList[order.categoryId]}</div>
      <Link to={`/detail/${order.productId}`}>
        <div className='productContent'>
          <div className='productImg'>
            <img src={order.productImage[0]} alt='img' />
          </div>
          <div className='productInfo'>
            <div className='productTitle'>
              <div className='orderComplete'>구매완료</div>
              <div className='brandName'>
                <div className='productBrand'>[{order.brand}]</div>
                <div className='productName'>{order.productName}</div>
              </div>
            </div>
            <div className='productPrice'>
              <PriceList price={order.productPrice} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
