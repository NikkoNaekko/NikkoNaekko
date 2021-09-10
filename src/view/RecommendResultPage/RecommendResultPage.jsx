import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../shared/button/Button';
import SquareList from './Component/SquareList';
import Title from '../RecommendPage/component/Title';
import { clothesInformation } from '../../data/data';
import { actionCreators as itemsAction } from '../../redux/moduels/items'; 
import './recommendresult.scss';


const RecommendResultPage = ({history}) => {

    const [ isDisabled, setIsDisabled ] = useState(true);
    const { clothes } = clothesInformation;
    const likedMood = useSelector(state => state.items.likedMood);
    const selectedMood = useSelector(state => state.items.selectedMood);
    const dispatch = useDispatch();

    useEffect(()=>{
        for( let i = 0; i < likedMood.length; i++ ) {
            const itemsAry = clothes.filter((c) => { 
                return c.mood === likedMood[i];
            })
            dispatch(itemsAction.addSelectedMood(itemsAry));
        }
    }, [])

    return (
        <div className="recommendResult">
            <div className="container">
                <div className="wrapper">
                    <Title title={'recommendResult'}/>
                    <div className="recommendContent">

                    {selectedMood?.map((sm) => (
                        <div className="contentBox">
                            <div className="recommnedTitle">{sm[0].mood}</div>
                            <SquareList mood={sm}/>
                        </div>    
                    ))}
                    </div>
                </div>

                <Button name="선택완료" title={"recommendResult"} />
            </div>
        </div>
    )
}

export default RecommendResultPage;