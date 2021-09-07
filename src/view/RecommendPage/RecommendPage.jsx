import React, { useState, useEffect } from 'react';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Button from '../../shared/button/Button';
import './recommend.scss'
import { clothesInformation } from '../../data/data';
const moodCollection = [
    '꾸안꾸', '미니멀', '스트릿', '아메카지', '오피스룩', '캐주얼'
]


const RecommendPage = () => {
    const { clothes } = clothesInformation;
    const [ isDisabled, setIsDisabled ] = useState(true);
    const [selectedItem, setSelectedItem] = useState([]);

    useEffect(() => {
        for(let i = 0; i < moodCollection.length; i++){
            const clothesAry = clothes.filter((c) => c.mood === moodCollection[i]);
            const index = Math.floor(Math.random() * clothesAry.length);
            setSelectedItem((prevState) => 
                [...prevState, clothesAry[index]] 
            )
            console.log(selectedItem);
        }
    }, [])

    return (
        <div className="recommend">
            <div className="container">
                <div className="wrapper">
                    <div className="recommendTitle">
                        <span className="titleIcon"><Favorite/></span>
                        <h2 className="titleHead">좋아하는 스타일을<br/> 알려주세요!</h2>
                        <p className="titleDesc">니꼬내꼬가 취향에 맞는<br/> 상품을 찾아올게요</p>
                    </div>

                    <div className="recommendContent">
                        {selectedItem.map((info) => (
                            <div className="contentBox" key={info.id}>
                                <div className="contentThumb">
                                    <img src={info.imgSrc[0]} alt={info.mood} className="contentImage"/>
                                    <div className="contentLiked"><FavoriteBorder/></div>
                                </div>
                                <div className="contentTitle">{info.mood}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <Button name="선택완료" isDisabled={isDisabled}/>
            </div>
        </div>
    )
}

export default RecommendPage;