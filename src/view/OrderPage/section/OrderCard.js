import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderHeader from "../component/OrderHeader";
import OrderProducts from "../component/OrderProducts";
import { actionCreators as orderActions } from "../../../redux/moduels/order";

const OrderCard = props => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.orders);

  useEffect(() => {
    dispatch(orderActions.loadAllOrdersDataOnDB());
  }, []);

  return (
    <React.Fragment>
      {orders.map(order => (
        <div className='orderCard' key={order.id}>
          <OrderHeader info={order} />
          <OrderProducts order={order} />
        </div>
      ))}
    </React.Fragment>
  );
};

export default OrderCard;
