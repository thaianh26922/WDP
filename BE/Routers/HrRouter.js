import express from 'express';
import hrController from '../Controller/HrController.js';

const router = express.Router();

router.get('/job-postings', hrController.getJobPostings);

router.post('/job-postings', hrController.createJobPosting);

router.put('/job-postings/:jobId', hrController.updateJobPosting);
export default router;
