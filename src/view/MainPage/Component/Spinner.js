import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
const Spinner = () => {
  return (
    <div className='SpinnerBorder'>
      <LoadingOutlined style={{ fontSize: "40px" }} />
    </div>
  );
};

export default Spinner;
