import { useNavigate } from 'react-router-dom';
import '../styles/TopNavbar.css'; // External CSS

const TopNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="top-navbar-static">
      <span className="title" onClick={() => navigate('/dashboard')}>
        <strong>Invoice</strong> | Dashboard
      </span>
      <span className="logout" onClick={() => navigate('/login')}>
        Logout
      </span>
    </div>
  );
};

export default TopNavbar;
