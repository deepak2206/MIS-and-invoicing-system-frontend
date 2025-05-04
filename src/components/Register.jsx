import { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    passwordHash: '',
    role: 'SALESPERSON',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(user);
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      alert('Registration failed: ' + err.response.data.message);
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
      >
        <option value="SALESPERSON">Salesperson</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
