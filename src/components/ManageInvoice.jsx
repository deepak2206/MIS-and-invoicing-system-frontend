import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInvoices, deleteInvoice } from '../services/invoiceService';
import TopNavbar from './TopNavbar';

const ManageInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const res = await getInvoices();
    setInvoices(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this invoice?')) {
      await deleteInvoice(id);
      fetchInvoices();
    }
  };

  const filtered = invoices.filter(inv =>
    inv.invoiceNo.toString().includes(search) ||
    inv.estimate.estimateId.toString().includes(search) ||
    inv.estimate.chain.chainId.toString().includes(search) ||
    inv.estimate.chain.companyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <TopNavbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Total Invoice <span className="badge bg-danger">{invoices.length}</span></h4>
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search by invoice, chain ID, or company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Sr.No</th>
              <th>Invoice No</th>
              <th>Estimate ID</th>
              <th>Chain ID</th>
              <th>Company Name</th>
              <th>Service Details</th>
              <th>Total Qty</th>
              <th>Price Per Qty</th>
              <th>Total</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv, i) => (
              <tr key={inv.id}>
                <td>{i + 1}</td>
                <td>{inv.invoiceNo}</td>
                <td>{inv.estimate.estimateId}</td>
                <td>{inv.estimate.chain.chainId}</td>
                <td>{inv.estimate.chain.companyName}</td>
                <td>{inv.estimate.service}</td>
                <td>{inv.estimate.qty}</td>
                <td>{inv.estimate.costPerUnit}</td>
                <td>{inv.amountPayable}</td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => navigate(`/edit-invoice/${inv.id}`)}>Edit</button>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(inv.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="11" className="text-center">No invoices found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageInvoice;
