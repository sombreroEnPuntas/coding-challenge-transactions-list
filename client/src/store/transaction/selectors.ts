import { Store } from "../store";

export const getTransaction = (store: Store) => store.transaction;

export const getTransactionError = (store: Store) =>
  getTransaction(store).error;
export const getTransactionHash = (store: Store) => getTransaction(store).hash;
export const getTransactionStatus = (store: Store) =>
  getTransaction(store).status;
