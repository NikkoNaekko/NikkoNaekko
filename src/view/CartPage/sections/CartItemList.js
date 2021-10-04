import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { clothesInformation } from '../../../data/data';
import { actionCreators as cartAction } from "../../../redux/moduels/cart";

import CartItem from "../component/CartItem";

const CartItemList = ({ history }) => {
  // const { clothes } = clothesInformation;
  const itemId = useSelector(state => state.cart.itemId);
  const cartItem = useSelector(state => state.cart.cartItem);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartAction.loadCartItemDB());
  }, []);

  return (
    <div className='cartItemList'>
      {cartItem.length > 0 &&
        cartItem.map((info, index) => (
          <CartItem info={info} key={index} history={history} />
        ))}
    </div>
  );
};

export default CartItemList;
