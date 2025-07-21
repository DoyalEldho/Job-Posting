import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar/Navbar';
import Spinner from './components/Loader/Spinner';


const Register = lazy(() => import('./components/Register/Register'));
const Login = lazy(() => import('./components/Login/Login'));
const EmployeeDashboard = lazy(() => import('./components/EmployeeDashboard/EmployeeDashboard'));
const CompanyDashboard = lazy(() => import('./components/companyDashboard/CompanyDashboard'));
const PostJob = lazy(() => import('./components/companyDashboard/PostJob'));
const JobList = lazy(() => import('./components/companyDashboard/JobList'));
const Applicants = lazy(() => import('./components/companyDashboard/Applicants'));
const EditJob = lazy(() => import('./components/companyDashboard/EditJob'));
const AppliedJobs = lazy(() => import('./components/EmployeeDashboard/AppliedJobs'));
const AllJobs = lazy(() => import('./components/EmployeeDashboard/AllJobs'));

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <main className="flex-grow">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
          {/* Parent route */}
            <Route path="/employee" element={<EmployeeDashboard />}>
              <Route path="all-jobs" element={<AllJobs />} />
              <Route path="applied-jobs" element={<AppliedJobs />} />
            </Route>

            {/* NESTED ROUTES company */}
            <Route path="/company" element={<CompanyDashboard />}>
              <Route path="post-job" element={<PostJob />} />
              <Route path="job-list" element={<JobList />} />
              <Route path="applicants" element={<Applicants />} />
            </Route>
             <Route path="/edit-job/:jobId" element={<EditJob />} />
            {/* 404 fallback */}
            <Route path="*" element={<div className="text-center p-10 text-red-500">404 - Page Not Found</div>} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
