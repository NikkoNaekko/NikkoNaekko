import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import PriceList from "../../../shared/PriceList";
import { actionCreators as cartAction } from "../../../redux/moduels/cart";
import { categoryList } from "../../../data/categoryInfomation";

const CartItem = ({ info, history }) => {
  const dispatch = useDispatch();
  const isCheckedAll = useSelector(state => state.cart.isCheckedAll);
  const checkItemList = useSelector(state => state.cart.checkItemList);
  const [isChecked, setIsChecked] = useState(false);
  const id = info.productId;
  const productName = info.productName;

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const handleIsChecked = () => {
    if (isChecked === true) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  useEffect(() => {
    if (isCheckedAll === true) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [isCheckedAll]);

  return (
    <div className='cartItem'>
      <div className='mood'>{categoryList[info.categoryId]}</div>

      <div className='cartContent'>
        <input
          type='checkbox'
          onClick={() => handleIsChecked()}
          checked={checkItemList.includes(id) ? true : false}
          onChange={e => dispatch(cartAction.singleCheck(e.target.checked, id))}
        />
        <img
          src={info.productImage[0]}
          alt='img'
          onClick={() => history.push(`/detail/${id}`)}
        />
        <div
          className='cartContentInfo'
          onClick={() => history.push(`/detail/${id}`)}
        >
          <div className='cartItemTitle'>
            <div className='cartItemBrand'>[{info.brand}] </div>
            <div className='cartItemname'>{truncate(productName, 16)}</div>
          </div>
          <div className='cartItemPrice'>
            <PriceList price={info.productPrice} />
          </div>
        </div>

        <div
          className='cartItemDelete'
          onClick={() => dispatch(cartAction.deleteCartItemDB(id))}
        >
          <CloseOutlined />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
