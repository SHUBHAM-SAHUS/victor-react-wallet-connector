import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SwitchDropdown from '../switch-dropdown';
import LoadingSpinner from '../loader';
import check from '../../assets/Check.svg';
import copy from '../../assets/Copy.svg';
import wifi from '../../assets/WiFi.svg';
import switchAccountImg from '../../assets/Switch Account.svg';
import disConnect from '../../assets/Disconnect.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';
import { useDisconnect, useAccount } from 'wagmi';

const ConnectedDropdown = ({ onClosePopup }) => {
  const { address, connector: activeConnector } = useAccount();
  const { disconnect } = useDisconnect();
  const [textCopy, setCopy] = useState(false);
  const [Loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isHidden, setHidden] = useState(false);

  const [isMetamask, setMetaMask] = useState(false);

  //  get user connected with which wallet
  const isConnectedWithMetaMask = () => {
    if (activeConnector?.name === 'MetaMask') {
      setMetaMask(true);
    } else {
      setMetaMask(false);
    }
  };

  useEffect(() => {
    isConnectedWithMetaMask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMetamask, activeConnector]);

  const isSwitchLoader = (val) => {
    setLoading(val);
    if (!val) {
      onClosePopup();
    }
  };

  // For Copy
  const addressCopy = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, [1000]);
  };

  //  switch Accounts

  const switchAccount = (provider) => {
    provider
      .request({
        method: 'wallet_requestPermissions',
        params: [
          {
            eth_accounts: {},
          },
        ],
      })
      .then((res) => {
        //  handle after accountSwitch popup close
        onClosePopup();
      })
      .catch((err) => {
        onClosePopup();
      });
  };

  const handleSwitchAccounts = async (e) => {
    e.stopPropagation();
    const { ethereum } = window;
    if (window.web3.currentProvider.isCoinbaseWallet) {
      const provider = ethereum.providers.find((provider) => provider.isMetaMask);
      switchAccount(provider); //If Coinbase and MetaMask install in browser
    } else {
      switchAccount(ethereum); // If only Metamask install in browser
    }
  };

  //  for disConnect wallet
  const disconnectHandler = () => {
    onClosePopup();
    disconnect();
  };

  return (
    <>
      <li onClick={() => addressCopy()}>
        <img fetchpriority='high' src={`${textCopy ? check : copy}`} height={18} width={18} alt='img' />

        <CopyToClipboard text={address} onCopy={() => addressCopy()}>
          <span className='heading_text'>Copy address</span>
        </CopyToClipboard>
      </li>

      <li className='switch_btn_dropdown d-inline-flex align-items-center'>
        {Loading ? <LoadingSpinner /> : <img fetchpriority='high' src={wifi} height={18} width={18} alt='img' />}
        <SwitchDropdown isSwitchLoader={isSwitchLoader} onClosePopup={onClosePopup} />
      </li>
      {isMetamask && (
        <li onClick={(e) => handleSwitchAccounts(e)} className='d-none d-sm-block'>
          <img fetchpriority='high' src={switchAccountImg} height={16} width={16} alt='img' />
          <span className='heading_text ps-1'>Switch Account</span>
        </li>
      )}

      <li>
        <Dropdown.Item onClick={() => disconnectHandler()} className='d-inline-flex align-items-center'>
          <img fetchpriority='high' src={disConnect} height={18} width={18} alt='img' />
          <span className='heading_text '>Disconnect </span>
        </Dropdown.Item>
      </li>
    </>
  );
};

ConnectedDropdown.propTypes = {
  onClosePopup: PropTypes.func,
};

export default ConnectedDropdown;
