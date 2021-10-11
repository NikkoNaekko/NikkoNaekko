import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//action
const LOADING = "loading";
const NO_MORE_RECEIVE = "no_more_receive";
const SAVE_DATA = "save_data";
const LOAD_ONE_DATA = "load_add_data";
const LOAD_SEARCHED_DATA = "load_searched_data";
const LOAD_POPULAR_DATA = "load_popular_data";
const ADD_MODE = "items/ADD_MODE";
const DELETE_MODE = "items/DELETE_MODE";
const ADD_SELECTEMOOD = "items/ADD_SELECTEMOOD";
const RESET_LIKEDMOOD = "items/RESET_LIKEDMOOD";
const RESET_SELECTEDMOOD = "items/RESET_SELECTEDMOOD";

//action creators

const loading = createAction(LOADING, is_loading => ({ is_loading }));
const noMoreReceive = createAction(NO_MORE_RECEIVE, () => {});
const saveData = createAction(SAVE_DATA, data => ({ data }));
const loadOneData = createAction(LOAD_ONE_DATA, data => ({ data }));
const loadSearchData = createAction(LOAD_SEARCHED_DATA, data => ({ data }));
const loadPopularData = createAction(LOAD_POPULAR_DATA, data => ({ data }));
const addMood = createAction(ADD_MODE, mood => ({ mood }));
const deleteMood = createAction(DELETE_MODE, mood => ({ mood }));
const addSelectedMood = createAction(ADD_SELECTEMOOD, mood => ({ mood }));
const resetLikedMood = createAction(RESET_LIKEDMOOD, () => ({}));
const resetSelectiedMood = createAction(RESET_SELECTEDMOOD, () => ({}));

//init
const initialState = {
  items: [],
  selectedItems: {},
  searchedItems: [],
  popluarItems: [],
  likedMood: [],
  selectedMood: [],
  is_loading: false,
  paging: { next: 0, isEnd: false }
};
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
const loadClothesDataOnDB = () => {
  return function (dispatch, getState, { history }) {
    if (getState().items.is_loading === true) return;
    if (getState().items.paging.isEnd === true) {
      dispatch(loading(false));
      return;
    }
    dispatch(loading(true));
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://ec2-3-13-167-112.us-east-2.compute.amazonaws.com/product/newwest/${
          // `http://ec2-3-13-167-112.us-east-2.compute.amazonaws.com/product/newwest/${
          getState().items.paging.next
        }`
      )
      .then(res => {
        if (res.data.length === 0) {
          dispatch(noMoreReceive());
        }
        dispatch(saveData(res.data));
      })
      .catch(error => {
        console.log("데이터를 받아오지 못했습니다!", error);
      });
  };
};

const loadOneClothesDataOnDB = itemId => {
  return function (dispatch, getState, { history }) {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://ec2-3-13-167-112.us-east-2.compute.amazonaws.com/product/${itemId}`
      )
      .then(res => {
        console.log(res);
        dispatch(loadOneData(res.data));
      })
      .catch(error => {
        console.log("데이터를 받아오지 못했습니다!", error);
      });
  };
};

const loadSearchedClothesDataOnDB = itemName => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://localhost:3000/posts?name=${itemName}`)
      .then(res => {
        dispatch(loadSearchData(res.data));
      })
      .catch(error => {
        console.log("데이터를 받아오지 못했습니다!", error);
      });
  };
};

const loadPopularClothesDataOnDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://ec2-3-13-167-112.us-east-2.compute.amazonaws.com/product/popular"
      )
      .then(res => {
        console.log(res);
        dispatch(loadPopularData(res.data));
      })
      .catch(error => {
        console.log("데이터를 받아오지 못했습니다!", error);
      });
  };
};

// reducer
export default handleActions(
  {
    [LOADING]: (state, action) =>
      produce(state, draft => {
        draft.is_loading = action.payload.is_loading;
      }),
    [NO_MORE_RECEIVE]: (state, action) =>
      produce(state, draft => {
        draft.paging.isEnd = true;
      }),

    [SAVE_DATA]: (state, action) =>
      produce(state, draft => {
        draft.items = [...draft.items, ...action.payload.data];
        draft.paging.next += 8;
        draft.is_loading = false;
      }),
    [LOAD_ONE_DATA]: (state, action) =>
      produce(state, draft => {
        draft.selectedItems = action.payload.data;
      }),
    [LOAD_SEARCHED_DATA]: (state, action) =>
      produce(state, draft => {
        draft.searchedItems = [...action.payload.data];
      }),
    [LOAD_POPULAR_DATA]: (state, action) =>
      produce(state, draft => {
        draft.popluarItems = [...action.payload.data];
      }),
    [ADD_MODE]: (state, action) =>
      produce(state, draft => {
        const newLikedMood = [...state.likedMood, action.payload.mood];
        draft.likedMood = newLikedMood;
      }),
    [DELETE_MODE]: (state, action) =>
      produce(state, draft => {
        const moodList = state.likedMood.filter(m => {
          return m !== action.payload.mood;
        });
        draft.likedMood = moodList;
      }),
    [ADD_SELECTEMOOD]: (state, action) =>
      produce(state, draft => {
        const newSelectedMood = [...state.selectedMood, action.payload.mood];
        draft.selectedMood = newSelectedMood;
      }),
    [RESET_LIKEDMOOD]: (state, action) =>
      produce(state, draft => {
        draft.likedMood = [];
      }),
    [RESET_SELECTEDMOOD]: (state, action) =>
      produce(state, draft => {
        draft.selectedMood = [];
      })
  },
  initialState
);

//action creator export
const actionCreators = {
  addMood,
  loadOneData,
  deleteMood,
  addSelectedMood,
  resetLikedMood,
  resetSelectiedMood,
  loadClothesDataOnDB,
  loadOneClothesDataOnDB,
  loadSearchedClothesDataOnDB,
  loadPopularClothesDataOnDB
};

export { actionCreators };
