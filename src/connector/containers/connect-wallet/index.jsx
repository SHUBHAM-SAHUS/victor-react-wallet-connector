import React from "react";
import ConnectionDropdown from "../../components/connection-dropdown";
import "../../connector.css";
import ConnectWalletState from "connector/components/connect-wallet-state";

const ConnectWallet = () => {
  return (
    <>
      <ConnectionDropdown>
        <ConnectWalletState />
      </ConnectionDropdown>
    </>
  );
};

export default ConnectWallet;
