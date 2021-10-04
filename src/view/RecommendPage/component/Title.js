import React from "react";
import Favorite from "@material-ui/icons/Favorite";

const Title = ({ title }) => {
  if (title === "recommend") {
    return (
      <div className='recommendTitle'>
        <span className='titleIcon'>
          <Favorite />
        </span>
        <h2 className='titleHead'>
          좋아하는 스타일을
          <br /> 알려주세요!
        </h2>
        <p className='titleDesc'>
          니꼬내꼬가 취향에 맞는
          <br /> 상품을 찾아올게요
        </p>
      </div>
    );
  } else if (title === "recommendResult") {
    return (
      <div className='recommendResultTitle'>
        <span className='titleIcon'>
          <Favorite />
        </span>
        <h2 className='titleHead'>
          선택한 스타일의
          <br /> 옷들을 모아봤어요!
        </h2>
        <p className='titleDesc'>
          원하시는 옷을
          <br /> 즐겨찾기할 수 있어요
        </p>
      </div>
    );
  }
};

Title.defaultProps = {
  title: null
};

export default Title;
