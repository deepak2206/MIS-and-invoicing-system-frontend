import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEstimateById } from '../services/estimateService';
import { addInvoice, getInvoiceById, updateInvoice } from '../services/invoiceService';

const EditInvoice = () => {
  const { id } = useParams(); // Could be estimateId or invoiceId
  const navigate = useNavigate();

  // Detect if the route is update (edit existing invoice) or generate (from estimate)
  const isUpdateMode = window.location.pathname.includes('/update-invoice');

  const [form, setForm] = useState({
    invoiceNo: '',
    estimateId: id || '',
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
    const loadEstimate = async () => {
      try {
        const res = await getEstimateById(id);
        const est = res.data;
        setForm(prev => ({
          ...prev,
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
      } catch (err) {
        console.error('Estimate load failed:', err);
        alert('Estimate not found');
      }
    };

    const loadInvoice = async () => {
      try {
        const res = await getInvoiceById(id);
        const inv = res.data;
        setForm({
          invoiceNo: inv.invoiceNo,
          estimateId: inv.estimateId,
          chainId: inv.chainId,
          serviceDetails: inv.serviceDetails,
          qty: inv.qty,
          costPerQty: inv.costPerQty,
          amountPayable: inv.amountPayable,
          amountPaid: inv.amountPaid,
          balance: inv.balance,
          dateOfService: inv.dateOfService,
          deliveryDetails: inv.deliveryDetails,
          emailId: inv.emailId
        });
      } catch (err) {
        console.error('Invoice load failed:', err);
        alert('Invoice not found');
      }
    };

    if (isUpdateMode) {
      loadInvoice();
    } else {
      loadEstimate();
    }
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
      if (isUpdateMode) {
        await updateInvoice(id, form);
      } else {
        await addInvoice(form);
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
        {isUpdateMode && <input className="form-control mb-2" value={form.invoiceNo} placeholder="Invoice No" disabled />}
        <input className="form-control mb-2" value={form.estimateId} placeholder="Estimate ID" disabled />
        <input className="form-control mb-2" value={form.chainId} placeholder="Chain ID" disabled />
        <input className="form-control mb-2" value={form.serviceDetails} placeholder="Service Provided" disabled />
        <input className="form-control mb-2" value={form.qty} placeholder="Quantity" disabled />
        <input className="form-control mb-2" value={form.costPerQty} placeholder="Cost per Quantity" disabled />
        <input className="form-control mb-2" value={form.amountPayable} placeholder="Amount Payable" disabled />
        <input className="form-control mb-2" value={form.amountPaid} placeholder="Amount Paid in Rs" disabled />
        <input className="form-control mb-2" value={form.balance} placeholder="Balance" disabled />
        <input className="form-control mb-2" value={form.dateOfService} placeholder="Delivery Date" disabled />
        <textarea className="form-control mb-2" rows="3" value={form.deliveryDetails} placeholder="Other Delivery Details" disabled />
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
