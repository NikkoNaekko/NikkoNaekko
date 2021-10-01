import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';

// actions
const PUTINCART = "PUTINCART"
const TACKINGOUTTOCART = "TACKINGOUTTOCART"
const LOAD_CARTITEM = "load_cartitem"
const ADD_CARTITEM = "cart/ADD_CARTITEM"
const DELETE_CARTITEM = "cart/DELETE_CARTITEM"
const DELETE_CHECKEDITEM = "cart/DELETE_CHECKEDITEM"
const RESET_CARTITEM = "cart/RESET_CARTITEM"
const CHECK_SINGLE = "cart/CHECK_SINGLE"
const CHECK_ALL = "cart/CHECK_ALL"


// action creators
const putInInCart = createAction(PUTINCART, (itemID) => ({itemID}));
const tackingOutToCart = createAction(TACKINGOUTTOCART, (itemID) => ({itemID}));
const loadCartitem = createAction(LOAD_CARTITEM, (items) => ({items}));
const addCartItem = createAction(ADD_CARTITEM, (item) => ({item}));
const deleteCartItem = createAction(DELETE_CARTITEM, (itemID) => ({itemID}));
const deleteCheckedItem = createAction(DELETE_CHECKEDITEM);
const resetCartItem = createAction(RESET_CARTITEM);
const singleCheck =  createAction(CHECK_SINGLE, (checked, id)=>({checked, id}));
const allCheck =  createAction(CHECK_ALL, (checked)=>({checked}));


// initialState
const initialState = {
    id:'',
    userUid: '',
    itemId: [],
    cartItem: [],
    checkItemList: [], //[checkbox=true]인 item id을 담는 배열
    isCheckedAll: false,
}


//middle ware
const loadCartItemDB = () => {
    return function (dispatch, getState, { history }) {
        let url = "http://localhost:3000/posts?";
        getState().cart.itemId.map(id => {
            url += "id=" + id + "&"
        })
        axios.get(url)
        .then(data => {
            dispatch(loadCartitem(data.data))
        })
        .catch(error => {
            console.log("장바구니 데이터를 받아오지 못했습니다.", error);
        })
    }
}

// reducer
export default handleActions({
    [PUTINCART] : (state, action) => produce(state, (draft) => {
        draft.itemId = [...draft.itemId, action.payload.itemID]
    }),
    [TACKINGOUTTOCART] : (state, action) => produce(state, (draft) => {
        const cartAry = draft.itemId.filter(value => value !== action.payload.itemID)
        draft.itemId = [...cartAry]
    }),
    [LOAD_CARTITEM] : (state, action) => produce(state, (draft) => {
        draft.cartItem = [];
        draft.checkItemList = [];
        action.payload.items.map(item => {
            draft.cartItem = [...draft.cartItem, item]
        })
    }),
    [ADD_CARTITEM] : (state, action) => produce(state, (draft) => {
        draft.cartItem = [...state.cartItem, action.payload.item];
    }),
    [DELETE_CARTITEM] : (state, action) => produce(state, (draft) => {
        // item의 'X' 아이콘을 눌러 삭제하는 경우
        draft.cartItem = draft.cartItem.filter((item)=> item.id !== action.payload.itemID);
        draft.itemId = draft.itemId.filter(value => value !== action.payload.itemID);
        draft.checkItemList = draft.checkItemList.filter(value => value !== action.payload.itemID);
    }),
    [DELETE_CHECKEDITEM] : (state, action) => produce(state, (draft) => {
        ///선택삭제버튼을 눌러 삭제하는 경우
        draft.itemId = draft.itemId.filter(Id => !draft.checkItemList.includes(Id))
        draft.cartItem = draft.cartItem.filter(Item => draft.itemId.includes(Item.id))
        draft.checkItemList = [];
    }),
    [RESET_CARTITEM] : (state, action) => produce(state, (draft) => {
        draft.cartItem = [];
        draft.checkItemList = [];
        draft.itemId = [];
    }),
    [CHECK_SINGLE] : (state, action) => produce(state, (draft) => {
        if(action.payload.checked) { // 단일 체크박스 선택
            draft.checkItemList = [ ...state.checkItemList, action.payload.id ]
        } else { // 단일 첸크박스 선택해제
            const newAry = state.checkItemList.filter((item)=>{
                return item !== action.payload.id
            })
            draft.checkItemList = [...newAry];
        }
    }),
    [CHECK_ALL] : (state, action) => produce(state, (draft) => {
        if(action.payload.checked === true) { // 전체 체크박스 선택
            draft.checkItemList = [ ...state.itemId ];
            draft.isCheckedAll = true;
        } else if(action.payload.checked === false) { //전체 체크박스 선택해제
            draft.checkItemList = [];
            draft.isCheckedAll = false;
        }
    }),

}, initialState);


// action creator export
const actionCreators = {
    putInInCart,
    tackingOutToCart,
    addCartItem,
    deleteCartItem,
    deleteCheckedItem,
    resetCartItem,
    singleCheck,
    allCheck,
    loadCartitem,
    loadCartItemDB
};

export { actionCreators };