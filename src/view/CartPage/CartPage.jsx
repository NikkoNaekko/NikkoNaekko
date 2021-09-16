import React from 'react';
import './cartpage.scss';
import { Checkbox } from 'antd';
import TopBar from '../../shared/menu/TopBar';
import Button from '../../shared/button/Button';
import CartHeader from './sections/CartHeader';
import CartItemList from './sections/CartItemList';
import CartTotal from './sections/CartTotal';

const CartPage = (props) => {

    return (
        <div className="cart">
            <div className="container">
                <div className="wrapper">
                    <TopBar title="장바구니" history={props.history} rightMenu/>   
                    <CartHeader/>
                    <CartItemList/>
                    <CartTotal/>
                </div>
                <Button items={"3"} title={"cart"}/>
            </div>
        </div>
    )
}

export default CartPage;