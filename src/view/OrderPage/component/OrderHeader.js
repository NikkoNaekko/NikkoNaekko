import React from "react";

const OrderHeader = props => {
  return (
    <div className='orderHeader'>
      <div className='orderDate'>[{props?.info.order_Dt}]</div>
      <div className='orderId'>{props?.info.id}</div>
    </div>
  );
};

export default OrderHeader;
