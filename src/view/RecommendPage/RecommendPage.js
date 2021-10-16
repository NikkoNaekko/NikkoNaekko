import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as itemsAction } from "../../redux/moduels/items";
import Title from "./component/Title";
import VerticalList from "./component/VerticalList";
import Button from "../../shared/button/Button";
import Spinner from "../../shared/Spinner";
import "./recommend.scss";

const RecommendPage = ({ history }) => {
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

  const [isDisabled, setIsDisabled] = useState(true);
  const likedMood = useSelector(state => state.items.likedMood);
  const filteredMood = useSelector(state => state.items.filteredMood);
  const isLoading = useSelector(state => state.items.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (likedMood.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [likedMood]);

  useEffect(() => {
    dispatch(itemsAction.loadPopularCategoryDataOnDB());
  }, []);

  return (
    <div className='recommend'>
      <div className='container'>
        <div className='wrapper'>
          <Title title={"recommend"} />
          <div className='recommendContent'>
            <div className='contentBox'>
              {isLoading ? (
                <Spinner full={false} />
              ) : (
                <VerticalList filteredItems={filteredMood} />
              )}
            </div>
          </div>
        </div>

        <Button name='선택완료' isDisabled={isDisabled} title={"recommend"} />
      </div>
    </div>
  );
};

export default RecommendPage;
