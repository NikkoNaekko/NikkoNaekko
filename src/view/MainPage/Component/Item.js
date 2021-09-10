import React from 'react'
import { Link } from 'react-router-dom';
import LikeButton from '../../../shared/LikeButton';
import PriceList from '../../../shared/PriceList';

const Item = ({item, isVertical, isHorizen}) => {
    let truncatedString = '';
    if(item.name.length > 7){
        if(item.name[7] !== ' '){
            truncatedString = item.name.substr(0,8) + '...';
        } else {
            truncatedString = item.name.substr(0,7) + '...';
        }
    } else {
        truncatedString = item.name;
    }

    if(isHorizen){
        return (
            <div className="item" style={{marginRight:'20px'}}>
                <Link to={`/detail/${item.id}`}>
                    <img src={item.imgSrc[0]}/>
                </Link>
                <div style={{width:'120px'}}>
                    <p className="font">[{item.brand}]</p>
                    <p className="font">{truncatedString}</p>
                    <p style={{color:'red'}}><PriceList price={item.price}/></p>
                    {/* <p >{item.price}원</p> */}
                    <div className="likedDiv">
                        <LikeButton itemID={item.id}/> 
                        <span style={{marginLeft:'10px'}}>{item.liked}</span>
                    </div>
                </div>
            </div>
        )
    }

    else if(isVertical){
        return (
            <div className="item">
                <Link to={`/detail/${item.id}`}>
                    <img src={item.imgSrc[0]}/>
                </Link>
                <div style={{width:'120px'}}>
                    <p className="font">[{item.brand}]</p>
                    <p className="font">{truncatedString}</p>
                    <p style={{color:'red'}}><PriceList price={item.price}/></p>
                    <div className="likedDiv">
                        <LikeButton itemID={item.id}/> 
                        <span style={{marginLeft:'10px'}}>{item.liked}</span>
                    </div>
                </div>
            </div>
        )
    }
}

Item.defaultProps = {
    isVertical:null,
    isHorizen:null
}

export default Item
