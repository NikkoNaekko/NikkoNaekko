import React from 'react'
import {clothesInformation} from '../../../data/data'
import Item from './Item';

const VerticalItemList = () => {
    const {clothes} = clothesInformation;
    const sortedClothes = clothes.sort((a,b) => b.uploadDt.getTime() - a.uploadDt.getTime())
    
    return (
        <div className="vericalItemList">
            {
                sortedClothes.map(item => {
                    return <Item item={item} key={item.id} isVertical/>
                })
            }
        </div>
    )
}

export default VerticalItemList
