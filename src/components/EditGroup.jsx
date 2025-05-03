import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axios'; // ✅ Use custom axios with base URL and token

const EditGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (!groupName.trim()) {
      setError('Group name is required');
      return;
    }

    try {
      await axios.post('/api/groups', { groupName }); // ✅ relative API path
      alert('Group added successfully!');
      setGroupName('');
      setError('');
      navigate('/dashboard'); // navigate to dashboard instead of root
    } catch (err) {
      setError(err.response?.data || 'Failed to add group');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Add Group</h3>
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
              <button className="btn btn-success" onClick={handleAdd}>
                Add Group
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
