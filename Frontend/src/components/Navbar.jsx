import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = async () => {
    try {
      const res = await axios.get("https://tastybites-nepal.onrender.com/api/auths/verify", {
        withCredentials: true,
      });
      setIsLoggedIn(res.status === 200);
      
    } catch (err) {
      setIsLoggedIn(false);
    } finally {
      
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location.pathname]); // Check auth on route change

  const handleLogout = async () => {
    try {
      await axios.post("https://tastybites-nepal.onrender.com/api/auths/logout", {}, {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

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
        <Link to="/foods" className='px-4 py-2 rounded hover:bg-gray-100 transition duration-300'>
          Food Items
        </Link>
        <Link to="/cart" className='px-4 py-2 rounded hover:bg-gray-100 transition duration-300'>
          Cart
        </Link>
        <Link to="/addFood" className='px-4 py-2 rounded hover:bg-gray-100 transition duration-300'>
          Add Items
        </Link>
      </div>

      <div className='flex gap-5'>
        {!loading && (
          isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className='px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition duration-300 cursor-pointer'>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className='px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition duration-300'>
                Login
              </Link>
              <Link to="/register" className='px-4 py-2 bg-green-800 text-white rounded hover:bg-gray-800 transition duration-300'>
                Register
              </Link>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Navbar;