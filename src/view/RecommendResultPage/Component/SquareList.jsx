import React from 'react';
import LikeButton from '../../../shared/LikeButton';

const SquareList = ({history, mood}) => {

    return (  
        <div className="squareList">
            {mood?.map((m) => (
                <div className="item">
                    <img src={m.imgSrc[0]} alt={m.name}/>
                    <LikeButton title={"recommendResult"}/>
                </div>
            ))}
        </div>
    )
}

export default SquareList