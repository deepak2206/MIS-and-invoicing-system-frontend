import React, { useEffect, useState } from "react";
import {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand,
  getChains,
} from "../services/brandService";
import TopNavbar from "./TopNavbar";

const BrandDashboard = () => {
  const [brands, setBrands] = useState([]);
  const [chains, setChains] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [selectedChain, setSelectedChain] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const [brandRes, chainRes] = await Promise.all([getBrands(), getChains()]);
      setBrands(brandRes.data);
      setChains(chainRes.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { brandName, chainId: selectedChain };
    try {
      if (editingId) {
        await updateBrand(editingId, data);
      } else {
        await addBrand(data);
      }
      resetForm();
      fetchData();
    } catch (err) {
      console.error("Error saving brand", err);
    }
  };

  const resetForm = () => {
    setBrandName("");
    setSelectedChain("");
    setEditingId(null);
  };

  const handleEdit = (brand) => {
    setBrandName(brand.brandName);
    setSelectedChain(brand.chain.chainId);
    setEditingId(brand.brandId);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Confirm deletion?")) {
      await deleteBrand(id);
      fetchData();
    }
  };

  return (
    <>
      <TopNavbar />
      <div className="container-fluid" style={{ marginLeft: "220px" }}>
        <div className="top-navbar bg-white px-4 py-3 border-bottom d-flex justify-content-between">
          <strong>Invoice | Manage Brands</strong>
        </div>

        <div className="dashboard-content p-4">
          <form className="row g-3 mb-4" onSubmit={handleSubmit}>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Enter Brand Name"
                required
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={selectedChain}
                onChange={(e) => setSelectedChain(e.target.value)}
                required
              >
                <option value="">Select Company</option>
                {chains.map((c) => (
                  <option key={c.chainId} value={c.chainId}>
                    {c.companyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <button className="btn btn-primary w-100" type="submit">
                {editingId ? "Update" : "Add"} Brand
              </button>
            </div>
          </form>

          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Group</th>
                <th>Company</th>
                <th>Brand</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((b, index) => (
                <tr key={b.brandId}>
                  <td>{index + 1}</td>
                  <td>{b.chain.group.groupName}</td>
                  <td>{b.chain.companyName}</td>
                  <td>{b.brandName}</td>
                  <td>
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(b)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(b.brandId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {brands.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    No brands found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BrandDashboard;
