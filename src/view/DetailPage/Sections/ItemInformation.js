import React from 'react'
import LikeButton from '../../../shared/LikeButton';
import '../DetailPage.scss'
import PriceList from '../../../shared/PriceList';
import CartButton from '../../../shared/CartButton'
const ItemInformation = ({item}) => {
    return (
        <>
            <div className='detailBorder'>
                <p className="font gray">{item.brand}</p>
                <p className="font bold">{item.name}</p>
                <div className='detailBorderHorizen'>
                    <div className="icons">
                        <div className="liked">
                            <LikeButton itemID={item.id} />
                            {item.liked}
                        </div>
                        <div className="purchased">
                            <CartButton itemID={item.id}/>
                            {item.purchased}
                        </div>
                    </div>
                    <div className="price">
                        <p className="font red"><PriceList price={item.price}/></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemInformation
