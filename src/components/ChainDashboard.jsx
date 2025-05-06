import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChains, getChainsByGroup, deleteChain } from "../services/chainService";
import axios from "axios";
import TopNavbar from "./TopNavbar";

const BASE = import.meta.env.VITE_API_BASE_URL;

const ChainDashboard = () => {
  const [chains, setChains] = useState([]);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChains();
    fetchGroups();
  }, []);

  const fetchChains = () => {
    getChains().then((res) => setChains(res.data));
  };

  const fetchGroups = () => {
    axios.get(`${BASE}/api/groups`, { withCredentials: true })
      .then((res) => setGroups(res.data));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      await deleteChain(id);
      fetchChains();
    }
  };

  const handleFilter = async (groupId) => {
    if (!groupId) return fetchChains();
    const res = await getChainsByGroup(groupId);
    setChains(res.data);
  };

  return (
    <>
      <TopNavbar />
      <div className="container-fluid" style={{ marginLeft: "220px" }}>
        <div className="top-navbar bg-white px-4 py-3 border-bottom d-flex justify-content-between">
          <strong>Invoice | Manage Chains</strong>
        </div>

        <div className="dashboard-content p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Company List</h4>
            <button className="btn btn-success" onClick={() => navigate("/add-chain")}>
              ➕ Add Company
            </button>
          </div>

          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Group</th>
                <th>Company</th>
                <th>GSTN</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {chains.map((c, i) => (
                <tr key={c.chainId}>
                  <td>{i + 1}</td>
                  <td>{c.group.groupName}</td>
                  <td>{c.companyName}</td>
                  <td>{c.gstnNo}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => navigate(`/edit-chain/${c.chainId}`)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(c.chainId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {chains.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    No chains available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="mt-4">
            <h6>Filter by Group</h6>
            <div className="d-flex gap-2 flex-wrap">
              <button className="btn btn-outline-primary btn-sm" onClick={fetchChains}>
                All
              </button>
              {groups.map((group) => (
                <button
                  key={group.groupId}
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handleFilter(group.groupId)}
                >
                  {group.groupName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChainDashboard;
