import React from "react";
import { useSelector } from "react-redux";
import TopBar from "../../shared/menu/TopBar";
import "../CartPage/component/CartItem";
import "./orderpage.scss";
import OrderCard from "./section/OrderCard";

const OrderPage = props => {
  const isLogin = useSelector(state => state.user.isLogin);
  if (!isLogin) {
    alert("로그인 후 이용해주세요.");
    props.history.replace("/login");
  }
  return (
    <div className='order'>
      <div className='container'>
        <div className='wrapper'>
          <TopBar title='구매내역' history={props.history} rightMenu />
          <OrderCard />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
