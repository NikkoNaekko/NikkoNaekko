import React, {useState} from 'react';
import {HeartOutlined, HeartFilled} from '@ant-design/icons';
// import './button.scss'
const LikeButton = () => {

    const [isChecked, setIsChecked] = useState(false);

    const onClick = () => {
        isChecked ? setIsChecked(false) : setIsChecked(true);
    }

    return(
        <>
            <div className="icons-list">
                {isChecked ?  
                <HeartFilled className="likeButton red" onClick={onClick}/> :
                <HeartOutlined className="likeButton" onClick={onClick}/>}
            </div>
        </> 
    )
    
}
export default LikeButton;