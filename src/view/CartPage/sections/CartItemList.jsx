import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clothesInformation } from '../../../data/data';
import { actionCreators as cartAction } from '../../../redux/moduels/cart'; 

import CartItem from '../component/CartItem';

const CartItemList = () => {
    const { clothes } = clothesInformation;
    const itemId = useSelector(state => state.cart.itemId);
    const cartItem = useSelector(state => state.cart.cartItem);
    const dispatch = useDispatch();

    useEffect(()=>{
        for(let i = 0; i < itemId.length; i++){
            const cartAry = clothes.filter((c) => c.id === itemId[i]);
            dispatch(cartAction.addCartItem(cartAry[0]))
        }
    },[]);

    return (
        <div className="cartItemList">
            {cartItem.map((info)=>(
                <CartItem info={info}/>
            ))}
        </div>
    )
}

export default CartItemList;