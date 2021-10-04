import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const PUTINCART = "PUTINCART";
const TACKINGOUTTOCART = "TACKINGOUTTOCART";
const LOAD_CARTITEM = "load_cartitem";
const ADD_CARTITEM = "cart/ADD_CARTITEM";
const DELETE_CARTITEM = "cart/DELETE_CARTITEM";
const DELETE_CHECKEDITEM = "cart/DELETE_CHECKEDITEM";
const RESET_CARTITEM = "cart/RESET_CARTITEM";
const CHECK_SINGLE = "cart/CHECK_SINGLE";
const CHECK_ALL = "cart/CHECK_ALL";

// action creators
const putInCart = createAction(PUTINCART, itemID => ({ itemID }));
const tackingOutToCart = createAction(TACKINGOUTTOCART, itemID => ({ itemID }));
const loadCartitem = createAction(LOAD_CARTITEM, items => ({ items }));
const addCartItem = createAction(ADD_CARTITEM, item => ({ item }));
const deleteCartItem = createAction(DELETE_CARTITEM, itemID => ({ itemID }));
const deleteCheckedItem = createAction(DELETE_CHECKEDITEM);
const resetCartItem = createAction(RESET_CARTITEM);
const singleCheck = createAction(CHECK_SINGLE, (checked, id) => ({
  checked,
  id
}));
const allCheck = createAction(CHECK_ALL, checked => ({ checked }));

let a;
// initialState
const initialState = {
  id: "",
  userUid: "",
  itemId: [],
  cartItem: [],
  checkItemList: [], //[checkbox=true]인 item id을 담는 배열
  isCheckedAll: false
};

//middle ware
const loadCartItemDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://localhost:3000/cart/${getState().user.id}`)
      .then(res => {
        // console.log(res.data);
        if (res.data.product_id.length > 0) {
          let url = "http://localhost:3000/posts?";
          getState().cart.itemId.map(id => {
            url += "id=" + id + "&";
          });
          console.log(url);
          axios
            .get(url)
            .then(res => {
              dispatch(loadCartitem(res.data));
            })
            .catch(error => {
              console.log("장바구니 데이터를 받아오지 못했습니다.", error);
            });
        }
      })
      .catch(error => {
        console.log("유저의 장바구니 데이터를 받아오지 못했습니다.", error);
      });
  };
};

const putInInCartDB = itemID => {
  return async function (dispatch, getState, { history }) {
    await dispatch(putInCart(itemID));
    axios
      .put(`http://localhost:3000/cart/${getState().user.id}`, {
        cart_id: getState().user.id,
        order_count: 0,
        product_id: getState().cart.itemId
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log("CartTable에 저장하지 못했습니다.", error);
      });
  };
};

const tackingOutToCartDB = itemID => {
  return async function (dispatch, getState, { history }) {
    await dispatch(tackingOutToCart(itemID));
    axios
      .put(`http://localhost:3000/cart/${getState().user.id}`, {
        cart_id: getState().user.id,
        order_count: 0,
        product_id: getState().cart.itemId
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log("CartTable에 저장하지 못했습니다.", error);
      });
  };
};

const deleteCartItemDB = itemID => {
  return async function (dispatch, getState, { history }) {
    await dispatch(deleteCartItem(itemID));
    axios
      .put(`http://localhost:3000/cart/${getState().user.id}`, {
        cart_id: getState().user.id,
        order_count: 0,
        product_id: getState().cart.itemId,
        id: "admin@admin.com"
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log("cart테이블에 수정된 데이터가 반영되지 못했습니다.", error);
      });
  };
};

const deleteCheckedItemDB = () => {
  return async function (dispatch, getState, { history }) {
    await dispatch(deleteCheckedItem());
    axios
      .put(`http://localhost:3000/cart/${getState().user.id}`, {
        cart_id: getState().user.id,
        order_count: 0,
        product_id: getState().cart.itemId,
        id: "admin@admin.com"
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log("cart테이블에 수정된 데이터가 반영되지 못했습니다.", error);
      });
  };
};

const resetCartItemDB = () => {
  return async function (dispatch, getState, { history }) {
    await dispatch(resetCartItem());
    axios
      .put(`http://localhost:3000/cart/${getState().user.id}`, {
        cart_id: getState().user.id,
        order_count: 0,
        product_id: getState().cart.itemId,
        id: "admin@admin.com"
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log("cart테이블에 수정된 데이터가 반영되지 못했습니다.", error);
      });
  };
};

// reducer
export default handleActions(
  {
    [PUTINCART]: (state, action) =>
      produce(state, draft => {
        draft.itemId = [...draft.itemId, action.payload.itemID];
      }),
    [TACKINGOUTTOCART]: (state, action) =>
      produce(state, draft => {
        const cartAry = draft.itemId.filter(
          value => value !== action.payload.itemID
        );
        draft.itemId = [...cartAry];
      }),
    [LOAD_CARTITEM]: (state, action) =>
      produce(state, draft => {
        draft.cartItem = [];
        draft.checkItemList = [];
        action.payload.items.map(item => {
          draft.cartItem = [...draft.cartItem, item];
        });
      }),
    [ADD_CARTITEM]: (state, action) =>
      produce(state, draft => {
        draft.cartItem = [...state.cartItem, action.payload.item];
      }),
    [DELETE_CARTITEM]: (state, action) =>
      produce(state, draft => {
        // item의 'X' 아이콘을 눌러 삭제하는 경우
        draft.cartItem = draft.cartItem.filter(
          item => item.id !== action.payload.itemID
        );
        draft.itemId = draft.itemId.filter(
          value => value !== action.payload.itemID
        );
        draft.checkItemList = draft.checkItemList.filter(
          value => value !== action.payload.itemID
        );
      }),
    [DELETE_CHECKEDITEM]: (state, action) =>
      produce(state, draft => {
        ///선택삭제버튼을 눌러 삭제하는 경우
        draft.itemId = draft.itemId.filter(
          Id => !draft.checkItemList.includes(Id)
        );
        draft.cartItem = draft.cartItem.filter(Item =>
          draft.itemId.includes(Item.id)
        );
        draft.checkItemList = [];
      }),
    [RESET_CARTITEM]: (state, action) =>
      produce(state, draft => {
        draft.cartItem = [];
        draft.checkItemList = [];
        draft.itemId = [];
      }),
    [CHECK_SINGLE]: (state, action) =>
      produce(state, draft => {
        if (action.payload.checked) {
          // 단일 체크박스 선택
          draft.checkItemList = [...state.checkItemList, action.payload.id];
        } else {
          // 단일 첸크박스 선택해제
          const newAry = state.checkItemList.filter(item => {
            return item !== action.payload.id;
          });
          draft.checkItemList = [...newAry];
        }
      }),
    [CHECK_ALL]: (state, action) =>
      produce(state, draft => {
        if (action.payload.checked === true) {
          // 전체 체크박스 선택
          draft.checkItemList = [...state.itemId];
          draft.isCheckedAll = true;
        } else if (action.payload.checked === false) {
          //전체 체크박스 선택해제
          draft.checkItemList = [];
          draft.isCheckedAll = false;
        }
      })
  },
  initialState
);

// action creator export
const actionCreators = {
  putInCart,
  tackingOutToCart,
  addCartItem,
  deleteCartItem,
  deleteCheckedItem,
  resetCartItem,
  singleCheck,
  allCheck,
  loadCartitem,
  loadCartItemDB,
  putInInCartDB,
  tackingOutToCartDB,
  deleteCartItemDB,
  deleteCheckedItemDB,
  resetCartItemDB
};

export { actionCreators };
