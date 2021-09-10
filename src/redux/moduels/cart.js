import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';

// actions
const PUTINCART = "PUTINCART"
const TACKINGOUTTOCART = "TACKINGOUTTOCART"

// action creators
const putInInCart = createAction(PUTINCART, (itemID) => ({itemID}));
const tackingOutToCart = createAction(TACKINGOUTTOCART, (itemID) => ({itemID}));

// initialState
const initialState = {
    id:'',
    userUid: '',
    itemId:[],
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
    })

}, initialState);


// action creator export
const actionCreators = {
    putInInCart,
    tackingOutToCart,
};

export { actionCreators };