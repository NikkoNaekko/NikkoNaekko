import React, {useState, useEffect} from 'react'
import './DetailPage.scss'
import { clothesInformation } from '../../data/data';
import { Carousel } from 'antd';
import TopBar from '../../shared/menu/TopBar'
import ItemInformation from './Sections/ItemInformation';
import ItemDescription from './Sections/ItemDescription';
import PopularProductBanner from './Component/PopularProductBanner';

const DetailPage = (props) => {
    const {clothes} = clothesInformation;
    const itemID = parseInt(props.match.params.id);
    const [item] = clothes.filter((element) => element.id === itemID);
    const [isPopluar, setIsPopluar] = useState(false);
    window.scrollTo({top:0, left:0})

    useEffect(() => {
        if(item.purchased > 99) setIsPopluar(true);
    }, [isPopluar])
    
    return (
        <>
            <TopBar title="니꼬내꼬" history={props.history} rightMenu/>
            <div style={{position:'relative'}}>
                {
                    isPopluar? <PopularProductBanner/> : null
                }
                <Carousel autoplay style={{marginTop:'81px'}}>
                    {item.imgSrc.map((img,index) => {
                        return <img key={index} src={img} className="carouselImg"/>
                    })}
                </Carousel>
            </div>
            <ItemInformation item={item}/>
            <ItemDescription className="Section2"/>
        </>
    )
}

export default DetailPage
