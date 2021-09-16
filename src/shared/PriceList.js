import React from 'react';

const PriceList = ({price}) => {

    let stringPrice = String(price).split('').reverse().join('');
    stringPrice = stringPrice.replace(/(.{3})/g,"$1,").split('').reverse().join('');

    
    return (
        <>
            {stringPrice} 원
        </>
    )
    
}

PriceList.defaultProps = {
    price:0,
}

export default PriceList
