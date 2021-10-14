import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

//action
const LOADING = "loading";
const LIKED_DATA_LOADING = "likedDataLoading";
const NO_MORE_RECEIVE = "no_more_receive";
const SAVE_DATA = "save_data";
const LOAD_ONE_DATA = "load_add_data";
const LOAD_SEARCHED_DATA = "load_searched_data";
const LOAD_POPULAR_DATA = "load_popular_data";
const LOAD_LIKED_DATA = "load_liked_data";
const ADD_LIKED_DATA = "add_liked_data";
const SUB_LIKED_DATA = "sub_liked_data";
const ADD_MODE = "items/ADD_MODE";
const DELETE_MODE = "items/DELETE_MODE";
const ADD_SELECTEMOOD = "items/ADD_SELECTEMOOD";
const RESET_LIKEDMOOD = "items/RESET_LIKEDMOOD";
const RESET_SELECTEDMOOD = "items/RESET_SELECTEDMOOD";
const INCREASE_LIKED = "INCREASE_LIKED";
const DECREASE_LIKED = "DECREASE_LIKED";
//action creators

const loading = createAction(LOADING, isLoading => ({ isLoading }));
const likedDataLoading = createAction(LIKED_DATA_LOADING, isLoading => ({
  isLoading
}));
const noMoreReceive = createAction(NO_MORE_RECEIVE, () => {});
const saveData = createAction(SAVE_DATA, data => ({ data }));
const loadOneData = createAction(LOAD_ONE_DATA, data => ({ data }));
const loadSearchData = createAction(LOAD_SEARCHED_DATA, data => ({ data }));
const loadPopularData = createAction(LOAD_POPULAR_DATA, data => ({ data }));
const loadLikedData = createAction(LOAD_LIKED_DATA, data => ({ data }));
const addLikedData = createAction(ADD_LIKED_DATA, data => ({ data }));
const subLikedData = createAction(SUB_LIKED_DATA, itemId => ({ itemId }));
const addMood = createAction(ADD_MODE, mood => ({ mood }));
const deleteMood = createAction(DELETE_MODE, mood => ({ mood }));
const addSelectedMood = createAction(ADD_SELECTEMOOD, mood => ({ mood }));
const resetLikedMood = createAction(RESET_LIKEDMOOD, () => ({}));
const resetSelectiedMood = createAction(RESET_SELECTEDMOOD, () => ({}));
const increase_liked = createAction(INCREASE_LIKED, itemId => ({ itemId }));
const decrease_liked = createAction(DECREASE_LIKED, itemId => ({ itemId }));

//init
const initialState = {
  items: [],
  selectedItems: {},
  searchedItems: [],
  popluarItems: [],
  likedItems: [],
  likedMood: [],
  selectedMood: [],
  isLoading: false,
  isLikedDataLoading: false,
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
    if (getState().items.isLoading === true) return;
    if (getState().items.paging.isEnd === true) {
      dispatch(loading(false));
      return;
    }
    dispatch(loading(true));
    axios
      .get(
        `http://ec2-3-13-167-112.us-east-2.compute.amazonaws.com/product/newwest/${
          getState().items.paging.next
        }`
      )
      .then(res => {
        if (res.data.success) {
          if (res.data.data.length === 0) {
            dispatch(noMoreReceive());
            return;
          }
          dispatch(saveData(res.data.data));
          return;
        }
        console.log("loadClothesDataOnDB에서 문제가 생겼습니다.");
      })
      .catch(error => {
        console.log("데이터를 받아오지 못했습니다!", error);
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };
};

const loadOneClothesDataOnDB = itemId => {
  return function (dispatch, getState, { history }) {
    axios
      .get(
        `http://ec2-3-13-167-112.us-east-2.compute.amazonaws.com/product/${itemId}`
      )
      .then(res => {
        dispatch(loadOneData(res.data.data));
      })
      .catch(error => {
        console.log("데이터를 받아오지 못했습니다!", error);
      });
  };
};

const loadSearchedClothesDataOnDB = itemName => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));

    axios
      .get(
        `http://ec2-3-13-167-112.us-east-2.compute.amazonaws.com/product/search?q=${itemName}`
      )
      .then(res => {
        console.log(res);
        if (res.data.success) {
          dispatch(loadSearchData(res.data.data));
        }
      })
      .catch(error => {
        console.log(
          "loadSearchedClothesDataOnDB에서 서버와의 통신이 제대로 연결되지 않았습니다,",
          error
        );
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };
};

const loadPopularClothesDataOnDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get(
        "http://ec2-3-13-167-112.us-east-2.compute.amazonaws.com/product/popular"
      )
      .then(res => {
        dispatch(loadPopularData(res.data.data));
      })
      .catch(error => {
        console.log("데이터를 받아오지 못했습니다!", error);
      });
  };
};

const loadLikedClothesDataOnDB = () => {
  return function (dispatch, getState, { history }) {
    dispatch(likedDataLoading(true));
    axios
      .get(
        ` http://ec2-3-13-167-112.us-east-2.compute.amazonaws.com/user/${
          getState().user.uid
        }/like`
      )
      .then(res => {
        console.log(res);
        if (res.data.success) {
          dispatch(loadLikedData(res.data.data));
        }
      })
      .catch(error => {
        console.log(
          "loadLikedClothesDataOnDB에서 서버와의 통신이 제대로 연결되지 않았습니다.",
          error
        );
      })
      .finally(() => {
        dispatch(likedDataLoading(false));
      });
  };
};
// reducer
export default handleActions(
  {
    [LOADING]: (state, action) =>
      produce(state, draft => {
        draft.isLoading = action.payload.isLoading;
      }),
    [LIKED_DATA_LOADING]: (state, action) =>
      produce(state, draft => {
        draft.isLikedDataLoading = action.payload.isLoading;
      }),
    [NO_MORE_RECEIVE]: (state, action) =>
      produce(state, draft => {
        draft.paging.isEnd = true;
      }),

    [SAVE_DATA]: (state, action) =>
      produce(state, draft => {
        draft.items = [...draft.items, ...action.payload.data];
        draft.paging.next += 8;
        draft.isLoading = false;
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
    [LOAD_LIKED_DATA]: (state, action) =>
      produce(state, draft => {
        draft.likedItems = [...action.payload.data];
      }),
    [ADD_LIKED_DATA]: (state, action) =>
      produce(state, draft => {
        draft.likedItems = [...draft.likedItems, action.payload.data];
      }),
    [SUB_LIKED_DATA]: (state, action) =>
      produce(state, draft => {
        draft.likedItems = draft.likedItems.filter(item => {
          return item.productId !== action.payload.itemId;
        });
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
      }),
    [INCREASE_LIKED]: (state, action) =>
      produce(state, draft => {
        const itemId = action.payload.itemId;
        if (draft.selectedItems && draft.selectedItems.productId === itemId) {
          draft.selectedItems.productLike++;
        }
        let itemIndex = draft.items.findIndex(
          item => item.productId === itemId
        );
        if (itemIndex !== -1) {
          draft.items[itemIndex].productLike++;
        }
        itemIndex = draft.searchedItems.findIndex(
          item => item.productId === itemId
        );
        if (itemIndex !== -1) {
          draft.searchedItems[itemIndex].productLike++;
        }
        itemIndex = draft.popluarItems.findIndex(
          item => item.productId === itemId
        );
        if (itemIndex !== -1) {
          draft.popluarItems[itemIndex].productLike++;
        }
      }),
    [DECREASE_LIKED]: (state, action) =>
      produce(state, draft => {
        const itemId = action.payload.itemId;
        if (draft.selectedItems && draft.selectedItems.productId === itemId) {
          draft.selectedItems.productLike--;
        }
        let itemIndex = draft.items.findIndex(
          item => item.productId === itemId
        );
        if (itemIndex !== -1) {
          draft.items[itemIndex].productLike--;
        }
        itemIndex = draft.searchedItems.findIndex(
          item => item.productId === itemId
        );
        if (itemIndex !== -1) {
          draft.searchedItems[itemIndex].productLike--;
        }
        itemIndex = draft.popluarItems.findIndex(
          item => item.productId === itemId
        );
        if (itemIndex !== -1) {
          draft.popluarItems[itemIndex].productLike--;
        }
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
  loadPopularClothesDataOnDB,
  loadLikedClothesDataOnDB,
  addLikedData,
  subLikedData,
  increase_liked,
  decrease_liked
};

export { actionCreators };
