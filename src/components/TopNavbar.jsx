import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/TopNavbar.css';

const TopNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column vh-100 bg-light border-end position-fixed" style={{ width: '220px' }}>
      {/* Top area: Dashboard + Logout */}
      <div className="d-flex justify-content-between align-items-center px-3 py-3 border-bottom">
        <span className="fw-bold" role="button" onClick={() => navigate('/dashboard')}>
          Dashboard
        </span>
        <span className="text-danger" role="button" onClick={() => navigate('/login')}>
          Logout
        </span>
      </div>

      {/* Navigation links (vertical) */}
      <div className="d-flex flex-column p-3 gap-2">
        <Link className="nav-link" to="/manage-group">Manage Groups</Link>
        <Link className="nav-link" to="/manage-chain">Manage Chain</Link>
        <Link className="nav-link" to="/manage-brand">Manage Brands</Link>
        <Link className="nav-link disabled" to="#">Manage SubZones</Link>
        <Link className="nav-link disabled" to="#">Manage Estimate</Link>
        <Link className="nav-link disabled" to="#">Manage Invoices</Link>
      </div>
    </div>
  );
};

export default TopNavbar;
