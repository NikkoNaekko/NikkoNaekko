import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const LOG_IN = "LOG_IN";
const LOADING = "loading";
const LIKE = "LIKE";
const DISLIKE = "DISLIKE";
const LOAD_ONE_DATA = "user/LOAD_ONE_DATA";

// action creators
const logIn = createAction(LOG_IN, user_id => ({ user_id }));
const loading = createAction(LOADING, isLoading => ({ isLoading }));
const Like = createAction(LIKE, itemID => ({ itemID }));
const disLike = createAction(DISLIKE, itemID => ({ itemID }));
const loadOneData = createAction(LOAD_ONE_DATA, data => ({ data }));

// initialState
const initialState = {
  uid: "4",
  id: "ablue1@naver.com",
  name: "ablue1",
  token: "",
  likedItems: [],
  isFirst: false,
  isLoading: false
};

//middle ware
const loadOneUserDataFromDB = userID => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://localhost:3000/users/${userID}`)
      .then(data => {
        dispatch(loadOneData(data.data));
      })
      .catch(error => {
        console.log("사용자 데이터를 받아오지 못했습니다!", error);
      });
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
        console.log("회원 정보가 추가되었습니다.");
        history.push("/");
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("회원가입 실패", errorCode, errorMessage);
      });
  };
};

const signIn = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    axios({
      method: "post",
      url: "https://cors-anywhere.herokuapp.com/http://ec2-3-13-167-112.us-east-2.compute.amazonaws.com/user/login",
      data: {
        id: id,
        password: pwd
      }
    })
      .then(res => {
        if (res.data === "비밀번호가 틀렸습니다") {
          alert("아이디 또는 비밀번호가 틀렸습니다.");
          dispatch(loading(false));
          return;
        }
        console.log(res);
        sessionStorage.setItem("my_token", res.data);
        dispatch(loading(false));
        history.push("/main");
      })
      .catch(error => {
        if (error === "Error: Request failed with status code 500") {
          alert("존재하지 않는 아이디입니다");
        }
        console.log("로그인 실패", error.errorCode, error.errorMessage);
        console.log("status", error.status);
        dispatch(loading(false));
      });
  };
};

// reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, draft => {
        // produce의 첫번째 인자는 원본 값, 두번째 인자는 createAction의 입력인자(user_id)가 들어있는 객체이다.
        draft.id = action.payload.user_id; // action.payload안에 createAction에 넣어놓았던 데이터가 들어있다.
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
      }),
    [LOAD_ONE_DATA]: (state, action) =>
      produce(state, draft => {
        draft.id = action.payload.data.id;
        draft.uid = action.payload.data.uid;
        draft.password = action.payload.data.password;
        draft.name = action.payload.data.name;
        draft.token = action.payload.data.token;
        draft.isFirst = action.payload.data.isFirst;
      })
  },
  initialState
);

// action creator export
const actionCreators = {
  logIn,
  loading,
  Like,
  disLike,
  signUpDB,
  signIn,
  loadOneUserDataFromDB,
  syncStateAndDB
};

export { actionCreators };
