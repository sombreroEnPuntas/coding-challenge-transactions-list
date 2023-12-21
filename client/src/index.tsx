import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";

import client from "./apollo/client";
import store from "./store/store";
import "./index.css";
import "@preline/overlay";

import App from "./App";

const injected = injectedModule();

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: "1337",
      token: "ETH",
      label: "Local Ganache",
      rpcUrl: "http://localhost:8545",
    },
  ],
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <App onboard={onboard} />
      </ReduxProvider>
    </ApolloProvider>
  </React.StrictMode>
);
