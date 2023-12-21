import { Transaction } from "ethers";

export const SEND_TRANSACTION_REQUEST = "SEND_TRANSACTION_REQUEST";
export const SEND_TRANSACTION_SUCCESS = "SEND_TRANSACTION_SUCCESS";
export const SEND_TRANSACTION_FAILURE = "SEND_TRANSACTION_FAILURE";
export const CLEAR_TRANSACTION_REQUEST = "CLEAR_TRANSACTION_REQUEST";

export interface SendTransactionRequestAction {
  type: typeof SEND_TRANSACTION_REQUEST;
  payload: {
    to: string;
    amount: string;
  };
}

export interface SerializedReceipt {
  chainId: string;
  data: string;
  from: string;
  gasLimit: string;
  gasPrice: string;
  hash: string;
  to: string;
  value: string;
}
export interface SendTransactionSuccessAction {
  type: typeof SEND_TRANSACTION_SUCCESS;
  payload: {
    receipt: SerializedReceipt;
  };
}

export interface SendTransactionFailureAction {
  type: typeof SEND_TRANSACTION_FAILURE;
  payload: {
    error: string;
  };
}

export interface ClearTransactionRequestAction {
  type: typeof CLEAR_TRANSACTION_REQUEST;
}

export type TransactionActionTypes =
  | SendTransactionRequestAction
  | SendTransactionSuccessAction
  | SendTransactionFailureAction
  | ClearTransactionRequestAction;
