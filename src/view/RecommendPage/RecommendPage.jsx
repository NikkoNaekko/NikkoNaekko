import React, { useState } from 'react';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Button from '../../shared/button/Button';
import './recommend.scss'
import { clothesInformation } from '../../data/data';

const RecommendPage = () => {

    console.log(clothesInformation.clothes);
    const minimalClothes = clothesInformation.clothes.filter((c) => c === "mood"
    );
    console.log(minimalClothes);
    // const index = Math.random() * minimalClothes.length;

    const [ isDisabled, setIsDisabled ] = useState(true);

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
                        {/* {modeInformation.map((info) => (
                            <div className="contentBox" key={info.id}>
                                <div className="contentThumb">
                                    <img src={info.imgSrc} alt={info.mood} className="contentImage"/>
                                    <div className="contentLiked"><FavoriteBorder/></div>
                                </div>
                                <div className="contentTitle">{info.mood}</div>
                            </div>
                        ))} */}
                    </div>
                </div>
                
                <Button name="선택완료" isDisabled={isDisabled}/>
            </div>
        </div>
    )
}

export default RecommendPage;