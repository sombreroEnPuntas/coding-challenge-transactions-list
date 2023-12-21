import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import transactionReducer, { TransactionState } from "./transaction/reducer";
import transactionSaga from "./transaction/sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const reducer = combineReducers({
  transaction: transactionReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

sagaMiddleware.run(function* () {
  yield transactionSaga();
});

export interface Store {
  transaction: TransactionState;
}
export default store;
