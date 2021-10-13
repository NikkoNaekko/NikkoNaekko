import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PriceList from "../PriceList";
import "./button.scss";
import { actionCreators as userAcions } from "../../redux/moduels/user";

const Button = ({ name, isDisabled, title, history }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(state => state.cart.cartItem);
  const likedMood = useSelector(state => state.items.likedMood);
  const tempLikedItems = useSelector(state => state.user.tempLikedItems);

  const totalPrice = cartItem.reduce((acc, cur) => {
    return acc + parseInt(cur.productPrice);
  }, 0);

  const uploadLikedItems = () => {
    dispatch(userAcions.uploadTemp(tempLikedItems));

    if (tempLikedItems.length > 0) {
      history.push("/main");
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
      <button
        className={isDisabled ? `btn btn_gray` : `btn btn_pink`}
        onClick={() => uploadLikedItems()}
      >
        {name}
      </button>
    );
  } else if (title === "cart") {
    return (
      <button className='btn' onClick={() => history.push("/order")}>
        총 {cartItem.length}개 | <PriceList price={totalPrice} /> 구매하기
      </button>
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
