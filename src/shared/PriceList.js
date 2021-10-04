import React from 'react';

const PriceList = ({price}) => {

    let stringPrice = String(price).split('').reverse().join('');
    stringPrice = stringPrice.replace(/(.{3})/g,"$1,").split('').reverse().join('');
    if(stringPrice.length % 4 == 0){
        stringPrice = stringPrice.substring(1);
    }
    
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
