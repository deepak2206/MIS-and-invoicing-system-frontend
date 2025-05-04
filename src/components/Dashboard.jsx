import { useEffect, useState } from 'react';
import { getSessionUser, logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getSessionUser()
      .then((res) => setUser(res.data))
      .catch(() => navigate('/login'));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <h2>Welcome, {user?.fullName}</h2>
      <p>Role: {user?.role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
