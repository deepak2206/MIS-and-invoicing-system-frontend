import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AuthStyles.css";

function Register() {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    passwordHash: '',
    role: 'USER',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(user);
      toast.success('Registration Successful! Check your email.');
      navigate('/login');
    } catch (error) {
      toast.error('Registration Failed! Try Again.');
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="auth-form">
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
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit">Register</button>

        <p>Already have an account?</p>
        <button type="button" onClick={() => navigate('/login')}>
          Back to Login
        </button>
      </form>
    </div>
  );
}

export default Register;