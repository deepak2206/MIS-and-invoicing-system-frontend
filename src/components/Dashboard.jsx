import { useEffect, useState } from 'react';
import React from 'react';

import { getSessionUser, logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getSessionUser()
      .then(res => setUser(res.data))
      .catch(() => navigate('/login'));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {user && <p>Welcome, {user.fullName} ({user.role})</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
