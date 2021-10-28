import React from "react";
import { useSelector } from "react-redux";
import Item from "./Item";
import { Empty } from "antd";

const HorizenItemList = ({ isBookMark, isPopularProduct }) => {
  const popluarItems = useSelector(state => state.items.popluarItems);
  const likedItems = useSelector(state => state.items.likedItems);

  return (
    <>
      <div className='HorizenItemList'>
        {isBookMark &&
          likedItems &&
          likedItems.map(item => {
            return <Item item={item} key={item.productId} isHorizen />;
          })}
        {isPopularProduct &&
          popluarItems &&
          popluarItems.map(item => {
            return <Item item={item} key={item.id} isHorizen />;
          })}
      </div>
      {isBookMark && likedItems.length === 0 && (
        <div className='emptyBorder'>
          <Empty description={false} />
          <h3>좋아요한 상품이 없습니다.</h3>
        </div>
      )}
    </>
  );
};

HorizenItemList.defaultProps = {
  isBookMark: null,
  isPopularProduct: null
};

export default HorizenItemList;
