import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaMoneyBillAlt, FaCalendarAlt } from 'react-icons/fa';
import { FaFileDownload } from 'react-icons/fa'; 

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/my-applications', { withCredentials: true })
      .then(res => setApplications(res.data))
      .catch(err => console.error('Error fetching applications:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">My Applied Jobs</h2>

        {applications.length === 0 ? (
          <p className="text-center text-gray-600">You haven’t applied to any jobs yet.</p>
        ) : (
          <div className="grid gap-6">
            {applications.map(app => (
              <div key={app._id} className="bg-white shadow-md rounded-lg p-6 border">
                <h3 className="text-2xl font-semibold text-blue-700">{app.job?.title || 'Job Not Found'}</h3>
                <p className="text-gray-600 mb-2">{app.job?.description}</p>

                <div className="flex flex-wrap gap-4 text-gray-500 text-sm mt-2">
                  <span><FaMapMarkerAlt className="inline" /> {app.job?.location}</span>
                  <span><FaMoneyBillAlt className="inline" /> ₹{app.job?.salary}</span>
                  <span><FaCalendarAlt className="inline" /> Applied on {new Date(app.appliedAt).toLocaleDateString()}</span>
                </div>

                {app.note && (
                  <p className="mt-3 text-sm text-gray-700">
                    <strong>Note:</strong> {app.note}
                  </p>
                )}

                {app.resume && (
                 <div className="mt-4">
                            <a
                                href={`http://localhost:5000/${app.resume.replace(/\\/g, '/')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full shadow transition duration-300"
                            >
                                <FaFileDownload className="text-white" />
                                View Resume
                            </a>
                        </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
