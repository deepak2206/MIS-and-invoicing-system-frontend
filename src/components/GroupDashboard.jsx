import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GroupDashboard = () => {
  const [groups, setGroups] = useState([]);
  const [chains, setChains] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const navigate = useNavigate();

  const BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchGroups();
    fetchChains();
    fetchBrands();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${BASE}/groups`, { withCredentials: true });
      setGroups(res.data);
    } catch (err) {
      console.error("Failed to fetch groups", err);
    }
  };

  const fetchChains = async () => {
    try {
      const res = await axios.get(`${BASE}/chains`, { withCredentials: true });
      setChains(res.data);
    } catch (err) {
      console.error("Failed to fetch chains", err);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axios.get(`${BASE}/brands`, { withCredentials: true });
      setBrands(res.data);
    } catch (err) {
      console.error("Failed to fetch brands", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        await axios.delete(`${BASE}/groups/${id}`, { withCredentials: true });
        fetchGroups();
      } catch (err) {
        alert("Failed to delete group.");
      }
    }
  };

  const getChainsForGroup = (groupId) => {
    const filtered = chains.filter((c) => c.group.groupId === groupId);
    return selectedCompany
      ? filtered.filter((c) => c.chainId === parseInt(selectedCompany))
      : filtered;
  };

  const getBrandsForChain = (chainId) =>
    brands.filter((b) => b.chain.chainId === chainId);

  const filteredGroups = selectedGroup
    ? groups.filter((g) => g.groupId === parseInt(selectedGroup))
    : groups;

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-danger text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Total Groups</h5>
              <h3 className="card-text">{groups.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Total Chains</h5>
              <h3 className="card-text">{chains.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Total Brands</h5>
              <h3 className="card-text">{brands.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex gap-3 mb-3">
        <select className="form-select" value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
          <option value="">All Groups</option>
          {groups.map((g) => (
            <option key={g.groupId} value={g.groupId}>{g.groupName}</option>
          ))}
        </select>

        <select className="form-select" value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
          <option value="">All Companies</option>
          {chains.map((c) => (
            <option key={c.chainId} value={c.chainId}>{c.companyName}</option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary mb-3" onClick={() => navigate('/edit')}>
        ➕ Add Group
      </button>

      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title mb-3">Group List with Companies & Brands</h5>
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
              {filteredGroups.map((g, i) => {
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
              {filteredGroups.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">No groups found</td>
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
