import React from "react";
const OrderHeader = ({ orderId, orderDate }) => {
  return (
    <div className='orderHeader'>
      <div className='orderDate'>[{orderDate}]</div>
      <div className='orderId'>{orderId}</div>
    </div>
  );
};

export default OrderHeader;
