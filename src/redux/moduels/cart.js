import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const LOADING = "LOADING";
const PUT_IN_CART = "PUT_IN_CART";
const TACKING_OUT_TO_CART = "TACKING_OUT_TO_CART";
const LOAD_CART = "load_cart";
const LOAD_CARTITEM = "load_cartitem";
const REMOVE_CART = "remove_cartitem";
const ADD_CARTITEM = "cart/ADD_CARTITEM";
const DELETE_CARTITEM = "cart/DELETE_CARTITEM";
const DELETE_CHECKEDITEM = "cart/DELETE_CHECKEDITEM";
const RESET_CARTITEM = "cart/RESET_CARTITEM";
const CHECK_SINGLE = "cart/CHECK_SINGLE";
const CHECK_ALL = "cart/CHECK_ALL";

// action creators
const loading = createAction(LOADING, isLoading => ({ isLoading }));
const putInCart = createAction(PUT_IN_CART, itemID => ({ itemID }));
const tackingOutToCart = createAction(TACKING_OUT_TO_CART, itemID => ({
  itemID
}));
const loadCart = createAction(LOAD_CART, (cartId, userId, productId) => ({
  cartId,
  userId,
  productId
}));
const loadCartItem = createAction(LOAD_CARTITEM, item => ({ item }));
const removeCart = createAction(REMOVE_CART);
const addCartItem = createAction(ADD_CARTITEM, item => ({ item }));
const deleteCartItem = createAction(DELETE_CARTITEM, itemID => ({ itemID }));
const deleteCheckedItem = createAction(DELETE_CHECKEDITEM);
const resetCartItem = createAction(RESET_CARTITEM);
const singleCheck = createAction(CHECK_SINGLE, (checked, id) => ({
  checked,
  id
}));
const allCheck = createAction(CHECK_ALL, checked => ({ checked }));

// initialState
const initialState = {
  id: null,
  userUid: null,
  itemId: [],
  cartItem: [],
  checkItemList: [],
  isCheckedAll: false,
  isLoading: false
};

//middle ware
const loadCartInfomationDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get(
        `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/cart/${
          getState().user.uid
        }`
      )
      .then(res => {
        if (res.data.success) {
          const { cartId, userId, productId } = res.data.data;
          dispatch(loadCart(cartId, userId, productId));
        }
      })
      .catch(error => {
        alert(
          "loadCartInfomationDB에서 서버와의 수신이 제대로 연결되지 않았습니다.",
          error
        );
      });
  };
};

const loadClothesInCartDB = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    axios
      .get(
        `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/cart/${
          getState().user.uid
        }/product`
      )
      .then(res => {
        if (res.data.success) {
          dispatch(loadCartItem(res.data.data));
          dispatch(loading(false));
        }
      })
      .catch(error => {
        alert(
          "loadClothesInCartDB에서 서버와의 수신이 제대로 연결되지 않았습니다.",
          error
        );
        dispatch(loading(false));
      });
  };
};

const putInInCartDB = itemID => {
  return async function (dispatch, getState, { history }) {
    await dispatch(putInCart(itemID));
    axios
      .post(
        `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/cart/${
          getState().user.uid
        }/add/${itemID}`
      )
      .then(res => {
        if (!res.data.success) {
          alert("CartTable에 반영되지 못했습니다.");
        }
      })
      .catch(error => {
        alert(
          "putInInCartDB에서 서버와의 수신이 제대로 연결되지 않았습니다.",
          error
        );
      });
  };
};

const tackingOutToCartDB = itemID => {
  return async function (dispatch, getState, { history }) {
    await dispatch(tackingOutToCart(itemID));
    axios
      .post(
        `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/cart/${
          getState().user.uid
        }`,
        getState().cart.itemId
      )
      .then(res => {
        if (!res.data.success) {
          alert("CartTable에 반영되지 못했습니다.");
        }
      })
      .catch(error => {
        alert(
          "tackingOutToCartDB에서 서버와의 수신이 제대로 연결되지 않았습니다.",
          error
        );
      });
  };
};

const deleteCartItemDB = itemID => {
  return async function (dispatch, getState, { history }) {
    await dispatch(deleteCartItem(itemID));
    axios
      .post(
        `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/cart/${
          getState().user.uid
        }`,
        getState().cart.itemId
      )
      .then(res => {
        if (!res.data.success) {
          alert("CartTable에 반영되지 못했습니다.");
        }
      })
      .catch(error => {
        alert(
          "deleteCartItemDB에서 서버와의 수신이 제대로 연결되지 않았습니다.",
          error
        );
      });
  };
};

