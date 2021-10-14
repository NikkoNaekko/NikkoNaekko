import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as itemsAction } from "../../../redux/moduels/items";
import Item from "./Item";
import { Empty } from "antd";

const VerticalItemList = ({ isBookMark, isNewProduct, isSearchProduct }) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items.items);
  const searchedItems = useSelector(state => state.items.searchedItems);
  const likedItemsID = useSelector(state => state.user.likedItems);
  // const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    if (isBookMark) {
      // setLikedItems([]);
      // let ary = [];
      // likedItemsID.map(clothesToFind => {
      //   const likedItemsObject = items.filter(
      //     item => item.id === clothesToFind
      //   );
      //   ary.push(likedItemsObject[0]);
      // });
      // setLikedItems([...ary]);
    }
  }, [likedItemsID]);
  return (
    <>
      <div className='vericalItemList'>
        {/* {isBookMark &&
        likedItems &&
        likedItems.map(item => {
          return <Item item={item} key={item.id} isVertical />;
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
