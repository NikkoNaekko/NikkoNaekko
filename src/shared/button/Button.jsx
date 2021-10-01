import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PriceList from '../PriceList';
import './button.scss';

const Button = ({name, isDisabled, title, history}) => {

    const cartItem = useSelector(state => state.cart.cartItem);

    const totalPrice = cartItem.reduce((acc, cur) => {
        return acc+parseInt(cur.price);
    }, 0)

    if( title === "recommend" ) {
        return (
            <button 
                className={ isDisabled ? `btn btn_gray` : `btn btn_pink` } 
                onClick={() => history.push('/recommendResult')}
            >{name}
            </button>
        )

    } else if( title === "recommendResult" ) {
        return (
            <button 
                className="btn"
                onClick={() => history.push('/main')}
            >{name}
            </button>
        )

    } else if( title === "cart" ) {
        return (
            <button 
                className="btn"
                onClick={() => history.push('/main')}
            >총 {cartItem.length}개 | <PriceList price={totalPrice}/> 구매하기
            </button>
        )

    } else {
        return (
            <button 
                className="btn" 
                // style={{'backgroundColor' : `${isDisabled ? 'var(--color-button-gray)' : '--color-button-pink'}`}}
                onClick={() => history.push('/main')}
            > {name}
            </button>
        )
    }
}

Button.defaultProps = {
    name: "",
    title: "",
    isDisabled : true,
}

export default withRouter(Button);