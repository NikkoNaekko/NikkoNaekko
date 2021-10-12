import React from "react";

const product = ({ item }) => {
  return (
    <div className='product'>
      <div className='mood'>{item.mood}</div>

      <div className='productContent'>
        <div className='productImg'>
          <img src={item.imgSrc[0]} alt='img' />
        </div>
        <div className='productInfo'>
          <div className='productTitle'>
            <div className='orderComplete'>구매완료</div>
            <div className='brandName'>
              <div className='productBrand'>[{item.brand}]</div>
              <div className='productName'>{item.name}</div>
            </div>
          </div>
          <div className='productPrice'>{item.price}원</div>
        </div>
      </div>
    </div>
  );
};

export default product;
