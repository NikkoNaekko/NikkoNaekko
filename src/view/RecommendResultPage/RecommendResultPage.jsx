import React, { useState } from 'react';
import Button from '../../shared/button/Button';
import Favorite from '@material-ui/icons/Favorite';
import './recommendresult.scss';

const RecommendResultPage = () => {
    const [ isDisabled, setIsDisabled ] = useState(true);
    const [ liked, setLiked ] = useState(false);

    return (
        <div className="recommendResult">
            <div className="container">
                <div className="wrapper">

                    <div className="recommendResultTitle">
                        <span className="titleIcon"><Favorite/></span>
                        <h2 className="titleHead">선택한 스타일의<br/> 옷들을 모아봤어요!</h2>
                        <p className="titleDesc">원하시는 옷을<br/> 즐겨찾기할 수 있어요</p>
                    </div>

                    <div className="recommendContent">
                        <div className="contentBox">
                            <h3 className="contentTitle">오피스룩</h3>
                            <div className="contentGrid">
                                <div className="gridItem">
                                    <span className="likedIcon">{ liked ? <Favorite/> : "" }</span>
                                </div>
                                <div className="gridItem">
                                    <span className="likedIcon">{ liked ? <Favorite/> : "" }</span>
                                </div>
                                <div className="gridItem">
                                    <span className="likedIcon">{ liked ? <Favorite/> : "" }</span>
                                </div>
                                <div className="gridItem">
                                    <span className="likedIcon">{ liked ? <Favorite/> : "" }</span>
                                </div>
                                <div className="gridItem">
                                    <span className="likedIcon">{ liked ? <Favorite/> : "" }</span>
                                </div>
                                <div className="gridItem">
                                    <span className="likedIcon">{ liked ? <Favorite/> : "" }</span>
                                </div>
                                <div className="gridItem">
                                    <span className="likedIcon">{ liked ? <Favorite/> : "" }</span>
                                </div>
                                <div className="gridItem">
                                    <span className="likedIcon">{ liked ? <Favorite/> : "" }</span>
                                </div>
                                <div className="gridItem">
                                    <span className="likedIcon">{ liked ? <Favorite/> : "" }</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                

                <Button name="선택완료" isDisabled={isDisabled} />
            </div>
        </div>
    )
}

export default RecommendResultPage;