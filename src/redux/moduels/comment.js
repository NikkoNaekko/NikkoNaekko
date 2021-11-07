import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const LOADING = "LOADING";
const LOAD_COMMENT_DATA = "LOAD_COMMENT_DATA";
// action creators
const loadCommentData = createAction(LOAD_COMMENT_DATA, data => ({ data }));
// initialState
const initialState = {
  comment: [],
  index: 0
};

//middle ware
const loadCommentDataOnDB = productId => {
  return function (dispatch, getState, { history }) {
    axios
      .get(
        `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/comment/product/${productId}/${
          getState().comment.index
        }`
      )
      .then(res => {
        dispatch(loadCommentData(res.data.data));
      })
      .catch(error => {
        console.log("loadCommentDataOnDB에서 문제가 생겼습니다.");
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
    [LOAD_COMMENT_DATA]: (state, action) =>
      produce(state, draft => {
        draft.comment = [...action.payload.data];
      })
  },
  initialState
);

// action creator export
const actionCreators = {
  loadCommentDataOnDB
};

export { actionCreators };
