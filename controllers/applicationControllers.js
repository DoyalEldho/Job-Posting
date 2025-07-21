const Job = require('../models/jobModel');
const Application = require('../models/applicationModel');
const multer = require('multer');

const allJobs = async (req, res) => {

    try {
        const jobs = await Job.find();
        res.json(jobs);

    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}


const filterJob = async (req, res) => {
    const { title } = req.query;

    try {

        if (!title) {
            return res.status(400).json({ message: "Title query is required" });
        }

        const jobs = await Job.find(
            title
                ? { title: { $regex: title, $options: 'i' } }
                : {}
        );

        if (jobs.length > 0) {
            return res.json(jobs);
        }

        return res.json({ message: "No results" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const applyToJob = async (req, res) => {
    try {
        const { note } = req.body;
        const jobId = req.params.jobId;

        const resumePath = req.file ? req.file.path : null;

        const application = new Application({
            user: req.user.id,
            job: jobId,
            note,
            resume: resumePath,
        });

        await application.save();
        res.status(201).json({ message: 'Application submitted', application });

    } catch (err) {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ error: 'Only PDF files are allowed' });
        }

        res.status(500).json({ error: err.message });


    }
};

const  myApplications= async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id }).populate('job');

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
    allJobs,
    filterJob,
    applyToJob,
    myApplications
};