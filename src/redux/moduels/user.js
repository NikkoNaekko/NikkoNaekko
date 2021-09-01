import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';

// actions
const LOG_IN = "LOG_IN";


// action creators
const logIn = createAction(LOG_IN, (user_id) =>({user_id}));


// initialState
const initialState = {
    user_id : ''
}


//middle ware


// reducer
export default handleActions({
    [LOG_IN] : (state, action) => produce(state, (draft) => {       // produce의 첫번째 인자는 원본 값, 두번째 인자는 createAction의 입력인자(user_id)가 들어있는 객체이다.
        draft.user_id = action.payload.user_id;                           // action.payload안에 createAction에 넣어놓았던 데이터가 들어있다.
    }),
}, initialState);


// action creator export
const actionCreators = {
    logIn,
};

export { actionCreators };