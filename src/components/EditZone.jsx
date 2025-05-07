import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBrands } from '../services/brandService';
import { updateZone, addZone, getZones } from '../services/zoneService';

const EditZone = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [zone, setZone] = useState({
    zoneName: '',
    brandId: '',
  });
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrands();
    if (id) fetchZoneById();
  }, [id]);

  const fetchBrands = async () => {
    try {
      const res = await getBrands();
      setBrands(res.data);
    } catch (err) {
      console.error("Failed to load brands", err);
    }
  };

  const fetchZoneById = async () => {
    try {
      const res = await getZones(); // fetches all zones
      const target = res.data.find(z => z.zoneId == id);
      if (target) {
        setZone({
          zoneName: target.zoneName,
          brandId: target.brand.brandId,
        });
      }
    } catch (err) {
      console.error("Failed to fetch zone", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateZone(id, zone);
        alert("Zone updated successfully");
      } else {
        await addZone(zone);
        alert("Zone added successfully");
      }
      navigate("/manage-zone");
    } catch (err) {
      console.error("Failed to save zone", err);
      alert("Failed to save zone");
    }
  };

  return (
    <div className="container mt-4">
      <h4>{id ? "Edit Zone" : "Add Zone"}</h4>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label>Zone Name</label>
          <input
            className="form-control"
            value={zone.zoneName}
            onChange={(e) => setZone({ ...zone, zoneName: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Select Brand</label>
          <select
            className="form-select"
            value={zone.brandId}
            onChange={(e) => setZone({ ...zone, brandId: e.target.value })}
            required
          >
            <option value="">-- Select Brand --</option>
            {brands.map((b) => (
              <option key={b.brandId} value={b.brandId}>{b.brandName}</option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary">{id ? "Update" : "Add"} Zone</button>
      </form>
    </div>
  );
};

export default EditZone;
