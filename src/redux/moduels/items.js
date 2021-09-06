// import { createAction, handleActions } from 'redux-actions';
// import { produce } from 'immer';

//action
const LOAD = "items/LOAD";
const INCREASE_LIKES = "items/INCREASE_LIKES";
const DECREASE_LIKES = "items/DECREASE_LIKES";

//init
const initialState = {
    id : "1",
    liked : 0,
    name : "rjk",
    imgSrc : [],
    mood : "",
    // price : 0,
    // brand : "",
    // purchased : 0,
    // explain: "",
    // registrationDt : "",
}

//actoin creator
export const loadItems = () => {
    return { type: LOAD }
}

export const increaseLikes = () => {
    return { type: INCREASE_LIKES }
}

export const decreaseLikes = () => {
    return { type: DECREASE_LIKES }
}


//reducer
export default function reducer( state = initialState, action ) {
    switch(action.type) {
        case "LOAD" : {
            return state;
        }
        case "INCREASE_LIKES" : 
            return { ...state, liked : state.liked + 1 }
        case "DECREASE_LIKES" : 
            return { ...state, liked : state.liked + -1 }
        default : 
            return state;
    }
}