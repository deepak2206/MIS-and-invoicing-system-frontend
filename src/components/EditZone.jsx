import { useEffect, useState } from 'react';
import { addZone, updateZone, getZones } from '../services/zoneService';
import { getBrands } from '../services/brandService';
import { useNavigate, useParams } from 'react-router-dom';

const EditZone = () => {
  const [zoneName, setZoneName] = useState('');
  const [brandId, setBrandId] = useState('');
  const [brands, setBrands] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBrands().then(res => setBrands(res.data));
    if (id) {
      getZones().then(res => {
        const z = res.data.find(z => z.zoneId == id);
        if (z) {
          setZoneName(z.zoneName);
          setBrandId(z.brand.brandId);
        }
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { zoneName, brandId };
    if (id) await updateZone(id, data);
    else await addZone(data);
    navigate('/manage-zone');
  };

  return (
    <div className="container mt-4">
      <h4>{id ? "Edit Zone" : "Add Zone"}</h4>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" value={zoneName} onChange={e => setZoneName(e.target.value)} placeholder="Enter Zone Name" required />
        <select className="form-select mb-3" value={brandId} onChange={e => setBrandId(e.target.value)} required>
          <option value="">Select Brand</option>
          {brands.map(b => (
            <option key={b.brandId} value={b.brandId}>{b.brandName}</option>
          ))}
        </select>
        <button className="btn btn-primary">{id ? "Update" : "Add"} Zone</button>
      </form>
    </div>
  );
};

export default EditZone;
