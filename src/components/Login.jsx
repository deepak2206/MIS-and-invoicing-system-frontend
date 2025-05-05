import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AuthStyles.css';

function Login() {
  const [user, setUser] = useState({ email: '', passwordHash: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(user);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch {
      alert('Login failed! Check credentials.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-title">Login</div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, passwordHash: e.target.value })}
            required
          />
          <button type="submit" className="btn btn-primary auth-btn mb-2">
            Login
          </button>
        </form>

        <div className="text-center">
          <button
            className="btn btn-link text-decoration-none"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </button>
        </div>

        <hr />
        <div className="auth-footer">
          <p>Don't have an account?</p>
          <button className="btn btn-outline-secondary" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
