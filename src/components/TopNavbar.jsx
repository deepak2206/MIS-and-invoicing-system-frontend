import { Link, useNavigate } from 'react-router-dom';
import '../styles/TopNavbar.css'; // make sure your CSS handles horizontal layout

const TopNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="top-navbar-static">
      <div className="left">
        <span className="title" onClick={() => navigate('/dashboard')}>
          <strong>Invoice</strong> | Dashboard
        </span>
      </div>

      <div className="center-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/manage-group">Manage Groups</Link>
        <Link to="/manage-chain">Manage Chain</Link>
        <Link to="/manage-brand">Manage Brands</Link>
        <Link to="#">Manage SubZones</Link>
        <Link to="#">Manage Estimate</Link>
        <Link to="#">Manage Invoices</Link>
      </div>

      <div className="right">
        <span className="logout" onClick={() => navigate('/login')}>Logout</span>
      </div>
    </div>
  );
};

export default TopNavbar;