const deleteCheckedItemDB = () => {
  return async function (dispatch, getState, { history }) {
    await dispatch(deleteCheckedItem());
    axios
      .post(
        `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/cart/${
          getState().user.uid
        }`,
        getState().cart.itemId
      )
      .then(res => {
        if (!res.data.success) {
          alert("CartTable에 반영되지 못했습니다.");
        }
      })
      .catch(error => {
        alert(
          "deleteCheckedItemDB에서 서버와의 수신이 제대로 연결되지 않았습니다.",
          error
        );
      });
  };
};

const resetCartItemDB = () => {
  return async function (dispatch, getState, { history }) {
    await dispatch(resetCartItem());
    axios
      .post(
        `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/cart/${
          getState().user.uid
        }`,
        []
      )
      .then(res => {
        if (!res.data.success) {
          alert("CartTable에 반영되지 못했습니다.");
        }
      })
      .catch(error => {
        alert(
          "resetCartItemDB에서 서버와의 수신이 제대로 연결되지 않았습니다.",
          error
        );
      });
  };
};
const addOrderDataOnDB = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    axios
      .get(
        `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/user/tokenValidation/${sessionStorage.getItem(
          "my_token"
        )}`
      )
      .then(res => {
        if (res.data.success) {
          axios
            .post(
              `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/cart/makeOrder/${
                getState().user.uid
              }`
            )
            .then(res => {
              dispatch(resetCartItem());
              dispatch(loading(false));
              alert("주문이 성공적으로 완료되었습니다.");
              history.push("/order");
            })
            .catch(error => {
              alert(
                "addOrderDataOnDB에서 카트에서 주문내역으로 이동되는데 문제가 있습니다.",
                error
              );
            });
        } else {
          alert("로그인 유효시간이 지났습니다. 다시 로그인해주세요.");
        }
      })
      .catch(error => {
        alert(
          "addOrderDataOnDB에서 토큰값을 체크하는데 문제가 있습니다.",
          error
        );
        dispatch(loading(false));
      });
  };
};

// reducer
export default handleActions(
  {
    [LOADING]: (state, action) =>
      produce(state, draft => {
        draft.isLoading = action.payload.isLoading;
      }),
    [PUT_IN_CART]: (state, action) =>
      produce(state, draft => {
        draft.itemId = [...draft.itemId, action.payload.itemID];
      }),
    [TACKING_OUT_TO_CART]: (state, action) =>
      produce(state, draft => {
        const cartAry = draft.itemId.filter(
          value => value !== action.payload.itemID
        );
        draft.itemId = [...cartAry];
      }),
    [LOAD_CART]: (state, action) =>
      produce(state, draft => {
        const { cartId, userId, productId } = action.payload;
        draft.id = cartId;
        draft.userUid = userId;
        draft.itemId = [...productId];
      }),
    [REMOVE_CART]: (state, action) =>
      produce(state, draft => {
        draft.id = null;
        draft.userUid = null;
        draft.itemId = [];
        draft.cartItem = [];
        draft.checkItemList = [];
        draft.isCheckedAll = false;
      }),
    [LOAD_CARTITEM]: (state, action) =>
      produce(state, draft => {
        draft.cartItem = [...action.payload.item];
      }),
    [ADD_CARTITEM]: (state, action) =>
      produce(state, draft => {
        draft.cartItem = [...state.cartItem, action.payload.item];
      }),
    [DELETE_CARTITEM]: (state, action) =>
      produce(state, draft => {
        // item의 'X' 아이콘을 눌러 삭제하는 경우
        draft.cartItem = draft.cartItem.filter(
          item => item.productId !== action.payload.itemID
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
          draft.itemId.includes(Item.productId)
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
  loadClothesInCartDB,
  deleteCartItem,
  deleteCheckedItem,
  resetCartItem,
  singleCheck,
  allCheck,
  loadCart,
  removeCart,
  loadCartInfomationDB,
  putInInCartDB,
  tackingOutToCartDB,
  deleteCartItemDB,
  deleteCheckedItemDB,
  resetCartItemDB,
  addOrderDataOnDB
};

export { actionCreators };
