import React, { useEffect } from "react";
import "./cartpage.scss";
import TopBar from "../../shared/menu/TopBar";
import Button from "../../shared/button/Button";
import CartHeader from "./sections/CartHeader";
import CartItemList from "./sections/CartItemList";
import CartTotal from "./sections/CartTotal";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as CartAction } from "../../redux/moduels/cart";
import Spinner from "../../shared/Spinner";

const CartPage = ({ history }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.user.isLogin);
  const isLoading = useSelector(state => state.cart.isLoading);
  useEffect(() => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요.");
      history.replace("/login");
    }
    // dispatch(CartAction.loadClothesInCartDB());
  }, []);

  return (
    <div className='cart'>
      <div className='container'>
        <div className='wrapper'>
          <TopBar title='장바구니' history={history} rightMenu />
          <CartHeader />
          {isLoading ? (
            <Spinner full={true} />
          ) : (
            <CartItemList history={history} />
          )}
          <CartTotal />
        </div>
        <Button items={"3"} title={"cart"} />
      </div>
    </div>
  );
};

export default CartPage;
