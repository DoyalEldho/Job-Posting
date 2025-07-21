import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaMapMarkerAlt,
  FaMoneyBillAlt,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/fetch/posts', {
          withCredentials: true,
        });
        setJobs(res.data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/delete/posts/${jobId}`, {
        withCredentials: true,
      });
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      toast.success('Job posted deleted!');

    } catch (err) {
      console.error('Failed to delete job:', err);
    }
  };

  const handleEdit = (jobId) => {
    navigate(`/edit-job/${jobId}`); 
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
          <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                  <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                      Jobs Posted
                  </h2>
                  <p className="text-lg text-gray-600">
                      <span className="font-semibold text-gray-800">{jobs.length}  </span>{' '}
                      {jobs.length === 1 ? ' job available' : ' jobs available'}
                  </p>
                  <div className="w-24 mx-auto mt-3 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full" />
              </div>


        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs posted</p>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-2">
                      {job.requiredSkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMoneyBillAlt /> ₹{job.salary.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt /> Posted on{' '}
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Edit/Delete Buttons */}
                 <div className="flex gap-3 mt-4 md:mt-0">
                            <button
                                onClick={() => handleEdit(job._id)}
                                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <FaEdit className="text-white" />
                                <span>Edit</span>
                            </button>

                            <button
                                onClick={() => handleDelete(job._id)}
                                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <FaTrash className="text-white" />
                                <span>Delete</span>
                            </button>
                        </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
