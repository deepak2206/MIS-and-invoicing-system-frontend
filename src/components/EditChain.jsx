import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateChain } from '../services/chainService';

function EditChain() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState('');
  const [gstn, setGstn] = useState('');
  const [groupId, setGroupId] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Load current chain details
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/chains`)
      .then(res => {
        const current = res.data.find(item => item.chainId === parseInt(id));
        if (current) {
          setCompanyName(current.companyName);
          setGstn(current.gstnNo);
          setGroupId(current.group.groupId);
        }
      });

    // Load groups for dropdown
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/groups`)
      .then(res => setGroups(res.data));
  }, [id]);

  const handleUpdate = async () => {
    if (!companyName || !gstn || !groupId) {
      alert("All fields are required");
      return;
    }

    try {
      await updateChain(id, {
        companyName,
        gstnNo: gstn,
        group: { groupId }
      });
      navigate('/manage-chain');
    } catch (error) {
      alert("Update failed: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Company</h2>

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
            <option key={g.groupId} value={g.groupId}>
              {g.groupName}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleUpdate}>
        Update Company
      </button>
    </div>
  );
}

export default EditChain;
