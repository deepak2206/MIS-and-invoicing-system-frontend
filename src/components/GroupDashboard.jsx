import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Add Link

const GroupDashboard = () => {
  const [groups, setGroups] = useState([]);
  const [chains, setChains] = useState([]);
  const navigate = useNavigate();

  const BASE = import.meta.env.VITE_API_BASE_URL;

  const fetchGroups = async () => {
    const res = await axios.get(`${BASE}/groups`);
    setGroups(res.data);
  };

  const fetchChains = async () => {
    const res = await axios.get(`${BASE}/chains`);
    setChains(res.data);
  };

  useEffect(() => {
    fetchGroups();
    fetchChains();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      await axios.delete(`${BASE}/groups/${id}`);
      fetchGroups();
    }
  };

  const getChainsForGroup = (groupId) =>
    chains.filter((chain) => chain.group.groupId === groupId);

  return (
    <div>
      {/* ✅ Top Navbar */}
      <div className="top-navbar d-flex justify-content-between align-items-center px-4 py-2 bg-light border-bottom">
        <span className="fw-bold fs-5 text-dark">Invoice</span>
        <span className="text-muted">| Manage Group Section</span>
        <span className="user">
          Hi User{" "}
          <a href="#" className="ms-2 text-decoration-none">
            Logout
          </a>
        </span>
      </div>

      {/* ✅ Tab Bar */}
      <div className="tab-bar bg-white px-4 py-2 border-bottom d-flex gap-4">
        <Link to="/" className="tab-link active">
          Manage Groups
        </Link>
        <Link to="/manage-chain" className="tab-link">
          Manage Chain
        </Link>
        <span className="tab-link">Manage Brands</span>
        <span className="tab-link">Manage SubZones</span>
        <span className="tab-link">Manage Estimate</span>
        <span className="tab-link">Manage Invoices</span>
      </div>

      {/* ✅ Existing Group Dashboard Content */}
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
        </div>

        <button className="btn btn-primary mb-3" onClick={() => navigate('/edit')}>
          ➕ Add Group
        </button>

        <div className="card shadow">
          <div className="card-body">
            <h5 className="card-title mb-3">Group List with Chains</h5>
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Sr.No</th>
                  <th>Group Name</th>
                  <th>Company Names (with GSTN)</th>
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
                    <td colSpan="5" className="text-center">
                      No groups available
                    </td>
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
