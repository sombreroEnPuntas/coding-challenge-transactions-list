import { Store } from "../store";

export const getTransaction = (store: Store) => store.transaction;

export const getTransactionStatus = (store: Store) =>
  getTransaction(store).status;
export const getTransactionError = (store: Store) =>
  getTransaction(store).error;
