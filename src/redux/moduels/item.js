import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';

// actions


// action creators

// initialState
const initialState = {
    items:[],
}
/**
 * items : [ item, item, item ...]
 * 
 * item = {
 *  id: '',
 *  name: '',
 *  price: 0,
 *  brand: '',
 *  liked: 0,
 *  purchased: 0,
 *  explain: '',
 *  registrationDt: new Date(),
 *  imgSrc: ['https://~','https://~','https://~'],
 *  mood: '',
 * }
 */

//middle ware


// reducer
export default handleActions({
}, initialState);


// action creator export
const actionCreators = {
};

export { actionCreators };