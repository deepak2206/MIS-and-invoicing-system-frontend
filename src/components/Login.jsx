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
      console.log('Login response:', res);
      
      if (res.data) {
        localStorage.setItem('token', res.data);
        toast.success('Login Successful!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid response from server');
      }
    } catch (err) {
      console.error('Full error:', err);
      console.error('Error response:', err.response);
      toast.error(err.response?.data?.message || err.message || 'Login Failed!');
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
       {/* ✅ Register button below the form */}
       <p>Don't have an account?</p>
      <button onClick={() => navigate('/register')}>Go to Register</button>
    </div>
  );
}

export default Login;

