const Job = require('../models/jobModel')
const Application = require('../models/applicationModel');

const createJob = async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({ message: 'Only companies can post jobs' });
    }

    const { title, description, location, salary, requiredSkills } = req.body;

    const job = new Job({
      title,
      description,
      location,
      salary,
      requiredSkills,
      company: req.user.id,
    });

    await job.save();
    res.status(201).json({ message: "Job Post added sucessfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//fetch
const getCompanyJobs = async (req, res) => {
  try {
    if (req.user.role !== 'company') {
      return res.status(403).json({ message: 'Only companies can view this' });
    }

    const jobs = await Job.find({ company: req.user.id });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update
const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findOneAndUpdate(
      { _id: req.params.id, company: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found ' });
    }

    res.status(200).json({ message: "Job updated sucessfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, company: req.user.id });
    if (!job) return res.status(404).json({ message: 'Job not found or unauthorized' });

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//see applicants of each job post
const applicants = async (req, res) => {

  try {
    const jobs = await Job.find({ company: req.user.id });
    const jobId = jobs.map(job => job._id);

    const applications = await Application.find({ job: { $in: jobId } })
      .populate('user', 'name email')    // applicant info
      .populate('job', 'title');         // job title

      //group by job title
      
//   "Frontend Developer": [
//     {
//       "applicantName": "Alice",
//       "applicantEmail": "alice@example.com",
//       "resume": "uploads/resumes/alice.pdf",
//       "note": "Looking forward to working!",
//       "appliedAt": "2025-07-19T12:00:00Z"
//     },
//     {
//       "applicantName": "Charlie",
//       "applicantEmail": "charlie@example.com",
//       "resume": "uploads/resumes/charlie.pdf",
//       "note": "Ready to contribute!",
//       "appliedAt": "2025-07-20T09:10:00Z"
//     }
//   ],
//   "Backend Developer": [
//     {
//       "applicantName": "Bob",
//       "applicantEmail": "bob@example.com",
//       "resume": "uploads/resumes/bob.pdf",
//       "note": "Excited to apply!",
//       "appliedAt": "2025-07-18T15:30:00Z"
//     }
//   ]
// }

    const grouped = {};
    applications.forEach(app => {
      const jobTitle = app.job.title;

      if (!grouped[jobTitle]) grouped[jobTitle] = [];

      grouped[jobTitle].push({
        applicantName: app.user.name,
        applicantEmail: app.user.email,
        resume: app.resume,
        note: app.note,
        appliedAt: app.appliedAt
      });
    });
 res.status(200).json(grouped);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }


}

module.exports = {
  createJob,
  getCompanyJobs,
  updateJob,
  deleteJob,
  applicants,
  getJobById
};

