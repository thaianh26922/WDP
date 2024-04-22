import JobPosting from '../Model/Job.js';

async function getJobPostings(req, res) {
    try {
        const jobPostings = await JobPosting.find();
        res.json(jobPostings);
    } catch (error) {
        console.error('Error getting job postings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function createJobPosting(req, res) {
    try {
        const { title, company, location, description, requirements } = req.body;
        const jobPosting = new JobPosting({ title, company, location,description, requirements });
        await jobPosting.save();
        res.json(jobPosting);
    } catch (error) {
        console.error('Error creating job posting:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateJobPosting(req, res) {
    try {
        const { jobId } = req.params;
        const { title, company, location, description, requirements } = req.body;
        const updatedJobPosting = await JobPosting.findByIdAndUpdate(
            jobId,
            { title, company, location, description, requirements },
            { new: true }
        );
        if (!updatedJobPosting) {
            return res.status(404).json({ error: 'Job posting not found' });
        }
        res.json(updatedJobPosting);
    } catch (error) {
        console.error('Error updating job posting:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default {
    getJobPostings, createJobPosting,updateJobPosting
};
