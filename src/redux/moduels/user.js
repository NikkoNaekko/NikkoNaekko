import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';

// actions
const LOG_IN = "LOG_IN";
const LIKE = "LIKE";
const DISLIKE = "DISLIKE";

// action creators
const logIn = createAction(LOG_IN, (user_id) =>({user_id}));
const Like = createAction(LIKE, (itemID) =>({itemID}));
const disLike = createAction(DISLIKE, (itemID) =>({itemID}));


// initialState
const initialState = {
    uid:'',
    id : '',
    name : '',
    likedItems: [],
}


//middle ware


// reducer
export default handleActions({
    [LOG_IN] : (state, action) => produce(state, (draft) => {       // produce의 첫번째 인자는 원본 값, 두번째 인자는 createAction의 입력인자(user_id)가 들어있는 객체이다.
        draft.id = action.payload.user_id;                           // action.payload안에 createAction에 넣어놓았던 데이터가 들어있다.
    }),
    [LIKE] : (state, action) => produce(state, (draft) => {
        draft.likedItems = [...draft.likedItems, action.payload.itemID];
    }),
    [DISLIKE] : (state, action) => produce(state, (draft) => {
        const likeAry = draft.likedItems.filter(value => value !== action.payload.itemID)
        draft.likedItems = [...likeAry];
    })
}, initialState);


// action creator export
const actionCreators = {
    logIn,
    Like,
    disLike,
};

export { actionCreators };