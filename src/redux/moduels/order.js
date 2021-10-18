import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const LOADING = "LOADING";
const LOAD_ORDERID = "LOAD_ORDERID";
const REMOVE_ORDER = "REMOVE_ORDER";
// action creators

const loading = createAction(LOADING, isLoading => ({ isLoading }));
const loadOrderId = createAction(LOAD_ORDERID, orders => ({ orders }));
const removeOrder = createAction(REMOVE_ORDER);

// initialState
const initialState = {
  orders: null,
  isLoading: false
};

//middleware
const loadOrderOnDB = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    axios
      .get(
        `http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/order/all/${
          getState().user.uid
        }`
      )
      .then(res => {
        if (res.data.success && res.data.data.length > 0) {
          let url =
            "http://ec2-52-78-34-16.ap-northeast-2.compute.amazonaws.com/order/orderId?";
          res.data.data.map(orderInfomation => {
            url += "id=" + orderInfomation.orderId + "&";
          });

          axios
            .get(url)
            .then(res => {
              if (res.data.success) {
                dispatch(loadOrderId(res.data.data));
              }
            })
            .catch(error => {
              alert(
                "loadOrderIdOnDB에서 주문상품정보 조회 수신이 제대로 연결되지 않았습니다.",
                error
              );
            })
            .finally(() => dispatch(loading(false)));
        } else {
          dispatch(loading(false));
        }
      })
      .catch(error => {
        alert(
          "loadOrderIdOnDB에서 주문내역 조회 수신이 제대로 연결되지 않았습니다.",
          error
        );
        dispatch(loading(false));
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
    [LOAD_ORDERID]: (state, action) =>
      produce(state, draft => {
        draft.orders = [...action.payload.orders];
      }),
    [REMOVE_ORDER]: (state, action) =>
      produce(state, draft => {
        draft.orders = null;
      })
  },
  initialState
);

// action creator export
const actionCreators = {
  loadOrderOnDB,
  removeOrder
};

export { actionCreators };
