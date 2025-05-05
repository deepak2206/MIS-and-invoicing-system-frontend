import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

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
      alert('Login failed!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, passwordHash: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p>Don't have an account?</p>
      <button onClick={() => navigate('/register')}>Register</button>
    </div>
  );
}

export default Login;
