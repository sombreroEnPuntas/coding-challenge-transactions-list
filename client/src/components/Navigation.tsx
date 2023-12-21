import React from "react";
import { WalletState } from "@web3-onboard/core";

import SendTransaction from "./SendTransaction";
import { navigate } from "./NaiveRouter";

interface Props {
  wallet: WalletState | undefined;
  handleConnect: () => Promise<void>;
}
const Navigation: React.FC<Props> = ({ wallet, handleConnect }) => {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-ful text-sm py-4 bg-gray-800">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-center sm:justify-between">
          <button
            className="flex-none text-xl font-semibold dark:text-white"
            onClick={() => navigate("/transactions")}
          >
            Transactions List
          </button>
        </div>
        <div className="hs-collapse overflow-hidden transition-all duration-300 basis-full grow">
          <div className="flex flex-col mt-4 gap-2 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
            {wallet && (
              <>
                <SendTransaction fromAddress={wallet.accounts[0].address} />
                <p className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-gray-200 text-sm">
                  {wallet.accounts[0].address}
                </p>
              </>
            )}
            {!wallet && (
              <button
                type="button"
                onClick={handleConnect}
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-gray-200 hover:text-white hover:bg-gray-500 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-all text-sm"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
