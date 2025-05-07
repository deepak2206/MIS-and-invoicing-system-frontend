import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import GroupDashboard from './components/GroupDashboard';
import EditGroup from './components/EditGroup';
import EditDetails from './components/EditDetails';
import PrivateRoute from './components/PrivateRoute'; // If using protected routes
import ChainDashboard from './components/ChainDashboard';
import AddChain from './components/AddChain';
import EditChain from './components/EditChain';
import BrandDashboard from './components/BrandDashboard';
import ZoneDashboard from './components/ZoneDashboard';
import EditZone from './components/EditZone';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <GroupDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit"
          element={
            <PrivateRoute>
              <EditGroup />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditDetails />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Login />} />
        <Route path="/manage-chain" element={<ChainDashboard />} /> {/* ✅ Add this */}
        <Route path="/add-chain" element={<AddChain />} />
        <Route path="/edit-chain/:id" element={<EditChain />} />
        <Route path="/manage-brand" element={<BrandDashboard />} /> {/* ✅ Add this */}
        <Route path="/manage-zone" element={<ZoneDashboard />}/>
        <Route path="/add-zone" element={<EditZone />}/>
        <Route path="/edit-zone/:id" element={<EditZone />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App; // ✅ Important!
