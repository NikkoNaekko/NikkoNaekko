import React, {useState} from 'react';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { actionCreators as itemsAction } from '../redux/moduels/items';

const LikeButton = ({item, title}) => {
    const [isChecked, setIsChecked] = useState(false);
    const dispatch = useDispatch();

    const handleLike = () => {
        if(title === "recommend") {
            const mood = item.mood;;

            if(!isChecked) {
                dispatch(itemsAction.addMood(mood));
                setIsChecked(true);
            } else {
                dispatch(itemsAction.deleteMood(mood));
                setIsChecked(false);
            }

        } else {
            isChecked ? setIsChecked(false) : setIsChecked(true);
        }
    }

    return(
      
        <div className="icons-list">
            {isChecked 
                ? <HeartFilled className="likeButton red" onClick={handleLike}/> 
                : <HeartOutlined className={ title === "recommendResult" ? "likeButton transparent" : "likeButton" } onClick={handleLike}/>
            }
        </div>
        
    )
    
}

LikeButton.defafultProps = {
    title : "",
    item: [],
}

export default LikeButton;