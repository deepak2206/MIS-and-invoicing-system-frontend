import { useEffect, useState } from 'react';
import { getZones, deleteZone } from '../services/zoneService';
import { getBrands } from '../services/brandService';
import TopNavbar from './TopNavbar';
import { useNavigate } from 'react-router-dom';

const ZoneDashboard = () => {
  const [zones, setZones] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [zonesRes, brandsRes] = await Promise.all([getZones(), getBrands()]);
    setZones(zonesRes.data);
    setBrands(brandsRes.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Confirm deletion?")) {
      await deleteZone(id);
      fetchData();
    }
  };

  return (
    <>
      <TopNavbar />
      <div className="container mt-4">
        <h4>Manage Zone Section</h4>
        <button className="btn btn-success mb-3" onClick={() => navigate('/add-zone')}>Add Zone</button>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th><th>Zone</th><th>Brand</th><th>Company</th><th>Group</th><th>Edit</th><th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((z, i) => (
              <tr key={z.zoneId}>
                <td>{i + 1}</td>
                <td>{z.zoneName}</td>
                <td>{z.brand.brandName}</td>
                <td>{z.brand.chain.companyName}</td>
                <td>{z.brand.chain.group.groupName}</td>
                <td><button className="btn btn-warning btn-sm" onClick={() => navigate(`/edit-zone/${z.zoneId}`)}>Edit</button></td>
                <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(z.zoneId)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ZoneDashboard;
