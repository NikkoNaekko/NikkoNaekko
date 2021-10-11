import React from "react";
import TopBar from "../../shared/menu/TopBar";
import "../CartPage/component/CartItem";
import "./orderpage.scss";
import OrderCard from "./section/OrderCard";

const OrderPage = props => {
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
