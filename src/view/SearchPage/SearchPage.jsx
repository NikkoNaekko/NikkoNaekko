import React, {useEffect} from 'react'
import './SearchPage.scss'
import TopBar from '../../shared/menu/TopBar'
import Header from '../MainPage/Header/Header'
import VerticalItemList from '../MainPage/Component/VerticalItemList'
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../../redux/moduels/items';

const SearchPage = (props) => {
    const dispatch = useDispatch();
    const searchedItems = useSelector(state => state.items.items)
    const searchName = props.match.params.name;
    useEffect(() => {
        dispatch(actionCreators.loadSearchedClothesDataOnDB(searchName))
    }, [searchName])
    return (
        <>
            <TopBar title="니꼬내꼬" history={props.history} rightMenu/>
            <div className="searchBorder">
                <div style={{margin:'var(--margin-item-list)'}}>
                    <Header title={'Search'} />
                    <VerticalItemList isSearchProduct/>
                </div>
            </div>
        </>
    )
}

export default SearchPage
