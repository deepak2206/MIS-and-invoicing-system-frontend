import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopNavbar from './TopNavbar';
import { getZones } from '../services/zoneService';
import { getBrands } from '../services/brandService';
import { getChains } from '../services/chainService';
import { getEstimates } from '../services/estimateService';
import '../styles/DashboardLayout.css';

const GroupDashboard = () => {
  const [zones, setZones] = useState([]);
  const [brands, setBrands] = useState([]);
  const [chains, setChains] = useState([]);
  const [groups, setGroups] = useState([]);
  const [estimates, setEstimates] = useState([]);
  const [filteredZones, setFilteredZones] = useState([]);

  const navigate = useNavigate();
  const BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [zRes, bRes, cRes, gRes, estRes] = await Promise.all([
      getZones(),
      getBrands(),
      getChains(),
      axios.get(`${BASE}/api/groups`, { withCredentials: true }),
      getEstimates()
    ]);
    setZones(zRes.data);
    setBrands(bRes.data);
    setChains(cRes.data);
    setGroups(gRes.data);
    setEstimates(estRes.data);
    setFilteredZones(zRes.data);
  };

  const clearFilters = () => setFilteredZones(zones);

  const handleFilterByGroup = (groupId) => {
    const zonesForGroup = zones.filter((z) => z.brand.chain.group.groupId === groupId);
    setFilteredZones(zonesForGroup);
  };

  const handleFilterByChain = (chainId) => {
    const zonesForChain = zones.filter((z) => z.brand.chain.chainId === chainId);
    setFilteredZones(zonesForChain);
  };

  const handleFilterByBrand = (brandId) => {
    const zonesForBrand = zones.filter((z) => z.brand.brandId === brandId);
    setFilteredZones(zonesForBrand);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirm deletion?')) {
      await axios.delete(`${BASE}/api/zones/${id}`, { withCredentials: true });
      fetchData();
    }
  };

  

  return (
    <>
      <TopNavbar />
      <div className="container-fluid" style={{ marginLeft: '250px', marginTop: '60px' }}>
        <div className="row mb-4 text-center g-3">
          <div className="col-md-3">
            <div className="summary-card bg-primary">Total Groups<br /><span className="fs-4">{groups.length}</span></div>
          </div>
          <div className="col-md-3">
            <div className="summary-card bg-success">Total Chains<br /><span className="fs-4">{chains.length}</span></div>
          </div>
          <div className="col-md-3">
            <div className="summary-card bg-warning">Total Brands<br /><span className="fs-4">{brands.length}</span></div>
          </div>
          <div className="col-md-3">
            <div className="summary-card bg-danger">Total Zones<br /><span className="fs-4">{zones.length}</span></div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button className="btn btn-primary" onClick={() => navigate('/edit')}>➕ Add Group</button>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered align-middle zone-table">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Group</th>
                    <th>Chain ID</th>
                    <th>Brand</th>
                    <th>Zone</th>
                    <th>Service Details</th>
                    <th>Total Units</th>
                    <th>Price Per Unit</th>
                    <th>Total</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {estimates.map((e, i) => (
                    <tr key={e.estimateId}>
                      <td>{i + 1}</td>
                      <td>{e.chain.group.groupName}</td>
                      <td>{e.chain.chainId}</td>
                      <td>{e.brandName}</td>
                      <td>{e.zoneName}</td>
                      <td>{e.service}</td>
                      <td>{e.qty}</td>
                      <td>{e.costPerUnit}</td>
                      <td>{e.totalCost}</td>
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
                      <td>
                      <button
        className="btn btn-success btn-sm"
        onClick={() => navigate(`/generate-invoice/${e.estimateId}`)}
      >
        Generate Invoice
      </button>
                      </td>
                    </tr>
                  ))}
                  {estimates.length === 0 && (
                    <tr>
                      <td colSpan="11" className="text-center">No estimates available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="filter-box">
              <h6>Filter by Group:</h6>
              {groups.map((g) => (
                <button key={g.groupId} className="btn btn-outline-dark btn-sm mb-1 w-100" onClick={() => handleFilterByGroup(g.groupId)}>
                  {g.groupName}
                </button>
              ))}

              <h6 className="mt-3">Filter by Company:</h6>
              {chains.map((c) => (
                <button key={c.chainId} className="btn btn-outline-secondary btn-sm mb-1 w-100" onClick={() => handleFilterByChain(c.chainId)}>
                  {c.companyName}
                </button>
              ))}

              <h6 className="mt-3">Filter by Brand:</h6>
              {brands.map((b) => (
                <button key={b.brandId} className="btn btn-outline-primary btn-sm mb-1 w-100" onClick={() => handleFilterByBrand(b.brandId)}>
                  {b.brandName}
                </button>
              ))}

              <button className="btn btn-outline-danger btn-sm mt-3 w-100" onClick={clearFilters}>❌ Clear Filters</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupDashboard;
