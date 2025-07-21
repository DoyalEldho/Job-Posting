import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const CompanyDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
          <Outlet />
    </div>
  );
};

export default CompanyDashboard;
