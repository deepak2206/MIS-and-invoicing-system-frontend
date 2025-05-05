import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddChain() {
  const [companyName, setCompanyName] = useState('');
  const [gstn, setGstn] = useState('');
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios.get(`${BASE}/api/groups`, { withCredentials: true })
      .then((res) => setGroups(res.data))
      .catch(() => alert("Failed to load groups"));
  }, []);

  const handleSubmit = async () => {
    if (!companyName || !gstn || !groupId) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post(`${BASE}/api/chains`, {
        companyName,
        gstnNo: gstn,
        group: { groupId }
      }, { withCredentials: true });

      navigate('/manage-chain');
    } catch (err) {
      setError(err.response?.data || 'Something went wrong');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Company</h2>

      <div className="mb-3">
        <label className="form-label">Company Name:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">GSTN:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter GST Number"
          value={gstn}
          onChange={(e) => setGstn(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Select Group:</label>
        <select
          className="form-select"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        >
          <option value="">Select Group</option>
          {groups.map((g) => (
            <option key={g.groupId} value={g.groupId}>{g.groupName}</option>
          ))}
        </select>
      </div>

      {error && <div className="text-danger mb-3">{error}</div>}

      <button className="btn btn-primary" onClick={handleSubmit}>
        Add Company
      </button>
    </div>
  );
}

export default AddChain;
