import Candidate from '../Model/Candidate.js';

async function getCandidatesByStatus(req, res) {
    try {
        const candidates = await Candidate.find({ status: 'CV Passed' }).exec();
        console.log('line 6:',candidates);
        res.json(candidates);
    } catch (error) {
        console.error('Error getting candidates:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getCandidateCV(req, res) {
    try {
        const { candidateId } = req.params;
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        // Trả về CV của ứng viên
        res.send(candidate.cv);
    } catch (error) {
        console.error('Error getting candidate CV:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



async function getCandidateInfo(req, res) {
    try {
        const { candidateId } = req.params;
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json(candidate);
    } catch (error) {
        console.error('Error getting candidate info:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function acceptCV(req, res) {
    try {
        const { candidateId } = req.params;
        const candidate = await Candidate.findByIdAndUpdate(candidateId, { cvStatus: 'Accepted' }, { new: true });
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json(candidate);
    } catch (error) {
        console.error('Error accepting CV:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function rejectCV(req, res) {
    try {
        const { candidateId } = req.params;
        const candidate = await Candidate.findByIdAndUpdate(candidateId, { cvStatus: 'Rejected' }, { new: true });
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json(candidate);
    } catch (error) {
        console.error('Error rejecting CV:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default {
    getCandidatesByStatus, getCandidateCV,getCandidateInfo,acceptCV,rejectCV
};
