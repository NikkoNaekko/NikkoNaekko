import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { actionCreators as itemsAction } from "./items";
// actions
const LOADING = "LOADING";
const EDITING = "EDITING";
const LOAD_COMMENT_DATA = "LOAD_COMMENT_DATA";
const EDIT_COMMENT_DATA = "EDIT_COMMENT_DATA";
const DELETE_COMMENT_DATA = "DELETE_COMMENT_DATA";
// action creators
const loading = createAction(LOADING, isLoading => ({ isLoading }));
const editing = createAction(EDITING, isEditing => ({ isEditing }));
const loadCommentData = createAction(LOAD_COMMENT_DATA, data => ({ data }));

const editCommentData = createAction(
  EDIT_COMMENT_DATA,
  (commentId, userStar, content) => ({
    commentId,
    userStar,
    content
  })
);
const deleteCommentData = createAction(
  DELETE_COMMENT_DATA,
  deletedCommentID => ({ deletedCommentID })
);

// initialState
const initialState = {
  comment: [],
  index: 0,
  isLoading: false,
  isEditing: false
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

const saveCommentDataOnDB = (userStar, content) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    axios
      .post(
        "http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/comment",
        {
          "productId": getState().items.selectedItems.productId,
          "name": getState().user.name,
          "productStar": String(userStar),
          "content": content
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
const editCommentDataOnDB = (commentId, userStar, content) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    axios
      .put(
        "http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/comment",
        {
          "commentId": commentId,
          "productStar": String(userStar),
          "content": content
        }
      )
      .then(res => {
        console.log(res);
        if (res.data.success) {
          dispatch(editCommentData(commentId,String(userStar),content));
          dispatch(itemsAction.editedProductStar(res.data.data.totalStar));
        } else {
          console.log("수정이 원활히 되지 않았습니다.");
        }
      })
      .catch(error => {
        console.log("editCommentDataOnDB 문제가 생겼습니다.", error);
      })
      .finally(_ =>{
        dispatch(loading(false));
        dispatch(editing(false));
      });
  };
};


const deleteCommentDataOnDB = commentID => {
  return function (dispatch, getState, { history }) {
    axios
      .delete(
        `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/comment/${commentID}`
      )
      .then(res => {
        dispatch(itemsAction.editedProductStar(res.data.data.productStar));
        dispatch(deleteCommentData(commentID))
      })
      .catch(error =>
        console.log("deleteCommentDataOnDB에서 문제가 생겼습니다.", error)
      );
  };
};

// reducer
export default handleActions(
  {
    [LOADING]: (state, action) =>
      produce(state, draft => {
        draft.isLoading = action.payload.isLoading;
      }),
    [EDITING]: (state, action) =>
      produce(state, draft => {
        draft.isEditing = action.payload.isEditing;
      }),
    [LOAD_COMMENT_DATA]: (state, action) =>
      produce(state, draft => {
        draft.comment = [...action.payload.data];
      }),
    [EDIT_COMMENT_DATA]: (state, action) =>
      produce(state, draft => {
      const editCommentIndex = draft.comment.findIndex(comment => {
          return comment.commentId === action.payload.commentId
        })
        console.log(editCommentIndex);
        draft.comment[editCommentIndex].userStar = action.payload.userStar;
        draft.comment[editCommentIndex].content = action.payload.content;
      }),
    [DELETE_COMMENT_DATA]: (state, action) =>
      produce(state, draft => {
        draft.comment = draft.comment.filter(comment => {
          return comment.commentId !== action.payload.deletedCommentID;
        });
      })
  },
  initialState
);

// action creator export
const actionCreators = {
  loadCommentDataOnDB,
  editing,
  saveCommentDataOnDB,
  editCommentDataOnDB,
  deleteCommentDataOnDB
};

export { actionCreators };
