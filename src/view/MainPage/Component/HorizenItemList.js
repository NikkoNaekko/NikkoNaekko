import React from "react";
import { useSelector } from "react-redux";
import Item from "./Item";

const HorizenItemList = () => {
  const popluarItems = useSelector(state => state.items.popluarItems);

  return (
    <div className='HorizenItemList'>
      {popluarItems &&
        popluarItems.map(item => {
          return <Item item={item} key={item.id} isHorizen />;
        })}
    </div>
  );
};

export default HorizenItemList;
