import React, { useEffect, useState } from "react";
import axios from "axios";

const BrandDashboard = () => {
  const [brands, setBrands] = useState([]);
  const [chains, setChains] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [selectedChain, setSelectedChain] = useState("");
  const [editingId, setEditingId] = useState(null);

  const BASE = import.meta.env.VITE_API_BASE_URL;

  const fetchBrands = async () => {
    const res = await axios.get(`${BASE}/brands`);
    setBrands(res.data);
  };

  const fetchChains = async () => {
    const res = await axios.get(`${BASE}/chains`);
    setChains(res.data);
  };

  useEffect(() => {
    fetchBrands();
    fetchChains();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { brandName, chainId: selectedChain };

    if (editingId) {
      await axios.put(`${BASE}/brands/${editingId}`, data);
    } else {
      await axios.post(`${BASE}/brands`, data);
    }
    setBrandName("");
    setSelectedChain("");
    setEditingId(null);
    fetchBrands();
  };

  const handleEdit = (brand) => {
    setBrandName(brand.brandName);
    setSelectedChain(brand.chain.chainId);
    setEditingId(brand.brandId);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Confirm deletion?")) {
      await axios.delete(`${BASE}/brands/${id}`);
      fetchBrands();
    }
  };

  return (
    <div className="container">
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
              {c.chainName}
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
              <td>{b.chain.chainName}</td>
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
