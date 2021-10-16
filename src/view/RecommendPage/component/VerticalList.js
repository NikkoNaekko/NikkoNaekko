import React from "react";
import Item from "./Item";
import ItemTitle from "./ItemTitle";
import { categoryList } from "../../../data/categoryInfomation";

const VerticalList = ({ filteredItems }) => {
  return (
    <div className='verticalList'>
      {filteredItems &&
        filteredItems.map(item => (
          <div className='listItem' key={item.productId}>
            <Item item={item} />
            <ItemTitle title={categoryList[item.categoryId]} />
          </div>
        ))}
    </div>
  );
};

export default VerticalList;
