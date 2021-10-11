import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "./Product";
import { actionCreators as orderActions } from "../../../redux/moduels/order";

const OrderProducts = ({ order }) => {
  const dispatch = useDispatch();
  const filteredData = useSelector(state => state.order.filteredData);

  useEffect(() => {
    for (let i = 0; i < order.orderItem_id.length; i++) {
      dispatch(orderActions.addOneClothesDataOnState(order.orderItem_id[i]));
    }
  }, []);

  return (
    <React.Fragment>
      <div className='orderProducts'>
        {filteredData.map(data => (
          <Product item={data} key={data.id} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default OrderProducts;
