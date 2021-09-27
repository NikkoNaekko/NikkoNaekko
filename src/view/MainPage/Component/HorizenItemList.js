import React, {useEffect} from 'react'
import { useSelector ,useDispatch } from 'react-redux';
import {clothesInformation} from '../../../data/data'
import { actionCreators as itemsAction} from '../../../redux/moduels/items';
import Item from './Item';

const HorizenItemList = () => {
    const dispatch = useDispatch();
    const {clothes} = clothesInformation;
    const sortedClothes = clothes.sort((a,b) => b.liked - a.liked);
    const popluarItems = useSelector(state => state.items.popluarItems);
    
    useEffect(() => {
        dispatch(itemsAction.loadPopularClothesDataOnDB());
    }, [])

    return (
        <div className="HorizenItemList">
            {
                popluarItems && popluarItems.map(item => {
                    return <Item item={item} key={item.id} isHorizen/>
                })
            }
        </div>
    )
}

export default HorizenItemList
