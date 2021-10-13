import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { actionCreators as cartAction } from "./cart";
// actions
const SAVE_USER_DATA = "SAVE_USER_DATA";
const REMOVE_USER_DATA = "REMOVE_USER_DATA";
const LOADING = "loading";
const LIKE = "LIKE";
const DISLIKE = "DISLIKE";

// action creators
const saveUserData = createAction(
  SAVE_USER_DATA,
  (uid, userId, name, isFirst) => ({
    uid,
    userId,
    name,
    isFirst
  })
);
const removeUserData = createAction(REMOVE_USER_DATA, isLoading => ({
  isLoading
}));
const loading = createAction(LOADING, isLoading => ({ isLoading }));
const Like = createAction(LIKE, itemID => ({ itemID }));
const disLike = createAction(DISLIKE, itemID => ({ itemID }));

// initialState
const initialState = {
  uid: null,
  id: null,
  name: null,
  likedItems: [],
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
      url: "http://ec2-3-13-167-112.us-east-2.compute.amazonaws.com/user/login",
      data: {
        id: id,
        password: pwd
      }
    })
      .then(res => {
        console.log(res);
        if (res.data.success) {
          const { uid, userId, name, isFirst, token } = res.data.data;
          dispatch(saveUserData(uid, userId, name, isFirst));
          dispatch(cartAction.loadCartInfomationDB());
          sessionStorage.setItem("my_token", token);
          alert(name + "님 안녕하세요!");
          history.push("/main");
        } else {
          alert("가입되지 않은 ID거나 비밀번호가 일치하지 않습니다.");
        }
      })
      .catch(error => {
        console.log("로그인 과정이 원활하게 진행되지 않았습니다.", error);
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };
};
const signOut = () => {
  return function (dispatch, getState, { history }) {
    dispatch(removeUserData);
    dispatch(cartAction.removeCart());
    alert("로그아웃되었습니다.");
    history.push("/");
  };
};

const syncStateAndDB = userID => {
  return async function (dispatch, getState, { history }) {
    const data = {
      ...getState().user,
      likedItems: getState().user.likedItems
    };

    axios
      .put(`http://localhost:3000/users/${userID}`, data)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log("취향 추가 실패", error);
      });
  };
};

const signUpDB = (id, pwd, name) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    axios({
      method: "post",
      url: "http://ec2-3-13-167-112.us-east-2.compute.amazonaws.com/user/join",
      data: {
        name: name,
        id: id,
        password: pwd
      }
    })
      .then(res => {
        console.log(res);
        if (res.data.success === true) {
          console.log("회원 정보가 추가되었습니다.");
          history.push("/");
        } else if (res.data.success === false) {
          console.log("회원 정보 추가 실패");
          alert("이미 가입된 회원정보입니다.");
        }
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("회원가입 실패", errorCode, errorMessage);
      })
      .finally(_ => {
        dispatch(loading(false));
      });
  };
};

// reducer
export default handleActions(
  {
    [SAVE_USER_DATA]: (state, action) =>
      produce(state, draft => {
        // produce의 첫번째 인자는 원본 값, 두번째 인자는 createAction의 입력인자(user_id)가 들어있는 객체이다.
        const { uid, userId, name, isFirst } = action.payload;
        draft.uid = uid;
        draft.id = userId;
        draft.name = name;
        draft.isFirst = isFirst;
        draft.isLogin = true;
      }),
    [REMOVE_USER_DATA]: state =>
      produce(state, draft => {
        draft.uid = null;
        draft.id = null;
        draft.name = null;
        draft.isFirst = null;
        draft.isLogin = false;
        sessionStorage.removeItem("my_token");
      }),
    [LOADING]: (state, action) =>
      produce(state, draft => {
        draft.isLoading = action.payload.isLoading;
      }),
    [LIKE]: (state, action) =>
      produce(state, draft => {
        draft.likedItems = [...draft.likedItems, action.payload.itemID];
      }),
    [DISLIKE]: (state, action) =>
      produce(state, draft => {
        const likeAry = draft.likedItems.filter(
          value => value !== action.payload.itemID
        );
        draft.likedItems = [...likeAry];
      })
  },
  initialState
);

// action creator export
const actionCreators = {
  signIn,
  signOut,
  loading,
  Like,
  disLike,
  signUpDB,
  syncStateAndDB
};

export { actionCreators };
