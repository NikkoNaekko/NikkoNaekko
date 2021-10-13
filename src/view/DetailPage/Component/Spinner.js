import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
const Spinner = () => {
  return (
    <div className='spinnerBorder'>
      <LoadingOutlined style={{ fontSize: "40px" }} />
      <h1>해당 상품을 불러오는 중입니다!</h1>
    </div>
  );
};

export default Spinner;
