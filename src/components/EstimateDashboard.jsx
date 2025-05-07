import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEstimates, deleteEstimate } from '../services/estimateService';
import TopNavbar from './TopNavbar';

const EstimateDashboard = () => {
  const [estimates, setEstimates] = useState([]);
  const navigate = useNavigate();

  const fetchEstimates = async () => {
    const res = await getEstimates();
    setEstimates(res.data);
  };

  useEffect(() => {
    fetchEstimates();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this estimate?')) {
      await deleteEstimate(id);
      fetchEstimates();
    }
  };

  return (
    <>
      <TopNavbar />
      <div className="container mt-4">
        <h4>Estimate Management</h4>
        <button className="btn btn-success mb-3" onClick={() => navigate('/add-estimate')}>
          ➕ Create Estimate
        </button>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Group</th>
              <th>Company</th>
              <th>Brand</th>
              <th>Zone</th>
              <th>Service</th>
              <th>Qty</th>
              <th>Unit Cost</th>
              <th>Total</th>
              <th>Delivery Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {estimates.map((e, i) => (
              <tr key={e.estimateId}>
                <td>{i + 1}</td>
                <td>{e.chain.group.groupName}</td>
                <td>{e.chain.companyName}</td>
                <td>{e.brandName}</td>
                <td>{e.zoneName}</td>
                <td>{e.service}</td>
                <td>{e.qty}</td>
                <td>{e.costPerUnit}</td>
                <td>{e.totalCost}</td>
                <td>{e.deliveryDate}</td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => navigate(`/edit-estimate/${e.estimateId}`)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(e.estimateId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {estimates.length === 0 && (
              <tr><td colSpan="12" className="text-center">No estimates available</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EstimateDashboard;
