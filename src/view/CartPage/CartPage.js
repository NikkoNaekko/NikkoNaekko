import React from "react";
import "./cartpage.scss";
import TopBar from "../../shared/menu/TopBar";
import Button from "../../shared/button/Button";
import CartHeader from "./sections/CartHeader";
import CartItemList from "./sections/CartItemList";
import CartTotal from "./sections/CartTotal";
import { useSelector } from "react-redux";

const CartPage = ({ history }) => {
  const isLogin = useSelector(state => state.user.isLogin);
  if (!isLogin) {
    alert("로그인 후 이용해주세요.");
    history.replace("/login");
  }

  return (
    <div className='cart'>
      <div className='container'>
        <div className='wrapper'>
          <TopBar title='장바구니' history={history} rightMenu />
          <CartHeader />
          <CartItemList history={history} />
          <CartTotal />
        </div>
        <Button items={"3"} title={"cart"} />
      </div>
    </div>
  );
};

export default CartPage;
