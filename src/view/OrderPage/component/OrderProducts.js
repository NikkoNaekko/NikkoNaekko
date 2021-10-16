import React, { useEffect } from "react";
import Product from "./Product";

const OrderProducts = ({ orderList }) => {
  useEffect(() => {}, []);

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
