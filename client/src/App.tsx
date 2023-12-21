import { useCallback, useState } from "react";
import { WalletState } from "@web3-onboard/core";

import NaiveRouter from "./components/NaiveRouter";
import Navigation from "./components/Navigation";

import "./App.css";

interface Props {
  onboard: any;
}
function App({ onboard }: Props) {
  const [wallet, setWallet] = useState<WalletState>();

  const handleConnect = useCallback(async () => {
    const wallets = await onboard.connectWallet();

    const [metamaskWallet] = wallets;

    if (
      metamaskWallet.label === "MetaMask" &&
      metamaskWallet.accounts[0].address
    ) {
      setWallet(metamaskWallet);
    }
  }, [onboard]);

  return (
    <div>
      <Navigation {...{ wallet, handleConnect }} />
      <NaiveRouter />
    </div>
  );
}

export default App;
