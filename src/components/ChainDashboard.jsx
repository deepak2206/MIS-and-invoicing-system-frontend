import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/DashboardLayout.css';

const ChainDashboard = () => {
  const [chains, setChains] = useState([]);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const BASE = import.meta.env.VITE_API_BASE_URL;

  // ✅ Check if user is logged in
  useEffect(() => {
    axios.get(`${BASE}/api/auth/current-user`, { withCredentials: true })
      .then((res) => {
        if (!res.data?.userId) navigate('/login');
      })
      .catch(() => navigate('/login'));
  }, []);

  const fetchChains = async () => {
    try {
      const res = await axios.get(`${BASE}/api/chains`, { withCredentials: true });
      setChains(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching chains:', err);
      setChains([]);
    }
  };

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${BASE}/api/groups`, { withCredentials: true });
      setGroups(res.data);
    } catch (err) {
      console.error('Error loading groups', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this chain?")) {
      await axios.delete(`${BASE}/api/chains/${id}`, { withCredentials: true });
      fetchChains();
    }
  };

  const handleFilter = async (groupName) => {
    try {
      const res = await axios.get(`${BASE}/api/chains/filter`, {
        params: { groupName },
        withCredentials: true,
      });
      setChains(res.data);
    } catch (err) {
      console.error('Filter error:', err);
    }
  };

  useEffect(() => {
    fetchChains();
    fetchGroups();
  }, []);

  return (
    <div className="layout-container">
      <div className="sidebar">
        <span onClick={() => navigate('/dashboard')}>Manage Groups</span>
        <span className="active" onClick={() => navigate('/manage-chain')}>Manage Chain</span>
        <span>Manage Brands</span>
        <span>Manage SubZones</span>
        <span>Manage Estimate</span>
        <span>Manage Invoices</span>
      </div>

      <div className="main-area flex-grow-1 d-flex flex-column">
        <div className="top-navbar">
          <span><strong>Invoice</strong> | Manage Chain Section</span>
          <span>Hi User <span onClick={() => navigate('/login')} className="text-danger">Logout</span></span>
        </div>

        <div className="dashboard-content">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Chains List</h4>
            <button className="btn btn-success" onClick={() => navigate('/add-chain')}>
              Add Company
            </button>
          </div>

          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Sr.No</th>
                <th>Group Name</th>
                <th>Company</th>
                <th>GSTN</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {chains.map((chain, idx) => (
                <tr key={chain.chainId}>
                  <td>{idx + 1}</td>
                  <td>{chain.group.groupName}</td>
                  <td>{chain.companyName}</td>
                  <td>{chain.gstnNo}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => navigate(`/edit-chain/${chain.chainId}`)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(chain.chainId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {chains.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">No chains available</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="mt-4">
            <h5>Filter by Group</h5>
            <div className="d-flex flex-wrap gap-2">
              <button className="btn btn-outline-primary btn-sm" onClick={fetchChains}>
                All
              </button>
              {groups.map((group) => (
                <button
                  key={group.groupId}
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handleFilter(group.groupName)}
                >
                  {group.groupName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChainDashboard;
