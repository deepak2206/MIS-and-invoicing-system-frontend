import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL;

const EditChain = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chain, setChain] = useState({ companyName: '', gstnNo: '', groupId: '' });
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
    fetchChain();
  }, []);

  const fetchGroups = async () => {
    const res = await axios.get(`${BASE}/api/groups`, { withCredentials: true });
    setGroups(res.data);
  };

  const fetchChain = async () => {
    const res = await axios.get(`${BASE}/api/chains`, { withCredentials: true });
    const target = res.data.find((c) => c.chainId == id);
    if (target) {
      setChain({
        companyName: target.companyName,
        gstnNo: target.gstnNo,
        groupId: target.group.groupId,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE}/api/chains/${id}`, chain, { withCredentials: true });
      alert('Chain updated successfully');
      navigate('/manage-chain');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  return (
    <div className="container mt-4">
      <h4>Edit Company Chain</h4>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label>Company Name</label>
          <input
            className="form-control"
            value={chain.companyName}
            onChange={(e) => setChain({ ...chain, companyName: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>GSTN Number</label>
          <input
            className="form-control"
            value={chain.gstnNo}
            onChange={(e) => setChain({ ...chain, gstnNo: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Group</label>
          <select
            className="form-select"
            value={chain.groupId}
            onChange={(e) => setChain({ ...chain, groupId: e.target.value })}
            required
          >
            <option value="">-- Select Group --</option>
            {groups.map((g) => (
              <option key={g.groupId} value={g.groupId}>{g.groupName}</option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditChain;
