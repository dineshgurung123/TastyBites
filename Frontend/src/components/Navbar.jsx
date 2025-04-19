import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-full z-50 bg-white text-black flex justify-between items-center h-20 px-9 shadow-md'>
      
      <div>
        <Link to="/" className='text-2xl font-bold hover:text-gray-600 transition duration-300'>
          TastyBites🍔
        </Link>
      </div>
      
      <div className='flex gap-5'>
        <Link to="/" className='px-4 py-2 rounded hover:bg-gray-100 transition duration-300'>
          Home
        </Link>
        <Link to="#" className='px-4 py-2 rounded hover:bg-gray-100 transition duration-300'>
          Food Items
        </Link>
        <Link to="#" className='px-4 py-2 rounded hover:bg-gray-100 transition duration-300'>
          Cart
        </Link>
        <Link to="/addFood" className='px-4 py-2 rounded hover:bg-gray-100 transition duration-300'>
          Add Items
        </Link>
      </div>

      <div className='flex gap-5'>
        <Link to="#" className='px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition duration-300'>
          Login
        </Link>
        <Link to="#" className='px-4 py-2 bg-green-800 text-white rounded hover:bg-gray-800 ]transition duration-300'>
          Register
        </Link>
      </div>
      
    </div>
  );
};

export default Navbar;
