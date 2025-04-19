import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.post('http://localhost:3000/api/auths/logout', {}, {
          withCredentials: true
        });
        navigate('/login'); // Redirect to login after logout
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    performLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
