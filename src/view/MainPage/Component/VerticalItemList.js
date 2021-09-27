import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as itemsAction } from '../../../redux/moduels/items';
import Item from './Item';


const VerticalItemList = ({isBookMark, isNewProduct, isSearchProduct}) => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.items.items)
    const likedItemsID = useSelector(state => state.user.likedItems);
    const [likedItems, setLikedItems] = useState([]);
    
    useEffect(() => {
        if(isNewProduct && items.length === 0){
            dispatch(itemsAction.loadAllClothesDataOnDB());
        }
    }, [])

    useEffect(() => {
        if(isBookMark){
            setLikedItems([]);
            let ary = [];
            likedItemsID.map(clothesToFind => {
                const likedItemsObject = items.filter(item => item.id === clothesToFind);
                ary.push(likedItemsObject[0]);
            })
            setLikedItems([...ary]);
        }
    }, [likedItemsID])
    return (
        <div className="vericalItemList">
            {
                isBookMark && likedItems  &&
                likedItems.map(item => {
                    return <Item item={item} key={item.id} isVertical/>
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
