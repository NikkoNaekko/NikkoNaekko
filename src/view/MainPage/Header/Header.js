import React from "react";
import {
  HeartFilled,
  LikeFilled,
  StarFilled,
  SearchOutlined
} from "@ant-design/icons";

const Header = ({ title }) => {
  if (title == "BookMark") {
    return (
      <div>
        <HeartFilled style={{ fontSize: "30px", color: "red" }} />
        <span className='headerTitle'> 즐겨찾기</span>
      </div>
    );
  } else if (title == "PopularProduct") {
    return (
      <div>
        <LikeFilled style={{ fontSize: "30px", color: "rgb(41, 128, 185)" }} />
        <span className='headerTitle'> 요즘 뜨는 상품</span>
      </div>
    );
  } else if (title == "NewProduct") {
    return (
      <div>
        <StarFilled style={{ fontSize: "30px", color: "rgb(255, 204, 0)" }} />
        <span className='headerTitle'> 신상품</span>
      </div>
    );
  } else if (title == "Search") {
    return (
      <div>
        <SearchOutlined
          style={{ fontSize: "30px", color: "rgb(55, 116, 230)" }}
        />
        <span className='headerTitle'>검색 결과</span>
      </div>
    );
  }
};

Header.defaultProps = {
  title: null
};

export default Header;
