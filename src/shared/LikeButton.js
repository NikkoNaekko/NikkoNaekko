import React, {useState, useEffect} from 'react';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as itemsAction } from '../redux/moduels/items';
import { actionCreators as userAction } from '../redux/moduels/user';
import './button/button.scss';

const LikeButton = ({item, title, itemID}) => {
    const [isChecked, setIsChecked] = useState(false);
    const dispatch = useDispatch();
    const likedItems = useSelector(state => state.user.likedItems);

    useEffect(() => {
        if(likedItems.includes(itemID)){
            setIsChecked(true)
        } else {
            setIsChecked(false)
        }
    }, [likedItems])

    const handleLike = () => {
        if( title === "recommend" ) {
            const mood = item.mood;;

            if(!isChecked) { //유저가 좋아하면
                dispatch(itemsAction.addMood(mood));
                setIsChecked(true);
                
            } else { //유저가 싫어하면
                dispatch(itemsAction.deleteMood(mood));
                setIsChecked(false);
            }

        } else if( title === "recommendResult" ) {
            if(!isChecked) { //유저가 좋아하면
                setIsChecked(true);
            } else { //유저가 싫어하면
                setIsChecked(false);
            }

        } else {
            if(!isChecked) {
                setIsChecked(true);
                dispatch(userAction.Like(itemID));
            } else {
                setIsChecked(false);
                dispatch(userAction.disLike(itemID));
            }
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