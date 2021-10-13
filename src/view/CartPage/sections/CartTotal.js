import React from "react";
import PriceList from "../../../shared/PriceList";
import { useSelector } from "react-redux";

const CartTotal = () => {
  const cartItem = useSelector(state => state.cart.cartItem);

  const totalPrice = cartItem.reduce((acc, cur) => {
    return acc + parseInt(cur.productPrice);
  }, 0);

  return (
    <>
      <hr style={{ margin: 0 }} />
      <div className='cartTotal'>
        <div>총 결제금액</div>
        <div className='priceList'>
          <PriceList price={totalPrice} />
        </div>
      </div>
    </>
  );
};

export default CartTotal;
