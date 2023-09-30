import React from 'react';
import Rolling from '../../assets/Rolling-1.2s-225px.svg';

// loader component
const LoadingSpinner = () => {
  return (
    <>
      <img fetchpriority='high' src={Rolling} alt='Loading...' height={18} width={18} />
    </>
  );
};

export default LoadingSpinner;
