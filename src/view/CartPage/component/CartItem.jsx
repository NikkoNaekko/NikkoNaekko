import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import PriceList from '../../../shared/PriceList';
import { actionCreators as cartAction } from '../../../redux/moduels/cart';
import { clothesInformation } from '../../../data/data';

const CartItem = ({info}) => {
    const dispatch = useDispatch();
    const { clothes } = clothesInformation;
    const isCheckedAll = useSelector(state => state.cart.isCheckedAll);
    const cartItem = useSelector(state => state.cart.cartItem);
    const itemId = useSelector(state => state.cart.itemId);
    const [ isChecked, setIsChecked ] = useState(false);
    const id = info.id;

    const handleIsChecked = () => {
        if( isChecked === true ) {
            setIsChecked(false)
        } else {
            setIsChecked(true);
        }
    }

    useEffect(() => {
        if(isCheckedAll === true) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [isCheckedAll])

    return (
        <div className="cartItem">
            <div className="mood">{info.mood}</div>

            <div className="cartContent">
                <input 
                    type="checkbox"
                    onClick={() => handleIsChecked()}
                    checked={ isChecked === true ? true : false}
                    onChange={(e)=>dispatch(cartAction.singleCheck(e.target.checked, id))}
                />
                <img src={info.imgSrc[0]} alt="img" />
                <div className="cartContentInfo">
                    <div className="cartItemTitle">
                        <div className="cartItemBrand">[{info.brand}] </div>
                        <div className="cartItemname">{info.name}</div>
                    </div>
                    <div className="cartItemPrice">
                        <PriceList price={info.price}/>
                    </div>
                </div>
                
                <div className="cartItemDelete" onClick={()=>dispatch(cartAction.deleteCartItem(id))}>
                    <CloseOutlined />
                </div>
            </div>
        </div> 
    )
}

export default CartItem;