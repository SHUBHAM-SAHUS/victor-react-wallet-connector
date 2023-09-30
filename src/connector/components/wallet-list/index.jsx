import React from "react";
import { isMobile } from "react-device-detect";
import metamask from "../../assets/metamask.svg";
import walletConnect from "../../assets/Wallet connect.svg";
import coinbase from "../../assets/Coinbase.svg";
// import injected from "../../assets/Wallet.svg";
import PropTypes from "prop-types";
// import { InjectedConnector } from "@wagmi/core";
import { useConnect } from "wagmi";
//  Wallet list
const WalletList = ({ onClosePopup }) => {
  const { connect, connectors } = useConnect({
    // connector: new InjectedConnector(),
  });

  const isConnectWallet = async (connector) => {
    if (isMobile && connector.id === 'metaMask') {
      const { ethereum } = window;
      if (ethereum) {
        connect({ connector });
      } else {
        // for  small devices metamask Re-direction
        const host = window.location.protocol + '//' + window.location.host;
        window.location.href = `https://metamask.app.link/dapp/${host}/`;
      }
    } else {
      connect({ connector });
    }
  };
  const ConnectHandle = (e, connector) => {
    e.stopPropagation();
    isConnectWallet(connector);
    onClosePopup();
  };

  // for  wallet images
  const walletImageHandler = (id) => {
    if (id === 'metaMask') {
      return metamask;
    } else if (id === 'walletConnect') {
      return walletConnect;
    } else if (id === 'coinbaseWallet') {
      return coinbase;
      // } else {
      //   return injected;
    }
  };

  return (
    <>
      {connectors.map((connector) => (
        <li
          className='heading_text text-white d-flex'
          target='_blank'
          onClick={(e) => ConnectHandle(e, connector)}
          key={connector?.id}
        >
          {' '}
          <span>
            {' '}
            <img
              fetchpriority='high'
              src={walletImageHandler(connector?.id)}
              height={24}
              width={24}
              alt='walletIcon'
              className=''
            />
          </span>
          <span className='ml-2'> {connector.name} </span>{' '}
        </li>
      ))}
    </>
  );
};

WalletList.propTypes = {
  onClosePopup: PropTypes.func,
};

export default WalletList;
