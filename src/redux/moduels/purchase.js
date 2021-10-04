import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions

// action creators

// initialState
const initialState = {
  id: "",
  userUid: "",
  itemId: [],
  purchaseDt: new Date()
};

//middle ware

// reducer
export default handleActions({}, initialState);

// action creator export
const actionCreators = {};

export { actionCreators };
