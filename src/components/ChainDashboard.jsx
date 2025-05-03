import React, { useEffect, useState } from 'react';
import { getChains, deleteChain, getChainsByGroup } from '../services/chainService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChainDashboard() {
  const [chains, setChains] = useState([]);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const fetchChains = async () => {
    try {
      const res = await getChains();
      setChains(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching chains:', err);
      setChains([]);
    }
  };

  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/groups`);
      setGroups(res.data);
    } catch (err) {
      console.error('Error loading groups', err);
    }
  };

  const handleDelete = async (id) => {
    await deleteChain(id);
    fetchChains();
  };

  const handleFilter = async (group) => {
    try {
      const res = await getChainsByGroup(group);
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
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Chains</h2>
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
        </tbody>
      </table>

      <div className="mt-4">
        <h5>Filter by Group</h5>
        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-outline-primary btn-sm" onClick={() => fetchChains()}>
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
  );
}

export default ChainDashboard;
