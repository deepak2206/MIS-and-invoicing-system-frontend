import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getChains } from '../services/chainService'; // ✅ adjust path
import { getBrands } from '../services/brandService'; // ✅ adjust path
import axios from 'axios';
import '../styles/DashboardLayout.css';

const GroupDashboard = () => {
  const [groups, setGroups] = useState([]);
  const [chains, setChains] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const BASE = import.meta.env.VITE_API_BASE_URL;

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${BASE}/api/groups`, { withCredentials: true });
      setGroups(res.data);
    } catch (err) {
      console.error("Failed to fetch groups", err);
    }
  };

  const fetchChainsAndBrands = async () => {
    try {
      const [chainsRes, brandsRes] = await Promise.all([getChains(), getBrands()]);
      setChains(chainsRes.data);
      setBrands(brandsRes.data);
    } catch (err) {
      console.error("Failed to fetch chains or brands", err);
    }
  };

  useEffect(() => {
    fetchGroups();
    fetchChainsAndBrands();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await axios.delete(`${BASE}/api/groups/${id}`, { withCredentials: true });
        fetchGroups();
      } catch (err) {
        alert("Failed to delete group.");
      }
    }
  };

  const getChainsForGroup = (groupId) =>
    chains.filter((c) => c.group.groupId === groupId);

  const getBrandsForChain = (chainId) =>
    brands.filter((b) => b.chain.chainId === chainId);

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <div className="sidebar">
        <Link to="/dashboard" className="active">Dashboard</Link>
        <Link to="/dashboard">Manage Groups</Link>
        <Link to="/manage-chain">Manage Chain</Link>
        <Link to="/manage-brand">Manage Brands</Link>
        <Link to="#">Manage SubZones</Link>
        <Link to="#">Manage Estimate</Link>
        <Link to="#">Manage Invoices</Link>
      </div>

      {/* Main Area */}
      <div className="main-area flex-grow-1 d-flex flex-column">
        <div className="top-navbar">
          <span><strong>Invoice</strong> | Manage Group Section</span>
          <span>Hi User <span onClick={() => navigate('/login')} className="text-danger">Logout</span></span>
        </div>

        <div className="dashboard-content">
          <div className="card-red">
            Total Groups: {groups.length}
          </div>

          <button className="btn-add mb-3" onClick={() => navigate('/edit')}>
            Add Group
          </button>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Sr.No</th>
                  <th>Group Name</th>
                  <th>Company & Brands</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((g, i) => {
                  const chainsForGroup = getChainsForGroup(g.groupId);
                  return (
                    <tr key={g.groupId}>
                      <td>{i + 1}</td>
                      <td>{g.groupName}</td>
                      <td>
                        {chainsForGroup.length > 0 ? (
                          <ul className="mb-0 ps-3">
                            {chainsForGroup.map((c) => (
                              <li key={c.chainId}>
                                <strong>{c.companyName}</strong> ({c.gstnNo})
                                <ul className="ps-3">
                                  {getBrandsForChain(c.chainId).length > 0 ? (
                                    getBrandsForChain(c.chainId).map((b) => (
                                      <li key={b.brandId}>{b.brandName}</li>
                                    ))
                                  ) : (
                                    <li className="text-muted">No brands</li>
                                  )}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-muted">No chains</span>
                        )}
                      </td>
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
                  );
                })}
                {groups.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center">No groups available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDashboard;
