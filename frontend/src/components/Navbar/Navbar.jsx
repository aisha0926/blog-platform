import React from 'react';
import { FaHamburger } from 'react-icons/fa';

function Navbar() {
  return (
    <div class='flex'>
      <div class='flex-none w-14 h-14'>01</div>
      <div class='flex-initial w-64 ...'>02</div>
      <div class='flex-initial w-32 ...'>03</div>
    </div>
  );
}

export default Navbar;

{
  /* <div id='brand' className='flex-1 w-64'>
  <FaHamburger />
</div>
<div id='brand' className='flex-1 w-32'>
<input type='text' /> 
  <p>Test</p>
</div> */
}
