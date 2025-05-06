import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChains } from '../services/chainService';
import { getBrands } from '../services/brandService';
import axios from 'axios';
import TopNavbar from './TopNavbar';

const GroupDashboard = () => {
  const [groups, setGroups] = useState([]);
  const [chains, setChains] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const BASE = import.meta.env.VITE_API_BASE_URL;

  const fetchGroups = async () => {
    const res = await axios.get(`${BASE}/api/groups`, { withCredentials: true });
    setGroups(res.data);
  };

  const fetchChainsAndBrands = async () => {
    const [chainRes, brandRes] = await Promise.all([getChains(), getBrands()]);
    setChains(chainRes.data);
    setBrands(brandRes.data);
  };

  useEffect(() => {
    fetchGroups();
    fetchChainsAndBrands();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      await axios.delete(`${BASE}/api/groups/${id}`, { withCredentials: true });
      fetchGroups();
    }
  };

  const getChainsForGroup = (groupId) =>
    chains.filter((c) => c.group.groupId === groupId);

  const getBrandsForChain = (chainId) =>
    brands.filter((b) => b.chain.chainId === chainId);

  return (
    <>
      <TopNavbar />
      <div className="container-fluid" style={{ marginLeft: '220px' }}>
        <div className="top-navbar bg-white px-4 py-3 border-bottom d-flex justify-content-between">
          <strong>Invoice | Manage Groups</strong>
        </div>

        <div className="dashboard-content p-4">
          {/* Summary Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card bg-danger text-white shadow text-center">
                <div className="card-body">
                  <h6>Total Groups</h6>
                  <h4>{groups.length}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-white shadow text-center">
                <div className="card-body">
                  <h6>Total Chains</h6>
                  <h4>{chains.length}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white shadow text-center">
                <div className="card-body">
                  <h6>Total Brands</h6>
                  <h4>{brands.length}</h4>
                </div>
              </div>
            </div>
          </div>

          <button className="btn btn-primary mb-3" onClick={() => navigate('/edit')}>
            ➕ Add Group
          </button>

          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Sr.No</th>
                  <th>Group</th>
                  <th>Companies</th>
                  <th>Brands</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((g, i) => {
                  const groupChains = getChainsForGroup(g.groupId);
                  const groupBrands = brands.filter(b =>
                    groupChains.some(c => c.chainId === b.chain.chainId)
                  );

                  return (
                    <tr key={g.groupId}>
                      <td>{i + 1}</td>
                      <td>{g.groupName}</td>
                      <td>
                        {groupChains.length > 0 ? (
                          <ul>
                            {groupChains.map((c) => (
                              <li key={c.chainId}>{c.companyName} ({c.gstnNo})</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-muted">No Companies</span>
                        )}
                      </td>
                      <td>
                        {groupBrands.length > 0 ? (
                          <ul>
                            {groupBrands.map((b) => (
                              <li key={b.brandId}>{b.brandName}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-muted">No Brands</span>
                        )}
                      </td>
                      <td>
                        <button className="btn btn-warning btn-sm" onClick={() => navigate(`/edit/${g.groupId}`)}>Edit</button>
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(g.groupId)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
                {groups.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center">No groups available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupDashboard;
