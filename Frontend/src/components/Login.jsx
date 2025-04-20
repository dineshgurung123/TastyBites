import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auths/login", form , {withCredentials : true});
   
      localStorage.setItem("user", JSON.stringify(res.data)); // Saving user data
      alert("Login successful");
      navigate('/');
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="pt-28 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2"
          required
        />
        <button className="w-full bg-black text-white py-2 rounded cursor-pointer">Login</button>
      </form>
    </div>
  );
};

export default Login;
