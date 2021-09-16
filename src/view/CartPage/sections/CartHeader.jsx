import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as cartAction } from '../../../redux/moduels/cart'; 

const CartHeader = () => {
    const dispatch = useDispatch();
    const [ isChecked, setIsChecked ] = useState(false);
    const cartItem = useSelector(state => state.cart.cartItem);
    const checkItemList = useSelector(state => state.cart.checkItemList);
    const itemId = useSelector(state => state.cart.itemId);
    const isCheckedAll = useSelector(state => state.cart.isCheckedAll);

    const handleIsChecked = () => {
        if( isChecked === true ) {
            setIsChecked(false);
        } else {
            setIsChecked(true);
        }
    }

    return (
        <>
            <div className="cartHeader">
                <div className="cartCount">
                    <input 
                        type="checkbox" 
                        onClick={() => handleIsChecked()}
                        checked={( checkItemList.length === itemId.length || isChecked === true ) ? true : false}
                        onChange={(e) => dispatch(cartAction.allCheck(e.target.checked))}
                    />
                    <div className="">{checkItemList.length}/{cartItem.length}</div>
                </div>
                <div className="cartDelete">
                    <span className="deleteSelection" onClick={()=>dispatch(cartAction.deleteCheckedItem())}>선택삭제</span>
                    <span className="deleteAll" onClick={()=> dispatch(cartAction.resetCartItem())}>전체삭제</span>
                </div>
            </div>
            <hr style={{margin:0}}/>
        </>
    )
}

export default CartHeader;