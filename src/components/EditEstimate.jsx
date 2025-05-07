import { useEffect, useState } from 'react';
import { addEstimate, updateEstimate, getEstimates } from '../services/estimateService';
import { getChains } from '../services/chainService';
import { getBrands } from '../services/brandService';
import { getZones } from '../services/zoneService';
import { useNavigate, useParams } from 'react-router-dom';

const EditEstimate = () => {
  const [form, setForm] = useState({
    chainId: '',
    zoneId: '',
    service: '',
    qty: '',
    costPerUnit: '',
    totalCost: '',
    deliveryDate: '',
    deliveryDetails: ''
  });

  const [chains, setChains] = useState([]);
  const [brands, setBrands] = useState([]);
  const [zones, setZones] = useState([]);
  const [groupName, setGroupName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getChains().then(res => setChains(res.data));
    getBrands().then(res => setBrands(res.data));
    getZones().then(res => setZones(res.data));
  }, []);

  useEffect(() => {
    if (id) {
      getEstimates().then(res => {
        const estimate = res.data.find(e => e.estimateId == id);
        if (estimate) {
          // Wait for zones to be loaded first
          const matchedZone = zones.find(z => z.zoneName === estimate.zoneName);
          setForm({
            chainId: estimate.chain.chainId,
            zoneId: matchedZone ? matchedZone.zoneId : '',
            service: estimate.service,
            qty: estimate.qty,
            costPerUnit: estimate.costPerUnit,
            totalCost: estimate.totalCost,
            deliveryDate: estimate.deliveryDate,
            deliveryDetails: estimate.deliveryDetails
          });
        }
      });
    }
  }, [id, zones]);

  useEffect(() => {
    if (form.chainId) {
      const selectedChain = chains.find(c => c.chainId == form.chainId);
      if (selectedChain) {
        setGroupName(selectedChain.group.groupName);
      }
    }
  }, [form.chainId, chains]);

  useEffect(() => {
    if (form.qty && form.costPerUnit) {
      const qty = parseFloat(form.qty);
      const cost = parseFloat(form.costPerUnit);
      const total = qty * cost;
      setForm(prev => ({
        ...prev,
        totalCost: Number(total.toFixed(2))
      }));
    }
  }, [form.qty, form.costPerUnit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        chainId: form.chainId,
        zoneId: form.zoneId,
        service: form.service,
        qty: form.qty,
        costPerUnit: form.costPerUnit,
        totalCost: form.totalCost,
        deliveryDate: form.deliveryDate,
        deliveryDetails: form.deliveryDetails
      };
      if (id) {
        await updateEstimate(id, payload);
      } else {
        await addEstimate(payload);
      }
      navigate('/manage-estimate');
    } catch (err) {
      console.error(err);
      alert('Failed to submit estimate');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h4>{id ? 'Edit' : 'Add'} Estimate</h4>
      <form onSubmit={handleSubmit} className="w-75">
        <select className="form-select mb-2" name="chainId" value={form.chainId} onChange={handleChange} required>
          <option value="">Select Company</option>
          {chains.map(c => (
            <option key={c.chainId} value={c.chainId}>{c.companyName}</option>
          ))}
        </select>

        <input className="form-control mb-2" value={groupName} placeholder="Group Name" readOnly />

        <select className="form-select mb-2" name="zoneId" value={form.zoneId} onChange={handleChange} required>
          <option value="">Select Zone</option>
          {zones.map(z => (
            <option key={z.zoneId} value={z.zoneId}>{z.zoneName} ({z.brand.brandName})</option>
          ))}
        </select>

        <input className="form-control mb-2" name="service" placeholder="Service" value={form.service} onChange={handleChange} required />
        <input className="form-control mb-2" type="number" name="qty" placeholder="Quantity" value={form.qty} onChange={handleChange} required />
        <input className="form-control mb-2" type="number" step="0.01" name="costPerUnit" placeholder="Cost per Unit" value={form.costPerUnit} onChange={handleChange} required />
        <input className="form-control mb-2" name="totalCost" value={form.totalCost} readOnly />
        <input className="form-control mb-2" type="date" name="deliveryDate" value={form.deliveryDate} onChange={handleChange} required />
        <input className="form-control mb-3" name="deliveryDetails" placeholder="Delivery Details" value={form.deliveryDetails} onChange={handleChange} />
        <button className="btn btn-primary">{id ? 'Update' : 'Add'} Estimate</button>
      </form>
    </div>
  );
};

export default EditEstimate;
