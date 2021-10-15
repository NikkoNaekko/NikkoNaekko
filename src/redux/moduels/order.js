import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const LOAD_ALL_DATA = "order/LOAD_ALL_DATA";
const ADD_FILTER_DATA = " order/FILTER_DATA";

// action creators
const loadAllData = createAction(LOAD_ALL_DATA, data => ({ data }));
const addFilterData = createAction(ADD_FILTER_DATA, data => ({ data }));

// initialState
const initialState = {
  orders: [],
  // id: "",
  // userUid: "",
  // itemId: [],
  // orderDt: "",
  filteredData: []
};

//middleware

const loadAllOrdersDataOnDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://localhost:3000/order?user_id=${getState().user.id}`)
      .then(res => {
        console.log(res.data);
        dispatch(loadAllData(res.data));
      })
      .catch(error => {
        console.log("데이터를 받아오지 못했습니다!", error);
      });
  };
};

const addOneClothesDataOnState = itemID => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://localhost:3000/posts/${itemID}`)
      .then(res => {
        console.log(res.data);
        dispatch(addFilterData(res.data));
      })
      .catch(error => {
        console.log("데이터를 받아오지 못했습니다!", error);
      });
  };
};

// reducer
export default handleActions(
  {
    [LOAD_ALL_DATA]: (state, action) =>
      produce(state, draft => {
        draft.orders = action.payload.data;
      }),
    [ADD_FILTER_DATA]: (state, action) =>
      produce(state, draft => {
        draft.filteredData = [...state.filteredData, action.payload.data];
      })
  },
  initialState
);

// action creator export
const actionCreators = {
  loadAllData,
  loadAllOrdersDataOnDB,
  addFilterData,
  addOneClothesDataOnState
};

export { actionCreators };
