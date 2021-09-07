import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import {clothesInformation} from '../../../data/data'
import Item from './Item';


const VerticalItemList = ({isBookMark, isNewProduct}) => {
    const likedItemsID = useSelector(state => state.user.likedItems);
    const {clothes} = clothesInformation;
    const Clothes = clothes.sort((a,b) => b.uploadDt.getTime() - a.uploadDt.getTime())
    const [likedItems, setLikedItems] = useState([]);
    useEffect(() => {
        if(isBookMark){
            setLikedItems([]);
            likedItemsID.map(clothesToFind => {
                const likedItemsObject = clothes.filter(item => item.id === clothesToFind);
                setLikedItems(prevState => 
                    [...prevState, likedItemsObject]
                )
            })
        }
    }, [likedItemsID])
    return (
        <div className="vericalItemList">
            {
                isBookMark && likedItems &&
                likedItems.map(item => {
                    return <Item item={item[0]} key={item.id} isVertical/>
                })
            }
            {
                isNewProduct &&
                Clothes.map(item => {
                    return <Item item={item} key={item.id} isVertical/>
                })
            }
        </div>
    )

}

VerticalItemList.defaultProps = {
    isBookMark:null,
    isNewProduct:null,
}


export default VerticalItemList
