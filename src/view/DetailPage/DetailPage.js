import React, {useState, useEffect} from 'react'
import './DetailPage.scss'
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as itemsAction } from '../../redux/moduels/items';
import { Carousel } from 'antd';
import TopBar from '../../shared/menu/TopBar'
import ItemInformation from './Sections/ItemInformation';
import ItemDescription from './Sections/ItemDescription';
import PopularProductBanner from './Component/PopularProductBanner';


const DetailPage = (props) => {
    const dispatch = useDispatch();
    const item = useSelector(state => state.items.selectedItems);
    const [isPopluar, setIsPopluar] = useState(false);
    window.scrollTo({top:0, left:0})

    useEffect(() => {
        dispatch(itemsAction.loadOneClothesDataOnDB(props.match.params.id))
        // if(item.purchased > 99) setIsPopluar(true);
    }, [])
    
    return (
        <>
            <TopBar title="니꼬내꼬" history={props.history} rightMenu/>
            <div style={{position:'relative'}}>
                {
                    isPopluar? <PopularProductBanner/> : null
                }
                {
                    item.imgSrc &&
                    <Carousel autoplay style={{marginTop:'81px'}}>
                        {item.imgSrc.map((img,index) => {
                            return <img key={index} src={img} className="carouselImg"/>
                        })}
                    </Carousel>
                }
            </div>
            <ItemInformation item={item}/>
            <ItemDescription className="Section2"/>
        </>
    )
}

export default DetailPage
