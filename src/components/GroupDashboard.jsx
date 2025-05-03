import { useState, useEffect } from 'react';
import axios from '../services/axios';

import { useNavigate } from 'react-router-dom';

const GroupDashboard = () => {
  const [groups, setGroups] = useState([]);
  const [chains, setChains] = useState([]);
  const navigate = useNavigate();

  

  const fetchGroups = async () => {
    const res = await axios.get('/api/groups');

    setGroups(res.data);
  };

  const fetchChains = async () => {
    const res = await axios.get('/api/chains');

    setChains(res.data);
  };

  useEffect(() => {
    fetchGroups();
    fetchChains();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      await axios.delete(`/api/groups/${id}`);
      fetchGroups();
    }
  };

  const getChainsForGroup = (groupId) =>
    chains.filter((chain) => chain.group.groupId === groupId);

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
  );
};

export default GroupDashboard;
