import React from "react";
import { useSelector } from "react-redux";

import CartItem from "../component/CartItem";
import { Empty } from "antd";

const CartItemList = ({ history }) => {
  const cartItem = useSelector(state => state.cart.cartItem);

  return (
    <div className='cartItemList'>
      {cartItem.length > 0 ? (
        cartItem.length > 0 &&
        cartItem.map((info, index) => (
          <CartItem info={info} key={index} history={history} />
        ))
      ) : (
        <div className='emptyBorder'>
          <Empty description={false} />
          <h3>장바구니가 비어있습니다.</h3>
        </div>
      )}
    </div>
  );
};

export default CartItemList;
