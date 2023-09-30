import React from "react";
import PropTypes from "prop-types";
import { createContext } from "react";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, polygonMumbai, goerli } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
export const SomeChain = createContext(null);

const WagmiProvider = ({ children }) => {
  // Wagmi client
  const infurakey = process.env.REACT_APP_INFURA_ID.toString();
  const { chains, provider } = configureChains(
    [polygon, polygonMumbai, mainnet, goerli],
    [infuraProvider({ apiKey: infurakey }), publicProvider()],
  );

  const connectors = [
    new MetaMaskConnector({
      chains,
      options: {
        appName: "NiftyWallet",
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
        shimChainChangedDisconnect: true,
      },
    }),
  ];
  if (
    process.env.REACT_APP_CONNECTOR_ALLOW_OTHER_WALLETS === "1" ||
    process.env.NEXT_PUBLIC_CONNECTOR_ALLOW_OTHER_WALLETS === "1"
  ) {
    connectors.push(
      // new InjectedConnector({
      //   chains,
      //   options: {
      //     appName: "NiftyWallet",
      //     name: (detectedName) =>
      //       `Injected (${
      //         typeof detectedName === "string" ? detectedName : detectedName.join(", ")
      //       })`,
      //     shimDisconnect: true,
      //     UNSTABLE_shimOnConnectSelectAccount: true,
      //     shimChainChangedDisconnect: true,
      //   },
      // }),
      new CoinbaseWalletConnector({
        options: {
          appName: "NiftyWallet",
          // jsonRpcUrl: "https://eth-mainnet.alchemyapi.io/v2/yourAlchemyId",
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          appName: "NiftyWallet",
          qrcode: true,
        },
      }),
    );
  }

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <SomeChain.Provider value={chains}>{children}</SomeChain.Provider>
    </WagmiConfig>
  );
};

WagmiProvider.propTypes = {
  children: PropTypes.node,
};

export default WagmiProvider;
