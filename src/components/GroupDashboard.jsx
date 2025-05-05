import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/DashboardLayout.css';

const GroupDashboard = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const BASE = import.meta.env.VITE_API_BASE_URL;

  const fetchGroups = async () => {
    const res = await axios.get(`${BASE}/api/groups`, { withCredentials: true });
    setGroups(res.data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      await axios.delete(`${BASE}/api/groups/${id}`, { withCredentials: true });
      fetchGroups();
    }
  };

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <div className="sidebar">
        <Link to="/dashboard" className="active">Dashboard</Link>
        <Link to="/dashboard">Manage Groups</Link>
        <Link to="/manage-chain">Manage Chain</Link>
        <Link to="#">Manage Brands</Link>
        <Link to="#">Manage SubZones</Link>
        <Link to="#">Manage Estimate</Link>
        <Link to="#">Manage Invoices</Link>
      </div>

      {/* Main content */}
      <div className="flex-grow-1">
        <div className="top-navbar">
          <span><strong>Invoice</strong> | Manage Group Section</span>
          <span>Hi User <a href="#" className="text-danger">Logout</a></span>
        </div>

        <div className="dashboard-content">
          <div className="card-red">
            Total Groups: {groups.length}
          </div>

          <button className="btn-add" onClick={() => navigate('/edit')}>
            Add Group
          </button>

          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Sr.No</th>
                <th>Group Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g, i) => (
                <tr key={g.groupId}>
                  <td>{i + 1}</td>
                  <td>{g.groupName}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => navigate(`/edit/${g.groupId}`)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(g.groupId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {groups.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No groups available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GroupDashboard;
