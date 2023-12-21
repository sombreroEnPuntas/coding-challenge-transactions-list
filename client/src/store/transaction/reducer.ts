import * as ActionTypes from "./actions";

export interface TransactionState {
  error: string | null;
  hash: string | null;
  status: "PENDING" | "DONE" | null;
}

const initialState: TransactionState = {
  error: null,
  hash: null,
  status: null,
};

const transactionReducer = (
  state = initialState,
  action: ActionTypes.TransactionActionTypes
): TransactionState => {
  switch (action.type) {
    case ActionTypes.SEND_TRANSACTION_REQUEST:
      return {
        ...state,
        error: null,
        hash: null,
        status: "PENDING",
      };
    case ActionTypes.SEND_TRANSACTION_SUCCESS:
      return {
        ...state,
        error: null,
        hash: action.payload.receipt.hash,
        status: "DONE",
      };
    case ActionTypes.SEND_TRANSACTION_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        hash: null,
        status: "DONE",
      };
    case ActionTypes.CLEAR_TRANSACTION_REQUEST:
      return {
        ...state,
        error: null,
        hash: null,
        status: null,
      };
    default:
      return state;
  }
};

export default transactionReducer;
