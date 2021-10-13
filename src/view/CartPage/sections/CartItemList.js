import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as cartAction } from "../../../redux/moduels/cart";

import CartItem from "../component/CartItem";
import { Empty } from "antd";

const CartItemList = ({ history }) => {
  const itemId = useSelector(state => state.cart.itemId);
  const cartItem = useSelector(state => state.cart.cartItem);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

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
