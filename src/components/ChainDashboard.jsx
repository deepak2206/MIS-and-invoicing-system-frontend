import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChains, getChainsByGroup, deleteChain } from '../services/chainService';
import { getSessionUser } from '../services/authService';
import axios from 'axios'; // Direct axios for group fetching
import '../styles/DashboardLayout.css';
import TopNavbar from './TopNavbar';

const BASE = import.meta.env.VITE_API_BASE_URL;

const ChainDashboard = () => {
  const [chains, setChains] = useState([]);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSessionUser().catch(() => navigate('/login'));
    fetchChains();
    fetchGroups();
  }, []);

  const fetchChains = () => {
    getChains().then((res) => setChains(res.data));
  };

  const fetchGroups = () => {
    axios.get(`${BASE}/api/groups`, { withCredentials: true })
      .then((res) => setGroups(res.data));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this chain?")) {
      await deleteChain(id);
      fetchChains();
    }
  };

  const handleFilter = async (groupId) => {
    if (!groupId) return fetchChains();
    const res = await getChainsByGroup(groupId);
    setChains(res.data);
  };

  return (
    <div className="layout-container">
      <TopNavbar />

      <div className="sidebar">
        <span onClick={() => navigate('/dashboard')}>Dashboard</span>
        <span className="active">Manage Chain</span>
        <span onClick={() => navigate('/manage-groups')}>Manage Groups</span>
      </div>

      <div className="main-area">
        <div className="top-navbar">
          <span><strong>Invoice</strong> | Manage Chain Section</span>
          <span>Hi User | <span className="text-danger" onClick={() => navigate('/login')}>Logout</span></span>
        </div>

        <div className="dashboard-content">
          <div className="d-flex justify-content-between mb-3">
            <h4>Chains</h4>
            <button className="btn btn-success" onClick={() => navigate('/add-chain')}>Add Company</button>
          </div>

          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th><th>Group</th><th>Company</th><th>GSTN</th><th>Edit</th><th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {chains.map((chain, idx) => (
                <tr key={chain.chainId}>
                  <td>{idx + 1}</td>
                  <td>{chain.group.groupName}</td>
                  <td>{chain.companyName}</td>
                  <td>{chain.gstnNo}</td>
                  <td><button className="btn btn-warning btn-sm" onClick={() => navigate(`/edit-chain/${chain.chainId}`)}>Edit</button></td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(chain.chainId)}>Delete</button></td>
                </tr>
              ))}
              {chains.length === 0 && (
                <tr><td colSpan="6" className="text-center">No chains available</td></tr>
              )}
            </tbody>
          </table>

          <div className="mt-4">
            <h6>Filter by Group</h6>
            <div className="d-flex gap-2 flex-wrap">
              <button className="btn btn-outline-primary btn-sm" onClick={fetchChains}>All</button>
              {groups.map(group => (
                <button key={group.groupId} className="btn btn-outline-secondary btn-sm" onClick={() => handleFilter(group.groupId)}>{group.groupName}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChainDashboard;
