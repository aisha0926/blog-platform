import React from 'react';
import { FaHamburger } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className='flex'>
      {/* <div id='brand' className='flex-1 w-64'>
        <FaHamburger />
      </div>
      <div id='brand' className='flex-1 w-32'>
      <input type='text' /> 
        <p>Test</p>
      </div> */}

      <div className='flex-none w-14 h-14'>01</div>
      <div className='flex-initial w-64 ...'>02</div>
      <div className='flex-initial w-32 ...'>03</div>
    </nav>
  );
}

export default Navbar;
