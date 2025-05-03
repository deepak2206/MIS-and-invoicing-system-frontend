import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import GroupDashboard from "./components/GroupDashboard";
import EditGroup from "./components/EditGroup";
import "./styles/AppStyles.css";
import EditDetails from "./components/EditDetails";
import ChainDashboard from "./components/ChainDashboard";
import AddChain from "./components/AddChain";
import EditChain from "./components/EditChain";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="top-navbar d-flex justify-content-between align-items-center px-4 py-2 bg-light border-bottom">
          <span className="fw-bold fs-5 text-dark">Invoice</span>
          <span className="text-muted">| Manage Group Section</span>
          <span className="user">
            Hi User{" "}
            <a href="#" className="ms-2 text-decoration-none">
              Logout
            </a>
          </span>
        </div>

        <div className="tab-bar bg-white px-4 py-2 border-bottom d-flex gap-4">
          <Link to="/" className="tab-link active">
            Manage Groups
          </Link>
          <Link to="/manage-chain">
            <span className="tab-link">Manage Chain</span>
          </Link>
          <span className="tab-link">Manage Brands</span>
          <span className="tab-link">Manage SubZones</span>
          <span className="tab-link">Manage Estimate</span>
          <span className="tab-link">Manage Invoices</span>
        </div>
      </div>

      <Routes>
        
<Route path="/" element={<Login />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/dashboard" element={<GroupDashboard />} />
       
        <Route path="/edit" element={<EditGroup />} />
        <Route path="/edit/:id" element={<EditDetails />} />
        <Route path="/manage-chain" element={<ChainDashboard />} />
        <Route path="/add-chain" element={<AddChain />} />
        <Route path="/edit-chain/:id" element={<EditChain />} />
        <Route path="*" element={<ChainDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

