import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../shared/button/Button";
import SquareList from "./Component/SquareList";
import Title from "../RecommendPage/component/Title";
import { actionCreators as itemsAction } from "../../redux/moduels/items";
import "./recommendresult.scss";

const RecommendResultPage = ({ history }) => {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);

  const likedMood = useSelector(state => state.items.likedMood);
  const selectedMood = useSelector(state => state.items.selectedMood);
  const allItems = useSelector(state => state.items.items);
  const likedItems = useSelector(state => state.user.likedItems);
  const tempLikedItems = useSelector(state => state.user.tempLikedItems);

  useEffect(() => {
    dispatch(itemsAction.loadAllClothesDataOnDB());
  }, []);

  useEffect(() => {
    dispatch(itemsAction.resetSelectiedMood());
    for (let i = 0; i < likedMood.length; i++) {
      const itemsAry = allItems?.filter(item => {
        return item.mood === likedMood[i];
      });
      dispatch(itemsAction.addSelectedMood(itemsAry));
    }
  }, [allItems]);

  useEffect(() => {
    if (tempLikedItems.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [tempLikedItems]);

  return (
    <div className='recommendResult'>
      <div className='container'>
        <div className='wrapper'>
          <Title title={"recommendResult"} />
          <div className='recommendContent'>
            {selectedMood?.map(sm => (
              <div className='contentBox'>
                <div className='recommnedTitle'>{sm[0]?.mood}</div>
                <SquareList mood={sm} />
              </div>
            ))}
          </div>
        </div>

        <Button
          name='선택완료'
          isDisabled={isDisabled}
          title={"recommendResult"}
        />
      </div>
    </div>
  );
};

export default RecommendResultPage;
