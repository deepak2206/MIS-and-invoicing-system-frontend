import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSessionUser } from '../services/authService';
import { addChain } from '../services/chainService';
import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL;

function AddChain() {
  const [companyName, setCompanyName] = useState('');
  const [gstn, setGstn] = useState('');
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getSessionUser().catch(() => navigate('/login'));
    axios.get(`${BASE}/api/groups`, { withCredentials: true }).then((res) => setGroups(res.data));
  }, []);

  const handleSubmit = async () => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;

    if (!companyName || !gstn || !groupId) return setError("All fields are required");
    if (!gstRegex.test(gstn)) return setError("Invalid GSTN format");

    try {
      await addChain({ companyName, gstnNo: gstn, groupId });
      navigate('/manage-chain');
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Add Company</h2>

      <div className="mb-3">
        <label>Company Name:</label>
        <input className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
      </div>

      <div className="mb-3">
        <label>GSTN:</label>
        <input className="form-control" value={gstn} onChange={(e) => setGstn(e.target.value)} />
      </div>

      <div className="mb-4">
        <label>Select Group:</label>
        <select className="form-select" value={groupId} onChange={(e) => setGroupId(e.target.value)}>
          <option value="">-- Select Group --</option>
          {groups.map((g) => (
            <option key={g.groupId} value={g.groupId}>{g.groupName}</option>
          ))}
        </select>
      </div>

      {error && <div className="text-danger mb-3">{error}</div>}

      <button className="btn btn-primary" onClick={handleSubmit}>Add Company</button>
    </div>
  );
}

export default AddChain;
