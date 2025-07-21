import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    requiredSkills: '',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/jobs/${jobId}`, { withCredentials: true });
        const job = res.data;
        setJobData({
          title: job.title,
          description: job.description,
          location: job.location,
          salary: job.salary,
          requiredSkills: job.requiredSkills.join(', '),
        });
      } catch (err) {
        toast.error('Failed to load job data');
      }
    };

    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedJob = {
      ...jobData,
      requiredSkills: jobData.requiredSkills.split(',').map(skill => skill.trim()),
    };

    try {
      await axios.put(`http://localhost:5000/update/posts/${jobId}`, updatedJob, {
        withCredentials: true,
      });
      toast.success('Job updated successfully!');
      navigate('/company/job-list');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Edit Job</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input name="title" value={jobData.title} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Job Title" />
        <textarea name="description" value={jobData.description} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Description" />
        <input name="location" value={jobData.location} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Location" />
        <input name="salary" type="number" value={jobData.salary} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Salary" />
        <input name="requiredSkills" value={jobData.requiredSkills} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Skills (comma separated)" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">Update Job</button>
      </form>
    </div>
  );
};

export default EditJob;
