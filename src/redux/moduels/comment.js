import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { actionCreators as itemsAction } from "./items";
// actions
const LOADING = "LOADING";
const LOAD_COMMENT_DATA = "LOAD_COMMENT_DATA";
// action creators
const loading = createAction(LOADING, isLoading => ({ isLoading }));
const loadCommentData = createAction(LOAD_COMMENT_DATA, data => ({ data }));

// initialState
const initialState = {
  comment: [],
  index: 0,
  isLoading: false
};

//middle ware
const loadCommentDataOnDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get(
        `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/comment/product/${
          getState().items.selectedItems.productId
        }
        /${getState().comment.index}`
      )
      .then(res => {
        dispatch(loadCommentData(res.data.data));
      })
      .catch(error => {
        console.log("loadCommentDataOnDB에서 문제가 생겼습니다.", error);
      });
  };
};

const saveCommentDataOnDB = (userStar, comment) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    axios
      .post(
        "http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/comment",
        {
          productId: getState().items.selectedItems.productId,
          name: getState().user.name,
          productStar: String(userStar),
          content: comment
        }
      )
      .then(res => {
        if (res.data.success) {
          dispatch(loadCommentDataOnDB());
          dispatch(itemsAction.editedProductStar(res.data.data.totalStar));
        } else {
          console.log("이미 이 회원은 댓글을 작성했습니다.");
          alert("이미 이 상품의 댓글을 작성했습니다.");
        }
      })
      .catch(error => {
        console.log("saveCommentDataOnDB에서 문제가 생겼습니다.", error);
      })
      .finally(dispatch(loading(false)));
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
  loadCommentDataOnDB,
  saveCommentDataOnDB
};

export { actionCreators };
