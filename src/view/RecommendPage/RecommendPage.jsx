import React, { useState, useEffect } from 'react';
import Title from './component/Title';
import VerticalList from './component/VerticalList';
import Button from '../../shared/button/Button';
import { clothesInformation } from '../../data/data';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as itemsAction } from '../../redux/moduels/items'; 
import './recommend.scss';

const moodCollection = [ '꾸안꾸', '미니멀', '스트릿', '아메카지', '오피스룩', '캐주얼' ];

const RecommendPage = ({history}) => {
    const { clothes } = clothesInformation;
    const [ isDisabled, setIsDisabled ] = useState(true);
    const [ selectedItem, setSelectedItem ] = useState([]);
    const likedMood = useSelector(state => state.items.likedMood);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(likedMood.length > 0) {
            console.log(likedMood.length);
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [likedMood])

    useEffect(() => {
        dispatch(itemsAction.resetLikedMood());
        dispatch(itemsAction.resetSelectiedMood());
        for(let i = 0; i < moodCollection.length; i++){
            const clothesAry = clothes.filter((c) => c.mood === moodCollection[i]);
            const index = Math.floor(Math.random() * clothesAry.length);
            setSelectedItem((prevState) => 
                [...prevState, clothesAry[index]]
            )
        }
    }, [])

    return (
        <div className="recommend">
            <div className="container">
                <div className="wrapper">
                    <Title title={'recommend'}/>
                    <div className="recommendContent">
                        <div className="contentBox">
                            <VerticalList selectedItem={selectedItem}/>
                        </div>
                    </div>
                </div>
                
                <Button name="선택완료" isDisabled={isDisabled} title={"recommend"}/>
            </div>
        </div>
    )
}

export default RecommendPage;