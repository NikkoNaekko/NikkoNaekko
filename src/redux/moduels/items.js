import axios from "axios";
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

//action
const ADD_MODE = "items/ADD_MODE";
const DELETE_MODE = "items/DELETE_MODE";
const ADD_SELECTEMOOD = "items/ADD_SELECTEMOOD";
const RESET_LIKEDMOOD = "items/RESET_LIKEDMOOD";
const RESET_SELECTEDMOOD = "items/RESET_SELECTEDMOOD";


//action creators
const addMood = createAction(ADD_MODE, (mood) => ({mood}));
const deleteMood = createAction(DELETE_MODE, (mood) => ({mood}));
const addSelectedMood = createAction(ADD_SELECTEMOOD, (mood) => ({mood}));
const resetLikedMood = createAction(RESET_LIKEDMOOD, () => ({}));
const resetSelectiedMood = createAction(RESET_SELECTEDMOOD, () => ({}));

//init
const initialState = {
    items:[],
    likedMood : [],
    selectedMood : [],
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

// reducer
export default handleActions({
    [ADD_MODE] : (state, action) => produce(state, (draft) => {
        const newLikedMood = [ ...state.likedMood, action.payload.mood ];
        draft.likedMood = newLikedMood;
    }),
    [DELETE_MODE] : (state, action) => produce(state, (draft) => {
        const moodList = state.likedMood.filter((m) => {
            return m !== action.payload.mood;
        })
        draft.likedMood = moodList;
    }),
    [ADD_SELECTEMOOD] : (state, action) => produce(state, (draft) => {
        const newSelectedMood = [ ...state.selectedMood, action.payload.mood ];
        draft.selectedMood = newSelectedMood;
    }),
    [RESET_LIKEDMOOD] : (state, action) => produce(state, (draft) => {
        draft.likedMood = [];
    }),
    [RESET_SELECTEDMOOD] : (state, action) => produce(state, (draft) => {
        draft.selectedMood = [];
    }),
}, initialState);


//action creator export
const actionCreators = {
    addMood,
    deleteMood,
    addSelectedMood,
    resetLikedMood,
    resetSelectiedMood
};

export { actionCreators };