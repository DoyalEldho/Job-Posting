const express = require('express');
const applicationRouter =express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { allJobs, filterJob, applyToJob, myApplications } = require('../controllers/applicationControllers');
const upload = require('../middleware/upload');

applicationRouter.get('/all/jobs',auth,role('employee'),allJobs);
applicationRouter.get('/filter/jobs',auth,role('employee'),filterJob);
applicationRouter.post('/apply/:jobId', auth, upload.single('resume'), role('employee'),applyToJob);
applicationRouter.get('/my-applications', auth, role('employee'),myApplications)

module.exports = applicationRouter;