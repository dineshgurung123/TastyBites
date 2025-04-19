import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userType: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/auths/customerRegister",
        form
      );
      alert("Registered successfully");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="pt-28 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2"
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2"
          required
        />
        <select
          name="userType"
          value={form.userType}
          onChange={(e) => setForm({ ...form, userType: e.target.value })}
          className="w-full border p-2"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full bg-green-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
