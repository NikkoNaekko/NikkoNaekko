import React, {useState, useEffect} from 'react';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userAction } from '../redux/moduels/user';

const LikeButton = ({itemID}) => {
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(false);
    const likedItems = useSelector(state => state.user.likedItems);

    useEffect(() => {
        if(likedItems.includes(itemID)){
            setIsChecked(true)
        } else {
            setIsChecked(false)
        }

    }, [likedItems])

    const onClick = () => {
        if(isChecked){      // 유저가 싫어하면
            setIsChecked(false);
            dispatch(userAction.disLike(itemID))
        } else {            // 유저가 좋아하면
            setIsChecked(true)
            dispatch(userAction.Like(itemID))
        }
    }

    return(
        <>
            <div className="icons-list">
                {isChecked ?  
                <HeartFilled className="iconButton" style={{color:'red'}} onClick={onClick}/> :
                <HeartOutlined className="iconButton" onClick={onClick}/>}
            </div>
        </> 
    )
    
}
export default LikeButton;