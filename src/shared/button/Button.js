import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PriceList from "../PriceList";
import "./button.scss";
import { actionCreators as userAcions } from "../../redux/moduels/user";
import { actionCreators as cartAcions } from "../../redux/moduels/cart";
import { LoadingOutlined } from "@ant-design/icons";

const Button = ({ name, isDisabled, title, history }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(state => state.cart.cartItem);
  const likedMood = useSelector(state => state.items.likedMood);
  // const tempLikedItems = useSelector(state => state.user.tempLikedItems);
  const isLoading = useSelector(state => state.cart.isLoading);
  const userIsLoading = useSelector(state => state.user.isLoading);
  const likedItemsID = useSelector(state => state.user.likedItemsID);

  const totalPrice = cartItem.reduce((acc, cur) => {
    return acc + parseInt(cur.productPrice);
  }, 0);

  const requestOrder = () => {
    if (
      window.confirm(
        cartItem.length + "개의 상품을 " + totalPrice + "원에 구매하시겠습니까?"
      )
    ) {
      dispatch(cartAcions.addOrderDataOnDB());
    }
  };

  const uploadLikedItems = () => {
    if (likedItemsID.length > 0) {
      dispatch(userAcions.likesOnDB(likedItemsID));
    }
  };

  if (title === "recommend") {
    return (
      <button
        className={isDisabled ? `btn btn_gray` : `btn btn_pink`}
        onClick={() =>
          likedMood.length > 0 ? history.push("/recommendResult") : ""
        }
      >
        {name}
      </button>
    );
  } else if (title === "recommendResult") {
    return (
      <>
        {userIsLoading ? (
          <button className='btn btn_gray'>
            선택 추가 중
            <LoadingOutlined
              style={{
                position: "relative",
                left: "30px",
                fontSize: "20px"
              }}
            />
          </button>
        ) : (
          <button
            className={isDisabled ? `btn btn_gray` : `btn btn_pink`}
            onClick={() => uploadLikedItems()}
          >
            {name}
          </button>
        )}
      </>
    );
  } else if (title === "cart") {
    return (
      <>
        {!isLoading && cartItem.length > 0 && (
          <button className='btn' onClick={requestOrder}>
            총 {cartItem.length}개 | <PriceList price={totalPrice} /> 구매하기
          </button>
        )}
        {(cartItem.length === 0 || !cartItem) && (
          <button className='btn btn_gray'>
            총 {cartItem.length}개 | <PriceList price={totalPrice} /> 구매하기
          </button>
        )}
        {isLoading && cartItem.length > 0 && (
          <button className='btn btn_gray'>
            구매 중
            <LoadingOutlined
              style={{
                position: "relative",
                left: "30px",
                fontSize: "20px"
              }}
            />
          </button>
        )}
      </>
    );
  } else {
    return (
      <button
        className='btn'
        // style={{'backgroundColor' : `${isDisabled ? 'var(--color-button-gray)' : '--color-button-pink'}`}}
        onClick={() => history.push("/main")}
      >
        {" "}
        {name}
      </button>
    );
  }
};

Button.defaultProps = {
  name: "",
  title: "",
  isDisabled: true
};

export default withRouter(Button);
