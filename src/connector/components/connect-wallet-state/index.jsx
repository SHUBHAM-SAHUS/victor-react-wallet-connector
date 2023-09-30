import React from 'react';
import { truncateString } from '../../utils';
import { useBalance, useAccount } from 'wagmi';
import LoadingSpinner from '../../components/loader';
import metamask from '../../assets/metamask.svg';
import walletConnect from '../../assets/Wallet connect.svg';
import coinbase from '../../assets/Coinbase.svg';
import injected from '../../assets/Wallet.svg';
import dropdownarrow from '../../assets/dropdown arrow.svg';

const ConnectWalletState = () => {
  //  useAccount &&  useBalance custom hooks import from wagmi
  const { isConnected, isConnecting, address, connector: activeConnector } = useAccount();

  const { data, isLoading } = useBalance({ address });

  const walletImageHandler = (activeConnector) => {
    if (activeConnector === 'MetaMask') {
      return metamask;
    } else if (activeConnector === 'Injected (Coinbase Wallet, MetaMask)') {
      return injected;
    } else if (activeConnector === 'Coinbase Wallet') {
      return coinbase;
    } else {
      return walletConnect;
    }
  };

  return (
    <>
      <div>
        {isConnected ? (
          <div>
            <div className="address_text">{truncateString(address, 6)}</div>

            <div className='d-inline-flex align-items-center justify-content-center gap-2'>
              {isLoading ? (
                <span className='balance_text'>Please wait...</span>
              ) : (
                <span className="balance_text">
                  {Number(data?.formatted)?.toFixed(4)} {data?.symbol?.toLowerCase()}
                </span>
              )}

              <img
                fetchpriority='high'
                src={walletImageHandler(activeConnector?.name)}
                width={20}
                height={20}
                alt='Metamask'
              />
              <div>
                <img src={dropdownarrow} width={12} height={12} fetchpriority='high' alt='dropdown' />
              </div>
            </div>
          </div>
        ) : (
          <div>
            {isConnecting ? (
              <>
                <LoadingSpinner />
                <span className='ml-2 capitalize'> Please wait... </span>
              </>
            ) : (
              'Connect Wallet'
            )}{' '}
            <span>
              <img src={dropdownarrow} width={12} height={12} fetchpriority="high" alt="dropdown" />
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default ConnectWalletState;
