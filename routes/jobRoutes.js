const express = require('express');
const jobRouter =express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { createJob, getCompanyJobs, updateJob, deleteJob, getJobById, applicants } = require('../controllers/jobControllers');


jobRouter.post('/create/post',auth,role('company'),createJob);
jobRouter.get('/fetch/posts',auth,role('company'),getCompanyJobs);
jobRouter.put('/update/posts/:id',auth,role('company'),updateJob);
jobRouter.delete('/delete/posts/:id',auth,role('company'),deleteJob);
jobRouter.get('/jobs/:id', auth,role('company'), getJobById);
jobRouter.get('/company/applicants',auth,role('company'),applicants)

module.exports = jobRouter;