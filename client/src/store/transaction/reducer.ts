import * as ActionTypes from "./actions";

export interface TransactionState {
  status: "PENDING" | "DONE" | null;
  error: string | null;
}

const initialState: TransactionState = {
  status: null,
  error: null,
};

const transactionReducer = (
  state = initialState,
  action: ActionTypes.TransactionActionTypes
): TransactionState => {
  switch (action.type) {
    case ActionTypes.SEND_TRANSACTION_REQUEST:
      return {
        ...state,
        status: "PENDING",
        error: null,
      };
    case ActionTypes.SEND_TRANSACTION_SUCCESS:
      return {
        ...state,
        status: "DONE",
        error: null,
      };
    case ActionTypes.SEND_TRANSACTION_FAILURE:
      return {
        ...state,
        status: "DONE",
        error: action.payload.error,
      };
    case ActionTypes.CLEAR_TRANSACTION_REQUEST:
      return {
        ...state,
        status: null,
        error: null,
      };
    default:
      return state;
  }
};

export default transactionReducer;
