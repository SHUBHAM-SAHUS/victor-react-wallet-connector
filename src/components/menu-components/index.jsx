import React from 'react';
import { Link } from 'react-router-dom';

const MenuLinksComponents = () => {
  return (
    <> 
      {/* given Links for page re-direction  */}
      <div className='mt-2'>
        <ul className='nav_design d-flex'>
          <li>
            <Link to='/mint'>Mint </Link>
          </li>
          <li>
            <Link to='/collection'> Collections </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MenuLinksComponents;
