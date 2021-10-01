import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { clothesInformation } from '../../../data/data';
import { actionCreators as cartAction } from '../../../redux/moduels/cart'; 

import CartItem from '../component/CartItem';

const CartItemList = ({history}) => {
    // const { clothes } = clothesInformation;
    const itemId = useSelector(state => state.cart.itemId);
    const cartItem = useSelector(state => state.cart.cartItem);
    const dispatch = useDispatch();

    useEffect(() => {
        if(itemId.length > 0) {
            dispatch(cartAction.loadCartItemDB());
        }
    }, [])


    // useEffect(()=>{
    //     for(let i = 0; i < itemId.length; i++){
    //         const cartAry = clothes.filter((c) => c.id === itemId[i]);

    //         if(cartItem.includes(cartAry[0]) === false) {
    //             dispatch(cartAction.addCartItem(cartAry[0]))
    //         }
    //     }
    // },[]);

    return (
        <div className="cartItemList">
             {cartItem.length > 0 && cartItem.map((info,index)=>(
                 <CartItem info={info} key={index} history={history}/>
             ))}
        </div>
    )
}

export default CartItemList;