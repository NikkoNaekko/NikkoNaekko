import React from 'react';
import PriceList from '../../../shared/PriceList';

const CartTotal = () => {
    
    return (
        <>
            <hr style={{margin:0}}/>
            <div className="cartTotal">
                <div>총 결제금액</div>
                <div className="priceList">
                    <PriceList price={30000}/>
                </div>
            </div>
        </>
    )
}

export default CartTotal;