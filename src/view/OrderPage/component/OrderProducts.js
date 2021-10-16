import React from "react";
import Product from "./Product";

const OrderProducts = ({ orderList }) => {
  return (
    <React.Fragment>
      <div className='orderProducts'>
        {orderList.map(order => (
          <Product order={order} key={order.productId} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default OrderProducts;
