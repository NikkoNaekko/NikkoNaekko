import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';

// actions
const PUTINCART = "PUTINCART"
const TACKINGOUTTOCART = "TACKINGOUTTOCART"
const ADD_CARTITEM = "cart/ADD_CARTITEM"
const DELETE_CARTITEM = "cart/DELETE_CARTITEM"
const DELETE_CHECKEDITEM = "cart/DELETE_CHECKEDITEM"
const RESET_CARTITEM = "cart/RESET_CARTITEM"
const CHECK_SINGLE = "cart/CHECK_SINGLE"
const CHECK_ALL = "cart/CHECK_ALL"


// action creators
const putInInCart = createAction(PUTINCART, (itemID) => ({itemID}));
const tackingOutToCart = createAction(TACKINGOUTTOCART, (itemID) => ({itemID}));
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


// reducer
export default handleActions({
    [PUTINCART] : (state, action) => produce(state, (draft) => {
        draft.itemId = [...draft.itemId, action.payload.itemID]
    }),
    [TACKINGOUTTOCART] : (state, action) => produce(state, (draft) => {
        const cartAry = draft.itemId.filter(value => value !== action.payload.itemID)
        draft.itemId = [...cartAry]
    }),
    [ADD_CARTITEM] : (state, action) => produce(state, (draft) => {
        draft.cartItem = [...state.cartItem, action.payload.item];
    }),
    [DELETE_CARTITEM] : (state, action) => produce(state, (draft) => {
        // item의 'X' 아이콘을 눌러 삭제하는 경우
        const newCartItem = draft.cartItem.filter((item)=> item.id !== action.payload.itemID)
        const newItemId = draft.itemId.filter(value => value !== action.payload.itemID);
        const newCheckItemList = draft.checkItemList.filter(value => value !== action.payload.itemID);
        draft.cartItem = [...newCartItem];
        draft.itemId = [...newItemId];
        draft.checkItemList = [...newCheckItemList];
    }),
    [DELETE_CHECKEDITEM] : (state, action) => produce(state, (draft) => {
        ///선택삭제버튼을 눌러 삭제하는 경우
        for( let i = 0; i < draft.checkItemList; i++ ) {
            const newCartItem = draft.cartItem.filter((item)=> item.id !== state.checkItemList[i])
            const newItemId = draft.itemId.filter(value => value !== state.checkItemList[i]);
            const newCheckItemList = draft.checkItemList.filter(value => value !== state.checkItemList[i])
            draft.cartItem = [...newCartItem];
            draft.itemId = [...newItemId];
            draft.checkItemList = [...newCheckItemList];
        }
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
};

export { actionCreators };