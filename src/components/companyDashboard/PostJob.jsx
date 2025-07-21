import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    requiredSkills: '',
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert comma-separated skills to array
    const jobToSend = {
      ...jobData,
      requiredSkills: jobData.requiredSkills.split(',').map((skill) => skill.trim()),
    };

    try {
      await axios.post('http://localhost:5000/create/post', jobToSend, { withCredentials: true });
      toast.success('Job posted successfully!');
      setJobData({ title: '', description: '', location: '', salary: '', requiredSkills: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post job');
    }
  };

  return (
 <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl mt-10">
  <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
    Post a New Job
  </h2>

  <form onSubmit={handleSubmit} className="space-y-5">
    {/* Job Title */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Job Title</label>
      <input
        type="text"
        name="title"
        placeholder="e.g. Frontend Developer"
        value={jobData.title}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Job Description */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Job Description</label>
      <textarea
        name="description"
        placeholder="Briefly describe the job responsibilities..."
        value={jobData.description}
        onChange={handleChange}
        required
        rows={4}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Location */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Location</label>
      <input
        type="text"
        name="location"
        placeholder="e.g. Remote, Kochi, Bengaluru"
        value={jobData.location}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Salary */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Salary (₹)</label>
      <input
        type="number"
        name="salary"
        placeholder="e.g. 40000"
        value={jobData.salary}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Required Skills */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Required Skills</label>
      <input
        type="text"
        name="requiredSkills"
        placeholder="e.g. React, JavaScript, CSS"
        value={jobData.requiredSkills}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 rounded-lg hover:from-blue-500 hover:to-indigo-500 transition shadow-md"
    >
      Post Job
    </button>
  </form>
</div>

  );
};

export default PostJob;
