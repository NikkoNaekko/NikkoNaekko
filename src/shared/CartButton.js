import React, {useState, useEffect} from 'react';
import {ShoppingCartOutlined} from '@ant-design/icons';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as CartAction } from '../redux/moduels/cart';

const CartButton = ({itemID}) => {
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(false);
    const cart = useSelector(state => state.cart.itemId);

    useEffect(() => {
        if(cart.includes(itemID)){
            setIsChecked(true)
        } else {
            setIsChecked(false)
        }
    }, [cart])

    const onClick = () => {
        if(isChecked){      // 장바구니에서 뺀다
            setIsChecked(false);
            dispatch(CartAction.tackingOutToCart(itemID))
        } else {            // 장바구니에 넣는다
            setIsChecked(true)
            dispatch(CartAction.putInInCart(itemID))
        }
    }

    return(
        <>
            {isChecked ?  
            <ShoppingCartIcon className="iconButton" style={{fontSize:'35px'}} onClick={onClick}/> :
            <ShoppingCartOutlinedIcon className="iconButton" style={{fontSize:'35px'}}  onClick={onClick}/>}
        </> 
    )
    
}

export default CartButton
