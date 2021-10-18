import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { actionCreators as cartAction } from "./cart";
import { actionCreators as itemsAction } from "./items";
import { actionCreators as orderAction } from "./order";
// actions
const SAVE_USER_DATA = "SAVE_USER_DATA";
const REMOVE_USER_DATA = "REMOVE_USER_DATA";
const LOADING = "loading";
const LIKE = "LIKE";
const DISLIKE = "DISLIKE";
const LIKE_ARY = "LIKE_ARY";

// action creators
const saveUserData = createAction(
  SAVE_USER_DATA,
  (uid, userId, name, isFirst, likeItems) => ({
    uid,
    userId,
    name,
    isFirst,
    likeItems
  })
);
const removeUserData = createAction(REMOVE_USER_DATA, isLoading => ({
  isLoading
}));
const loading = createAction(LOADING, isLoading => ({ isLoading }));
const like = createAction(LIKE, itemID => ({ itemID }));
const disLike = createAction(DISLIKE, itemID => ({ itemID }));
const likeAry = createAction(LIKE_ARY, itemsID => ({ itemsID }));

// initialState
const initialState = {
  uid: null,
  id: null,
  name: null,
  likedItemsID: [],
  isFirst: null,
  isLoading: false,
  isLogin: false
};

//middle ware
const signIn = (id, pwd) => {
  return async function (dispatch, getState, { history }) {
    await dispatch(loading(true));
    axios({
      method: "post",
      url: "http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/user/login",
      data: {
        id: id,
        password: pwd
      }
    })
      .then(res => {
        if (res.data.success) {
          const { uid, userId, name, isFirst, likeItems, token } =
            res.data.data;
          dispatch(saveUserData(uid, userId, name, isFirst, likeItems));
          dispatch(cartAction.loadCartInfomationDB());
          sessionStorage.setItem("my_token", token);
          alert(name + "님 안녕하세요!");
          if (getState().user.isFirst) {
            history.push("/recommend");
          } else {
            history.push("/main");
          }
        } else {
          alert("가입되지 않은 ID거나 비밀번호가 일치하지 않습니다.");
        }
      })
      .catch(error => {
        alert("로그인 과정이 원활하게 진행되지 않았습니다.", error);
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };
};
const signOut = () => {
  return function (dispatch, getState, { history }) {
    dispatch(removeUserData());
    dispatch(cartAction.removeCart());
    dispatch(orderAction.removeOrder());
    sessionStorage.removeItem("my_token");
    alert("로그아웃되었습니다.");
    history.push("/");
  };
};

const signUpDB = (id, pwd, name) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    axios({
      method: "post",
      url: "http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/user/join",
      data: {
        name: name,
        id: id,
        password: pwd
      }
    })
      .then(res => {
        if (res.data.success === true) {
          alert("회원가입을 성공했습니다.");
          history.push("/");
        } else if (res.data.success === false) {
          alert("이미 가입된 회원정보입니다.");
        }
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(
          "회원가입이 실패하였습니다. 개발자에게 문의주세요",
          errorCode,
          errorMessage
        );
      })
      .finally(_ => {
        dispatch(loading(false));
      });
  };
};

const iLikeOneProduct = itemID => {
  return function (dispatch, getState, { history }) {
    dispatch(like(itemID));
    dispatch(itemsAction.increase_liked(itemID));
    const items = getState().items.items;
    let itemIndex = items.findIndex(item => item.productId === itemID);
    if (itemIndex !== -1) {
      dispatch(itemsAction.addLikedData(items[itemIndex]));
    } else {
      const popluarItems = getState().items.popluarItems;
      itemIndex = popluarItems.findIndex(item => item.productId === itemID);
      if (itemIndex !== -1) {
        dispatch(itemsAction.addLikedData(popluarItems[itemIndex]));
      }
    }

    axios
      .post(
        `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/user/${
          getState().user.uid
        }/like/${itemID}`
      )
      .then(res => {})
      .catch(error => {
        alert("좋아요가 DB에 반영되지 않았습니다.", error);
      });
  };
};

const iLikeSeveralProduct = itemAry => {
  return async function (dispatch, getState, { history }) {
    await dispatch(loading(true));
    axios
      .post(
        `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/user/${
          getState().user.uid
        }/like`,
        itemAry
      )
      .then(res => {
        if (res.data.success) {
          history.push("/main");
        }
        dispatch(checkFirstOnDB());
      })
      .catch(error => {
        alert("좋아요가 DB에 반영되지 않았습니다.", error);
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };
};

const disLikeOnDB = itemID => {
  return function (dispatch, getState, { history }) {
    dispatch(disLike(itemID));
    dispatch(itemsAction.decrease_liked(itemID));
    dispatch(itemsAction.subLikedData(itemID));
    axios
      .post(
        `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/user/${
          getState().user.uid
        }/likeCancel/${itemID}`
      )
      .then(res => {})
      .catch(error => {
        alert("좋아요 취소가 DB에 반영되지 않았습니다.", error);
      });
  };
};

const checkFirstOnDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .post(
        `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/user/firstVisit/${
          getState().user.uid
        }`
      )
      .then(res => {
        if (res.data.success) {
          const { uid, userId, name, isFirst, likeItems } = res.data.data;
          dispatch(saveUserData(uid, userId, name, isFirst, likeItems));
        }
        history.push("/main");
      })
      .catch(error => {
        alert("첫방문 여부 파악에 문제가 발생했습니다.", error);
      });
  };
};

// reducer
export default handleActions(
  {
    [SAVE_USER_DATA]: (state, action) =>
      produce(state, draft => {
        const { uid, userId, name, isFirst, likeItems } = action.payload;
        draft.uid = uid;
        draft.id = userId;
        draft.name = name;
        draft.isFirst = isFirst;
        draft.likedItemsID = [...likeItems];
        draft.isLogin = true;
      }),
    [REMOVE_USER_DATA]: state =>
      produce(state, draft => {
        draft.uid = null;
        draft.id = null;
        draft.name = null;
        draft.isFirst = null;
        draft.isLogin = false;
        draft.likedItemsID = null;
        sessionStorage.removeItem("my_token");
      }),
    [LOADING]: (state, action) =>
      produce(state, draft => {
        draft.isLoading = action.payload.isLoading;
      }),
    [LIKE]: (state, action) =>
      produce(state, draft => {
        draft.likedItemsID = [...draft.likedItemsID, action.payload.itemID];
      }),
    [DISLIKE]: (state, action) =>
      produce(state, draft => {
        const likeAry = draft.likedItemsID.filter(
          value => value !== action.payload.itemID
        );
        draft.likedItemsID = [...likeAry];
      }),
    [LIKE_ARY]: (state, action) =>
      produce(state, draft => {
        draft.likedItemsID = [...action.payload.itemsID];
      })
  },
  initialState
);

// action creator export
const actionCreators = {
  signIn,
  signOut,
  loading,
  iLikeOneProduct,
  disLikeOnDB,
  signUpDB,
  iLikeSeveralProduct,
  checkFirstOnDB,
  likeAry,
  like,
  disLike
};

export { actionCreators };
