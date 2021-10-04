import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const LOG_IN = "LOG_IN";
const LIKE = "LIKE";
const DISLIKE = "DISLIKE";
const LOAD_ONE_DATA = "user/LOAD_ONE_DATA";

// action creators
const logIn = createAction(LOG_IN, (user_id) => ({ user_id }));
const Like = createAction(LIKE, (itemID) => ({ itemID }));
const disLike = createAction(DISLIKE, (itemID) => ({ itemID }));
const loadOneData = createAction(LOAD_ONE_DATA, (data) => ({ data }));

// initialState
const initialState = {
    uid:'',
    id : 'admin@admin.com',
    name : 'ablue',
    token: '',
    likedItems: [],
    isFirst: false,
}


//middle ware
const loadOneUserDataFromDB = (userID) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://localhost:3000/users/${userID}`)
      .then((data) => {
        dispatch(loadOneData(data.data));
      })
      .catch((error) => {
        console.log("사용자 데이터를 받아오지 못했습니다!", error);
      });
  };
};

const syncStateAndDB = (userID) => {
  return async function (dispatch, getState, { history }) {
    const data = {
      ...getState().user,
      likedItems: getState().user.likedItems,
    };

    axios
      .put(`http://localhost:3000/users/${userID}`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log("취향 추가 실패", error);
      });
  };
};

const signUpDB = (id, pwd, name) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "post",
      url: "http://localhost:3000/users",
      data: {
        uid: "",
        id: id,
        password: pwd,
        name: name,
        token: "",
        likedItems: [],
        isFirst: true,
      },
    })
      .then((res) => {
        console.log("회원 정보가 추가되었습니다.");
        history.push("/recommend");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("회원가입 실패", errorCode, errorMessage);
      });
  };
};

// reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        // produce의 첫번째 인자는 원본 값, 두번째 인자는 createAction의 입력인자(user_id)가 들어있는 객체이다.
        draft.id = action.payload.user_id; // action.payload안에 createAction에 넣어놓았던 데이터가 들어있다.
      }),
    [LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.likedItems = [...draft.likedItems, action.payload.itemID];
      }),
    [DISLIKE]: (state, action) =>
      produce(state, (draft) => {
        const likeAry = draft.likedItems.filter(
          (value) => value !== action.payload.itemID
        );
        draft.likedItems = [...likeAry];
      }),
    [LOAD_ONE_DATA]: (state, action) =>
      produce(state, (draft) => {
        draft.id = action.payload.data.id;
        draft.uid = action.payload.data.uid;
        draft.password = action.payload.data.password;
        draft.name = action.payload.data.name;
        draft.token = action.payload.data.token;
        draft.isFirst = action.payload.data.isFirst;
      }),
  },
  initialState
);

// action creator export
const actionCreators = {
  logIn,
  Like,
  disLike,
  signUpDB,
  loadOneUserDataFromDB,
  syncStateAndDB,
};

export { actionCreators };
