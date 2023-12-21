import { all, put, takeLatest } from "redux-saga/effects";
import {
  BrowserProvider,
  Signer,
  Transaction,
  TransactionReceipt,
  TransactionResponse,
  parseEther,
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
      value: parseEther(amount),
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
      value: parseUnits(rawReceipt.value.toString(), "wei").toString(),
    };

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
