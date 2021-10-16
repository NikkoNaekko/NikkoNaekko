import React from "react";
import { useSelector } from "react-redux";
import OrderHeader from "../component/OrderHeader";
import OrderProducts from "../component/OrderProducts";
import { Empty } from "antd";

const OrderCard = () => {
  const orders = useSelector(state => state.order.orders);
  const isLoading = useSelector(state => state.order.isLoading);

  return (
    <React.Fragment>
      {orders &&
        orders.map(order => (
          <div className='orderCard' key={order.orderId}>
            <OrderHeader orderId={order.orderId} orderDate={order.orderDate} />
            <OrderProducts orderList={order.productDetailList} />
          </div>
        ))}
      {!orders && !isLoading && (
        <div className='emptyBorder'>
          <Empty description={false} />
          <h3>구매내역 기록이 없습니다.</h3>
        </div>
      )}
    </React.Fragment>
  );
};

export default OrderCard;
