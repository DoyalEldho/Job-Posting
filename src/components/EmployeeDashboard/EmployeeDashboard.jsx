import React from 'react'
import { Outlet, Link } from 'react-router-dom';
const EmployeeDashboard = () => {
  return (
    
     <div className="min-h-screen bg-gray-100 p-6">
          <Outlet />
    </div>
    
  )
}

export default EmployeeDashboard
