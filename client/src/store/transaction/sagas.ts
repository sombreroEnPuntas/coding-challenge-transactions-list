import { all, put, takeLatest } from "redux-saga/effects";
import {
  BrowserProvider,
  Signer,
  Transaction,
  TransactionReceipt,
  TransactionResponse,
  parseUnits,
} from "ethers";

import apolloClient from "../../apollo/client";
import { SaveTransaction } from "../../queries";
import * as ActionTypes from "./actions";

export function* sendTransaction(
  action: ActionTypes.SendTransactionRequestAction
) {
  try {
    const { to, amount } = action.payload;

    const provider = new BrowserProvider((window as any).ethereum, {
      chainId: 1337,
      name: "ganache",
    });
    const signer: Signer = yield provider.getSigner();

    const transaction = {
      to,
      value: parseUnits(amount, "ether"),
    };

    const txResponse: TransactionResponse = yield signer.sendTransaction(
      transaction
    );

    const response: TransactionReceipt = yield txResponse.wait();

    const rawReceipt: Transaction = yield response.getTransaction();

    const receipt: ActionTypes.SerializedReceipt = {
      chainId: rawReceipt.chainId.toString(),
      data: rawReceipt.data?.toString() || "null",
      from: rawReceipt.from?.toString() || "null",
      gasLimit: rawReceipt.gasLimit.toString(),
      gasPrice: rawReceipt.gasPrice?.toString() || "0",
      hash: rawReceipt.hash?.toString() || "null",
      to: rawReceipt.to?.toString() || "null",
      value: rawReceipt.value.toString(),
    };

    // for testing only!
    // const receipt: ActionTypes.SerializedReceipt = {
    //   chainId: "1337",
    //   data: "null",
    //   from: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1",
    //   gasLimit: "5",
    //   gasPrice: "0",
    //   hash: "0xTEST",
    //   to,
    //   value: transaction.value.toString(),
    // };

    yield put({
      type: ActionTypes.SEND_TRANSACTION_SUCCESS,
      payload: { receipt },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    // in real life, should be a logger!
    console.log(">>> sendTransaction failed!", error);

    yield put({
      type: ActionTypes.SEND_TRANSACTION_FAILURE,
      payload: {
        error: message,
      },
    });
  }
}

export function* watchSendTransaction() {
  yield takeLatest(ActionTypes.SEND_TRANSACTION_REQUEST, sendTransaction);
}

function* saveTransactionDetails(
  action: ActionTypes.SendTransactionSuccessAction
) {
  try {
    const { receipt } = action.payload;
    const variables = {
      transaction: {
        ...receipt,
      },
    };

    yield apolloClient.mutate({
      mutation: SaveTransaction,
      variables,
    });
  } catch (error) {
    // in real life, should be a logger!
    console.log(">>> saveTransactionDetails failed!", error);
  }
}

function* watchTransactionSuccess() {
  yield takeLatest(
    ActionTypes.SEND_TRANSACTION_SUCCESS,
    saveTransactionDetails
  );
}

export default function* transactionSaga() {
  yield all([watchSendTransaction(), watchTransactionSuccess()]);
}
