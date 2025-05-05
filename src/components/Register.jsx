import { useState } from 'react';
import React from 'react';

import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    passwordHash: '',
    role: 'Salesperson', // default role
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(user);
      alert('Registration successful. Please login.');
      navigate('/login');
    } catch (error) {
      if (error.response?.status === 409) {
        alert('Email already exists.');
      } else {
        alert('Registration failed.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={user.fullName}
        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={user.passwordHash}
        onChange={(e) => setUser({ ...user, passwordHash: e.target.value })}
        required
      />
      <select
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
        required
      >
        <option value="Admin">Admin</option>
        <option value="Salesperson">Salesperson</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
