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
      </Routes>
    </BrowserRouter>
  );
}

export default App; // ✅ Important!
