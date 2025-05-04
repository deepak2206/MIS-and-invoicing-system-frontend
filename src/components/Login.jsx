import { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Login() {
  const [user, setUser] = useState({ email: '', passwordHash: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(user);
      localStorage.setItem('token', res.data); // Save JWT token
      toast.success('Login Successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Login Failed!');
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        <input placeholder="Password" type="password" value={user.passwordHash} onChange={(e) => setUser({ ...user, passwordHash: e.target.value })} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

