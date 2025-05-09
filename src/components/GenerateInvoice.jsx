import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateInvoice } from '../services/invoiceService';
import { getEstimateById } from '../services/estimateService'; // you'll need this service
import { toast } from 'react-toastify';

const GenerateInvoice = () => {
  const { estimateId } = useParams();
  const navigate = useNavigate();
  const [estimate, setEstimate] = useState(null);
  const [emailId, setEmailId] = useState('');

  useEffect(() => {
    getEstimateById(estimateId).then((res) => setEstimate(res.data));
  }, [estimateId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await generateInvoice(estimateId, emailId);
      toast.success('Invoice Generated!');
      navigate('/invoices');
    } catch {
      toast.error('Failed to generate invoice!');
    }
  };

  if (!estimate) return <p>Loading estimate...</p>;

  return (
    <div className="container mt-4">
      <h3>Generate Invoice</h3>
      <form onSubmit={handleSubmit}>
        <div><strong>Group:</strong> {estimate.groupName}</div>
        <div><strong>Brand:</strong> {estimate.brandName}</div>
        <div><strong>Zone:</strong> {estimate.zoneName}</div>
        <div><strong>Service:</strong> {estimate.service}</div>
        <div><strong>Qty:</strong> {estimate.qty}</div>
        <div><strong>Cost/Unit:</strong> {estimate.costPerUnit}</div>
        <div><strong>Total Cost:</strong> {estimate.totalCost}</div>
        <div><strong>Delivery Date:</strong> {estimate.deliveryDate}</div>
        <div><strong>Delivery Details:</strong> {estimate.deliveryDetails}</div>

        <input
          type="email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          required
          className="form-control mt-3"
          placeholder="Enter Email ID"
        />
        <button className="btn btn-primary mt-3">Generate Invoice</button>
      </form>
    </div>
  );
};

export default GenerateInvoice;
