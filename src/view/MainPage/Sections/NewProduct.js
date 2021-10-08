import React, { useEffect } from "react";
import VerticalItemList from "../Component/VerticalItemList";

const NewProduct = () => {
  return (
    <div style={{ marginTop: "40px" }}>
      <VerticalItemList isNewProduct />
    </div>
  );
};

export default NewProduct;
