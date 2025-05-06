import React, { useEffect, useState } from "react";
import {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand,
  getChains,
} from "../services/brandService"; // Make sure path is correct
import TopNavbar from "./TopNavbar";

const BrandDashboard = () => {
  const [brands, setBrands] = useState([]);
  const [chains, setChains] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [selectedChain, setSelectedChain] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const [brandRes, chainRes] = await Promise.all([
        getBrands(),
        getChains(),
      ]);
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
      try {
        await deleteBrand(id);
        fetchData();
      } catch (err) {
        console.error("Error deleting brand", err);
      }
    }
  };

  return (
    <div className="container">
      <TopNavbar />
      <div className="top-navbar">
          <span><strong>Invoice</strong> | Manage Group Section</span>
          <span>Hi User <span onClick={() => navigate('/login')} className="text-danger">Logout</span></span>
        </div>

      <h3>Manage Brand Section</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Enter Brand Name"
          required
        />
        <select
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
        <button type="submit">{editingId ? "Update" : "Add"} Brand</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Sr.No</th>
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
                <button onClick={() => handleEdit(b)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(b.brandId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrandDashboard;
