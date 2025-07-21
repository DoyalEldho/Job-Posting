import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Loader/Spinner';

const Applicants = () => {
  const [groupedApplicants, setGroupedApplicants] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get('http://localhost:5000/company/applicants', {
          withCredentials: true, 
        });
        setGroupedApplicants(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  if (loading) return <div className="text-center text-gray-500"><Spinner/></div>;

  // Filter job titles by search text
  const filteredTitles = Object.keys(groupedApplicants).filter(title =>
    title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">Job Applications</h2>

      {/* Search input */}
      <div className="mb-8 text-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by job title..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredTitles.length === 0 ? (
        <p className="text-center text-gray-500">No applications found for this job title.</p>
      ) : (
        filteredTitles.map(jobTitle => (
          <div key={jobTitle} className="mb-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">{jobTitle}</h3>
            <div className="space-y-4">
              {groupedApplicants[jobTitle].map((applicant, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                  <p className="text-lg font-medium text-gray-800">{applicant.applicantName}</p>
                  <p className="text-sm text-gray-600">{applicant.applicantEmail}</p>
                  <p className="text-sm text-gray-700 italic mt-1">"{applicant.note}"</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Applied on: {new Date(applicant.appliedAt).toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                      hour12: true
                    })}
                  </p>
                  {applicant.resume && (
                    <a
                      href={`http://localhost:5000/${applicant.resume.replace(/\\/g, '/')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition"
                    >
                      View Resume
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Applicants;
