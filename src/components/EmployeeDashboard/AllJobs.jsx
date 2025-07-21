import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaMoneyBillAlt, FaCalendarAlt, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [allTitles, setAllTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [note, setNote] = useState('');
  const [resume, setResume] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/all/jobs', { withCredentials: true });
      setJobs(res.data);
      const titles = [...new Set(res.data.map(job => job.title))];
      setAllTitles(titles);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const handleFilterChange = async (title) => {
    setSelectedTitle(title);

    if (!title) {
      fetchJobs();
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5000/filter/jobs?title=${title}`, {
        withCredentials: true,
      });
      if (Array.isArray(res.data)) {
        setJobs(res.data);
      } else {
        setJobs([]);
        toast(res.data.message);
      }
    } catch (err) {
      console.error('Filter failed:', err);
    }
  };

  const openModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleApply = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('note', note);
    formData.append('resume', resume);

    try {
      const res = await axios.post(
        `http://localhost:5000/apply/${selectedJob._id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setShowModal(false);
      setNote('');
      setResume(null);
    } catch (err) {
      toast.error('Application failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Job count box */}
        <div className="bg-blue-50 shadow-sm rounded-lg px-6 py-4 w-full mb-6 border border-blue-200">
          <p className="text-xl font-semibold text-blue-900 text-center">
            {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} available
          </p>
        </div>

        {/* Filter dropdown */}
        <div className="mb-6 flex justify-center">
          <select
            value={selectedTitle}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">All Jobs</option>
            {allTitles.map((title, idx) => (
              <option key={idx} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        {/* Job listings */}
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-blue-700">{job.title}</h3>
              <p className="text-gray-600 mb-2">{job.description}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {job.requiredSkills.map((skill, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="text-sm text-gray-500 flex flex-wrap gap-4">
                <span><FaMapMarkerAlt className="inline mr-1" /> {job.location}</span>
                <span><FaMoneyBillAlt className="inline mr-1" /> ₹{job.salary}</span>
                <span><FaCalendarAlt className="inline mr-1" /> {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>

              <button
                onClick={() => openModal(job)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
              >
                <FaPaperPlane /> Apply
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-center">Apply for {selectedJob?.title}</h2>
              <form onSubmit={handleApply} className="space-y-4">
                <textarea
                  placeholder="Write your note here..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
