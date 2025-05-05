import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/EditGroup.css'; // Optional external styling
import TopNavbar from './TopNavbar';

const EditGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (id) {
      axios
        .get(`${BASE}/api/groups`, { withCredentials: true })
        .then((res) => {
          const group = res.data.find((g) => g.groupId.toString() === id);
          if (group) setGroupName(group.groupName);
          else navigate('/dashboard');
        })
        .catch(() => navigate('/dashboard'));
    }
  }, [id]);

  const handleSubmit = async () => {
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
<>

    <TopNavbar /> {/* Static Top Bar */}
    <div className="container mt-5">
      
    </div>
    <div className="container mt-5">
      <h3 className="mb-4">{id ? 'Edit Group' : 'Add Group'}</h3>
      <div className="card shadow">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Unique Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <button
                className={`btn ${id ? 'btn-primary' : 'btn-success'} w-100`}
                onClick={handleSubmit}
              >
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
    </>
  );
};

export default EditGroup;
