import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // <-- get ID from /edit/:id
  const BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (id) {
      // fetch group data by ID and populate
      axios.get(`${BASE}/api/groups`, { withCredentials: true }).then((res) => {
        const group = res.data.find((g) => g.groupId == id);
        if (group) setGroupName(group.groupName);
      });
    }
  }, [id]);

  const handleSave = async () => {
    if (!groupName.trim()) {
      setError('Group name is required');
      return;
    }

    try {
      if (id) {
        await axios.put(`${BASE}/api/groups/${id}`, { groupName }, { withCredentials: true });

        alert('Group updated successfully!');
      } else {
        await axios.post(`${BASE}/api/groups`, { groupName }, { withCredentials: true });

        alert('Group added successfully!');
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data || 'Failed to save group');
    }
  };

  return (
    <div className="container mt-5">
      <h3>{id ? 'Edit Group' : 'Add Group'}</h3>
      <div className="card mb-4 shadow">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Unique Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-success" onClick={handleSave}>
                {id ? 'Update' : 'Add'} Group
              </button>
            </div>
            {error && (
              <div className="col-12 text-danger mt-2">
                <small>{error}</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditGroup;
