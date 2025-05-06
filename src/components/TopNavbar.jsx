import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/TopNavbar.css';

const TopNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="top-navbar-vertical">
      

      {/* Vertical Nav Links */}
      <div className="sidebar-links">
        <Link to="/manage-group">Manage Groups</Link>
        <Link to="/manage-chain">Manage Chain</Link>
        <Link to="/manage-brand">Manage Brands</Link>
        <Link to="#">Manage SubZones</Link>
        <Link to="#">Manage Estimate</Link>
        <Link to="#">Manage Invoices</Link>
      </div>
    </div>
  );
};

export default TopNavbar;
