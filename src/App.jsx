import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import GroupDashboard from './components/GroupDashboard';
import EditGroup from './components/EditGroup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<GroupDashboard />} />
        <Route path="*" element={<Login />} />
        <Route path="/edit" element={<EditGroup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
