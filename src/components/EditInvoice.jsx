import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEstimateById } from '../services/estimateService';
import { addInvoice, getInvoiceById, updateInvoice } from '../services/invoiceService';

const EditInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isUpdateMode = window.location.pathname.includes('/update-invoice');

  const [form, setForm] = useState({
    invoiceNo: '',
    estimateId: '',
    chainId: '',
    serviceDetails: '',
    qty: '',
    costPerQty: '',
    amountPayable: '',
    amountPaid: '',
    balance: '',
    dateOfService: '',
    deliveryDetails: '',
    emailId: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isUpdateMode) {
          const res = await getInvoiceById(id);
          const inv = res.data;
          setForm({
            invoiceNo: inv.invoiceNo,
            estimateId: inv.estimate.estimateId,
            chainId: inv.chain.chainId,
            serviceDetails: inv.serviceDetails,
            qty: inv.qty,
            costPerQty: inv.costPerQty,
            amountPayable: inv.amountPayable,
            amountPaid: inv.amountPaid,
            balance: inv.balance,
            dateOfService: inv.deliveryDate,
            deliveryDetails: inv.deliveryDetails,
            emailId: inv.emailId
          });
        } else {
          const res = await getEstimateById(id);
          const est = res.data;
          setForm(prev => ({
            ...prev,
            invoiceNo: Math.floor(1000 + Math.random() * 9000), // generate 4-digit invoice number
            estimateId: est.estimateId,
            chainId: est.chain.chainId,
            serviceDetails: est.service,
            qty: est.qty,
            costPerQty: est.costPerUnit,
            amountPayable: est.totalCost,
            amountPaid: est.totalCost,
            balance: 0,
            dateOfService: est.deliveryDate,
            deliveryDetails: est.deliveryDetails
          }));
        }
      } catch (err) {
        console.error('Data load failed:', err);
        alert(isUpdateMode ? 'Invoice not found' : 'Estimate not found');
      }
    };
    fetchData();
  }, [id, isUpdateMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        invoiceNo: parseInt(form.invoiceNo),
        estimate: { estimateId: parseInt(form.estimateId) },
        chain: { chainId: parseInt(form.chainId) },
        serviceDetails: form.serviceDetails,
        qty: parseInt(form.qty),
        costPerQty: parseFloat(form.costPerQty),
        amountPayable: parseFloat(form.amountPayable),
        amountPaid: parseFloat(form.amountPaid),
        balance: parseFloat(form.balance),
        deliveryDate: form.dateOfService,
        deliveryDetails: form.deliveryDetails,
        emailId: form.emailId
      };

      if (isUpdateMode) {
        await updateInvoice(id, payload);
      } else {
        await addInvoice(payload);
      }

      navigate('/manage-invoice');
    } catch (err) {
      console.error('Invoice submission failed:', err);
      alert('Failed to submit invoice.');
    }
  };

  return (
    <div className="container mt-4">
      <h4>{isUpdateMode ? 'Update' : 'Generate'} Invoice</h4>
      <form onSubmit={handleSubmit} className="w-75">
        <label>Invoice No</label>
        <input className="form-control mb-2" value={form.invoiceNo} disabled />

        <label>Estimate ID</label>
        <input className="form-control mb-2" value={form.estimateId} disabled />

        <label>Chain ID</label>
        <input className="form-control mb-2" value={form.chainId} disabled />

        <label>Service Provided</label>
        <input className="form-control mb-2" value={form.serviceDetails} disabled />

        <label>Quantity</label>
        <input className="form-control mb-2" value={form.qty} disabled />

        <label>Cost per Quantity</label>
        <input className="form-control mb-2" value={form.costPerQty} disabled />

        <label>Amount Payable</label>
        <input className="form-control mb-2" value={form.amountPayable} disabled />

        <label>Amount Paid (Rs)</label>
        <input className="form-control mb-2" value={form.amountPaid} disabled />

        <label>Balance</label>
        <input className="form-control mb-2" value={form.balance} disabled />

        <label>Delivery Date</label>
        <input className="form-control mb-2" value={form.dateOfService} disabled />

        <label>Other Delivery Details</label>
        <textarea className="form-control mb-2" rows="3" value={form.deliveryDetails} disabled />

        <label>Email ID</label>
        <input
          className="form-control mb-3"
          name="emailId"
          placeholder="Enter Email ID"
          value={form.emailId}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary">{isUpdateMode ? 'Update Invoice' : 'Generate Invoice'}</button>
      </form>
    </div>
  );
};

export default EditInvoice;
