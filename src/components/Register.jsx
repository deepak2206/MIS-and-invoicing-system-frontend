import { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [user, setUser] = useState({ fullName: '', email: '', passwordHash: '', role: 'USER' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(user);
      toast.success(res.data);
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data || 'Registration Failed!');
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Full Name" value={user.fullName} onChange={(e) => setUser({ ...user, fullName: e.target.value })} required />
        <input placeholder="Email" type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        <input placeholder="Password" type="password" value={user.passwordHash} onChange={(e) => setUser({ ...user, passwordHash: e.target.value })} required />
        <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
