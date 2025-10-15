import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdminPermissions from './pages/AdminPermissions'
import AdminDashboard from './pages/AdminDashboard'
import PermissionGroups from './pages/PermissionGroups'
import PermissionGroupDetail from './pages/PermissionGroupDetail'
import EmployeePortal from './pages/EmployeePortal'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/permissions" element={<AdminPermissions />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/permission-groups" element={<PermissionGroups />} />
        <Route path="/permission-groups/:id" element={<PermissionGroupDetail />} />
        <Route path="/employee/:userId" element={<EmployeePortal />} />
      </Routes>
    </Router>
  )
}

export default App
