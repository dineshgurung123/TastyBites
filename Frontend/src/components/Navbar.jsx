import React from 'react';

const Navbar = () => {
  return (
    <div className=' flex justify-between items-center h-20 px-9'>
      
      <div >
     <a href="" className='h-72 w-60 font-medium'>Delicious🍔</a>
      </div>
      
      <div className='flex gap-9'>
        <a href="">Home</a>
        <a href="">Food Items</a>
        <a href="">Cart</a>
        <a href="">Add Items</a>
      </div>
      <div className='flex gap-7'>
        <a href="">Login</a>
        <a href="">Register</a>
      </div>
    </div>
  );
};

export default Navbar;
