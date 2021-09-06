import React from 'react'
import {clothesInformation} from '../../../data/data'
import Item from './Item';

const HorizenItemList = () => {
    const {clothes} = clothesInformation;
    const sortedClothes = clothes.sort((a,b) => b.liked - a.liked)

    return (
        <div className="HorizenItemList">
             {
                sortedClothes.map(item => {
                    return <Item item={item} key={item.id} isHorizen/>
                })
            }
        </div>
    )
}

export default HorizenItemList
