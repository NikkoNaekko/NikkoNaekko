import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as orderAction } from "../../redux/moduels/order";
import TopBar from "../../shared/menu/TopBar";
import "../CartPage/component/CartItem";
import "./orderpage.scss";
import OrderCard from "./section/OrderCard";
import { LoadingOutlined } from "@ant-design/icons";

const OrderPage = props => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.user.isLogin);
  const isLoading = useSelector(state => state.order.isLoading);
  if (!isLogin) {
    alert("로그인 후 이용해주세요.");
    props.history.replace("/login");
  }
  useEffect(() => {
    dispatch(orderAction.loadOrderOnDB());
  }, []);
  return (
    <div className='order'>
      <div className='container'>
        <div className='wrapper'>
          <TopBar title='구매내역' history={props.history} rightMenu />
          {isLoading ? (
            <div className='spinnerBorder'>
              <LoadingOutlined style={{ fontSize: "40px" }} />
              <h3>주문 내역을 불러오는 중입니다!</h3>
            </div>
          ) : (
            <OrderCard />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
