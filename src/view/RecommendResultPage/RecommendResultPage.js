import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../shared/button/Button";
import SquareList from "./Component/SquareList";
import Title from "../RecommendPage/component/Title";
import { actionCreators as itemsAction } from "../../redux/moduels/items";
import Spinner from "../../shared/Spinner";
import { categoryList } from "../../data/categoryInfomation";
import "./recommendresult.scss";

const RecommendResultPage = ({ history }) => {
  const isLogin = useSelector(state => state.user.isLogin);
  if (!isLogin) {
    alert("로그인 후 이용해주세요.");
    history.replace("/login");
  }

  const isFirst = useSelector(state => state.user.isFirst);
  if (!isFirst) {
    alert("잘못된 접근입니다..");
    history.replace("/main");
  }

  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const selectedMoodItems = useSelector(state => state.items.selectedMoodItems);
  const itemIsLoading = useSelector(state => state.items.isLoading);
  const likedItemsID = useSelector(state => state.user.likedItemsID);

  useEffect(() => {
    dispatch(itemsAction.loadItemsByCategoryOnDB());
  }, []);

  useEffect(() => {
    if (likedItemsID.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [likedItemsID]);

  return (
    <div className='recommendResult'>
      <div className='container'>
        <div className='wrapper'>
          <Title title={"recommendResult"} />
          <div className='recommendContent'>
            {itemIsLoading && likedItemsID.length === 0 ? (
              <Spinner full={false} />
            ) : (
              selectedMoodItems.map(items => (
                <div className='contentBox'>
                  <div className='recommnedTitle'>
                    {categoryList[items[0].categoryId]}
                  </div>
                  <SquareList items={items} />
                </div>
              ))
            )}
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
