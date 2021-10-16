import React, { useState, useEffect } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as CartAction } from "../redux/moduels/cart";

const CartButton = ({ itemID }) => {
  const isLogin = useSelector(state => state.user.isLogin);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const cart = useSelector(state => state.cart.itemId);

  useEffect(() => {
    if (cart.includes(itemID)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [cart, itemID]);

  const onClick = () => {
    if (!isLogin) {
      alert("로그인 후 이용하실 수 있습니다.");
      return;
    }
    if (isChecked) {
      // 장바구니에서 뺀다
      setIsChecked(false);
      dispatch(CartAction.tackingOutToCartDB(itemID));
    } else {
      // 장바구니에 넣는다
      setIsChecked(true);
      dispatch(CartAction.putInInCartDB(itemID));
    }
  };

  return (
    <>
      {isChecked ? (
        <ShoppingCartIcon
          className='iconButton'
          style={{ fontSize: "35px" }}
          onClick={onClick}
        />
      ) : (
        <ShoppingCartOutlinedIcon
          className='iconButton'
          style={{ fontSize: "35px" }}
          onClick={onClick}
        />
      )}
    </>
  );
};

export default CartButton;
