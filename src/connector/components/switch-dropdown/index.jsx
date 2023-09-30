import { useEffect, useContext, useState } from 'react';
import { useSwitchNetwork, useNetwork } from 'wagmi';
import { SomeChain } from '../../context/WagmiProvider';
import { useDetectClickOutside } from 'react-detect-click-outside';
import PropTypes from 'prop-types';
import dropdownarrow from '../../assets/dropdown arrow.svg';
const SwitchDropdown = ({ isSwitchLoader }) => {
  //  useSwitchNetwork is custom hooks import from wagmi
  const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();
  const [isPopupOpen, setpopup] = useState(false);
  const { chain } = useNetwork();
  const chains = useContext(SomeChain);

  useEffect(() => {
    isSwitchLoader(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const hanlderOutsideClick = () => {
    setpopup(false);
  };
  //  handle poPup for outSideCkick
  const ref = useDetectClickOutside({ onTriggered: hanlderOutsideClick });

  return (
    <>
      <div className='select_network_wrp' onClick={() => setpopup(!isPopupOpen)} ref={ref}>
        <button className='d-flex align-items-center'>
          {chain?.name}
          <div className='network_title'>
            <img src={dropdownarrow} width={12} height={12} fetchpriority='high' alt='dorpdown' />
          </div>
        </button>
        <div>
          <ul className={`select_network_list  ${isPopupOpen ? 'd-block' : 'none'} `}>
            {/* custom network chains */}
            {chains.map((x) => (
              <li key={x.id}>
                <button
                  disabled={!switchNetwork || x.id === chain?.id}
                  onClick={() => switchNetwork?.(x.id)}
                  value={x?.id}
                >
                  {x.name}
                  {isLoading && pendingChainId === x.id && ' (switching)'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
// propTypes
SwitchDropdown.propTypes = {
  isSwitchLoader: PropTypes.func,
};

export default SwitchDropdown;
