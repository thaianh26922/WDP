import JobPosting from '../Model/JobPosting.js';

async function getJobPosting(req, res) {
    try {
        const { jobId } = req.params;
        const jobPosting = await JobPosting.findById(jobId);
        if (!jobPosting) {
            return res.status(404).json({ error: 'Job posting not found' });
        }
        res.json(jobPosting);
    } catch (error) {
        console.error('Error getting job posting:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getAllJobPostings(req, res) {
    try {
        const jobPostings = await JobPosting.find();
        res.json(jobPostings);
    } catch (error) {
        console.error('Error getting job postings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default {
    getJobPosting,
    getAllJobPostings
};
