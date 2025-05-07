import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/TopNavbar.css';

const TopNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="top-navbar-vertical">
      <div className="topbar-header d-flex justify-content-between">
        <span className="top-title" onClick={() => navigate('/dashboard')}>Dashboard</span>
        <span className="top-logout text-danger" onClick={() => navigate('/login')}>Logout</span>
      </div>

      <div className="sidebar-links">
        <Link to="/manage-group">Manage Groups</Link>
        <Link to="/manage-chain">Manage Chain</Link>
        <Link to="/manage-brand">Manage Brands</Link>
        <Link to="/manage-zone">Manage SubZones</Link>
        <Link to="/manage-estimate">Manage Estimate</Link>
        <Link to="/manage-invoice">Manage Invoices</Link>
      </div>
    </div>
  );
};

export default TopNavbar;
