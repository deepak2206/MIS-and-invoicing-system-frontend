import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AuthStyles.css';

function Register() {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    passwordHash: '',
    role: 'Salesperson',
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
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-title text-success">Register</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Full Name"
            value={user.fullName}
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            required
          />
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={user.passwordHash}
            onChange={(e) => setUser({ ...user, passwordHash: e.target.value })}
            required
          />
          <select
            className="form-select mb-3"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            required
          >
            <option value="Admin">Admin</option>
            <option value="Salesperson">Salesperson</option>
          </select>
          <button type="submit" className="btn btn-success auth-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
