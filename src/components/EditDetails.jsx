import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditDetails = () => {
  const { id } = useParams()
  const [groupName, setGroupName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const BASE = import.meta.env.VITE_API_BASE_URL // ✅ Read from env

  useEffect(() => {
    axios
      .get(`${BASE}/api/groups`, { withCredentials: true }) // ✅ withCredentials for session
      .then(res => {
        const group = res.data.find(g => g.groupId.toString() === id)
        if (group) setGroupName(group.groupName)
        else navigate('/dashboard')
      })
      .catch(() => navigate('/dashboard'))
  }, [id])

  const handleUpdate = async () => {
    if (!groupName.trim()) {
      setError('Group name is required')
      return
    }

    try {
      await axios.put(`${BASE}/api/groups/${id}`, { groupName }, { withCredentials: true }) // ✅ safe update
      alert('Group updated successfully!')
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data || 'Failed to update group')
    }
  }

  return (
    <div className="container mt-5">
      <h3>Edit Group</h3>
      <div className="card mb-4 shadow">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" onClick={handleUpdate}>Update Group</button>
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
  )
}

export default EditDetails
