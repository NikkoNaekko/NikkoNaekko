import React, { useEffect } from "react";
import WOW from "wowjs";
const OrderHeader = ({ orderId, orderDate }) => {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);
  return (
    <div className='orderHeader wow fadeInUp'>
      <div className='orderDate'>[{orderDate}]</div>
      <div className='orderId'>{orderId}</div>
    </div>
  );
};

export default OrderHeader;
