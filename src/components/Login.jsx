import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AuthStyles.css";

function Login() {
  const [user, setUser] = useState({ email: '', passwordHash: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(user);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        toast.success('Login Successful!');
        navigate('/dashboard');
      } else {
        toast.error('Login Failed! Invalid response from server.');
      }
    } catch (error) {
      toast.error('Login Failed! Check Credentials.');
    }
  };
  

  return (
    <div className="auth-container">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
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
        <button type="submit">Login</button>

        <p>Forgot your password?</p>
        <button type="button" onClick={() => navigate('/forgot-password')}>
          Forgot Password
        </button>

        <p>Don't have an account?</p>
        <button type="button" onClick={() => navigate('/register')}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;