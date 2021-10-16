import React from "react";
import "./shared.scss";
import { LoadingOutlined } from "@ant-design/icons";
const Spinner = ({ full }) => {
  return (
    <div className={full ? "FullSpinnerBorder" : "SpinnerBorder"}>
      <LoadingOutlined style={{ fontSize: "40px" }} />
    </div>
  );
};
Spinner.defaultProps = {
  full: null
};

export default Spinner;
