import React from "react";
import { useSelector } from "react-redux";
import Item from "./Item";
import { Empty } from "antd";

const VerticalItemList = ({ isNewProduct, isSearchProduct }) => {
  const items = useSelector(state => state.items.items);
  const searchedItems = useSelector(state => state.items.searchedItems);
  // const likedItems = useSelector(state => state.items.likedItems);

  return (
    <>
      <div className='vericalItemList'>
        {/* {isBookMark &&
          likedItems &&
          likedItems.map(item => {
            return <Item item={item} key={item.productId} isVertical />;
          })} */}
        {isNewProduct &&
          items.map(item => {
            return <Item item={item} key={item.productId} isVertical />;
          })}
        {isSearchProduct &&
          searchedItems.length > 0 &&
          searchedItems.map(item => {
            return <Item item={item} key={item.id} isVertical />;
          })}
      </div>
      {/* {isBookMark && likedItems.length === 0 && (
        <div className='emptyBorder'>
          <Empty description={false} />
          <h3>좋아요한 상품이 없습니다.</h3>
        </div>
      )} */}
      {isSearchProduct && searchedItems.length === 0 && (
        <div className='emptyBorder'>
          <Empty description={false} />
          <h3>검색결과가 존재하지 않습니다.</h3>
        </div>
      )}
    </>
  );
};

VerticalItemList.defaultProps = {
  isBookMark: null,
  isNewProduct: null,
  isSearchProduct: null
};

export default VerticalItemList;
