import React, { useState } from 'react';
import WalletList from '../wallet-list';
import ConnectedDropdown from '../connected-dropdown';
import PropTypes from 'prop-types';
import './connection.css';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAccount } from 'wagmi';
const ConnectionDropdown = ({ children }) => {
  const { isConnected } = useAccount();
  const [isPopupOpen, setOpenPopup] = useState(false);

  // poPup Handler
  const popUpClickHandler = () => {
    setOpenPopup(!isPopupOpen);
  };

  const hanlderOutsideClick = () => {
    setOpenPopup(false);
  };

  //  refrence for outside click
  const ref = useDetectClickOutside({ onTriggered: hanlderOutsideClick });

  return (
    <>
      <div ref={ref}>
        <div className='popup_wrp d-flex justify-content-center' data-bs-auto-close='inside'>
          <div onClick={() => popUpClickHandler()} variant='success' id='dropdown-basic' className='toggle_btn'>
            {children}
          </div>{' '}
          <ul className={`menu  drop_down_menu  ${isPopupOpen ? 'show' : ''}    `}>
            {isConnected ? (
              //  after connect
              <ConnectedDropdown onClosePopup={() => setOpenPopup(false)} />
            ) : (
              isPopupOpen && (
                // before connect
                <WalletList onClosePopup={() => setOpenPopup(false)} />
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
//  defind PropTypes
ConnectionDropdown.propTypes = {
  children: PropTypes.node,
};

export default ConnectionDropdown;
