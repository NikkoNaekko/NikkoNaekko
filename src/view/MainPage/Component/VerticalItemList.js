import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {clothesInformation} from '../../../data/data'
import { actionCreators as itemsAction } from '../../../redux/moduels/items';
import Item from './Item';


const VerticalItemList = ({isBookMark, isNewProduct, isSearchProduct}) => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.items.items)
    const likedItemsID = useSelector(state => state.user.likedItems);
    const {clothes} = clothesInformation;
    const [likedItems, setLikedItems] = useState([]);
    useEffect(() => {
        if(isBookMark){
            setLikedItems([]);
            likedItemsID.map(clothesToFind => {
                const likedItemsObject = items.filter(item => item.id === clothesToFind);
                setLikedItems(prevState => 
                    [...prevState, likedItemsObject]
                )
            })
        }
        else{
            dispatch(itemsAction.loadAllClothesDataOnDB());
        }
    }, [likedItemsID])
    return (
        <div className="vericalItemList">
            {
                isBookMark && likedItems.length > 0 &&
                likedItems.map(item => {
                    return <Item item={item[0]} key={item.id} isVertical/>
                })
            }
            {
                (isNewProduct || isSearchProduct) &&
                items.map(item => {
                    return <Item item={item} key={item.id} isVertical/>
                })
            }
        </div>
    )

}

VerticalItemList.defaultProps = {
    isBookMark:null,
    isNewProduct:null,
    isSearchProduct:null,
}


export default VerticalItemList
