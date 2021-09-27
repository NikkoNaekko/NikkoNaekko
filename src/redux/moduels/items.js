import axios from "axios";
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

//action
const LOAD_ALL_DATA = "load_all_data";
const LOAD_ONE_DATA = "load_add_data";
const LOAD_POPULAR_DATA = "load_popular_data";
const ADD_MODE = "items/ADD_MODE";
const DELETE_MODE = "items/DELETE_MODE";
const ADD_SELECTEMOOD = "items/ADD_SELECTEMOOD";
const RESET_LIKEDMOOD = "items/RESET_LIKEDMOOD";
const RESET_SELECTEDMOOD = "items/RESET_SELECTEDMOOD";


//action creators
const loadAllData = createAction(LOAD_ALL_DATA, (data) => ({data}));
const loadOneData = createAction(LOAD_ONE_DATA, (data) => ({data}));
const loadPopularData = createAction(LOAD_POPULAR_DATA, (data) => ({data}));
const addMood = createAction(ADD_MODE, (mood) => ({mood}));
const deleteMood = createAction(DELETE_MODE, (mood) => ({mood}));
const addSelectedMood = createAction(ADD_SELECTEMOOD, (mood) => ({mood}));
const resetLikedMood = createAction(RESET_LIKEDMOOD, () => ({}));
const resetSelectiedMood = createAction(RESET_SELECTEDMOOD, () => ({}));

//init
const initialState = {
    items:[],
    selectedItems:{},
    popluarItems:[],
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

//middleware
const loadAllClothesDataOnDB = () => {
    return function (dispatch, getState, { history }) {
        axios.get("http://localhost:3000/posts")
        .then(data => {
            // console.log(data.data);
            dispatch(loadAllData(data.data));
        })
        .catch(error => {
            console.log('데이터를 받아오지 못했습니다!', error);
        })
    }
}

const loadOneClothesDataOnDB = (itemId) => {
    return function (dispatch, getState, { history }) {
        axios.get(`http://localhost:3000/posts/${itemId}`)
        .then(data => {
            // console.log(data.data);
            dispatch(loadOneData(data.data));
        })
        .catch(error => {
            console.log('데이터를 받아오지 못했습니다!', error);
        })
    }
}

const loadSearchedClothesDataOnDB = (itemName) => {
    return function (dispatch, getState, { history }) {
        axios.get(`http://localhost:3000/posts?name=${itemName}`)
        .then(data => {
            // console.log(data.data);
            dispatch(loadAllData(data.data));
        })
        .catch(error => {
            console.log('데이터를 받아오지 못했습니다!', error);
        })
    }
}

const loadPopularClothesDataOnDB = () => {
    return function (dispatch, getState, { history }) {
        axios.get('http://localhost:3000/posts?_sort=liked&_order=desc&_limit=10')
        .then(data => {
            console.log(data.data);
            dispatch(loadPopularData(data.data));
        })
        .catch(error => {
            console.log('에서 데이터를 받아오지 못했습니다!', error);
        })
    }
}


// reducer
export default handleActions({
    [LOAD_ALL_DATA] : (state, action) => produce(state, (draft) => {
        draft.items = [...action.payload.data];
    }),
    [LOAD_ONE_DATA] : (state, action) => produce(state, (draft) => {
        draft.selectedItems = action.payload.data;
    }),
    [LOAD_POPULAR_DATA] : (state, action) => produce(state, (draft) => {
        draft.popluarItems = [...action.payload.data];
    }),
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
    resetSelectiedMood,
    loadAllClothesDataOnDB,
    loadOneClothesDataOnDB,
    loadSearchedClothesDataOnDB,
    loadPopularClothesDataOnDB
};

export { actionCreators };