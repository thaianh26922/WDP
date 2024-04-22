import multer from 'multer';
import { ApplyJob } from '../Model/ApplyJob.js';

async function applyJob(req, res) {
    const { userId, postId, cv, companyId } = req.body;
    try {
        const appliedJob = new ApplyJob({
            userId,
            postId,
            cv,
            companyId
        });
        await appliedJob.save();
        res.status(200).json({
            result: 'SUCCESS',
            message: 'SUCCESS - Đã apply job thành công',
            data: appliedJob
        });
    } catch (error) {
        res.status(400).json({
            result: 'FAIL',
            message: 'FAIL - Apply job không thành công',
            error: error.message
        });
    }
}


async function uploadCV(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                result: 'FAIL',
                message: 'FAIL - Không có file nào được upload',
            });
        }
        const fileName = req.file.filename;
        const filePath = req.file.path;
        res.status(200).json({
            result: 'SUCCESS',
            message: 'SUCCESS - Đã upload file thành công',
            data: {
                fileName,
                filePath
            }
        });
    } catch (error) {

    }
}

async function isAppliedJob(req, res) {
    const { userId, postId } = req.body;
    console.log(userId, postId);
    try {
        const appliedJob = await ApplyJob.findOne({ userId, postId }).exec();
        if (appliedJob) {
            res.status(200).json({
                result: 'SUCCESS',
                message: 'SUCCESS - Đã apply job',
                data: true
            });
        } else {
            res.status(200).json({
                result: 'SUCCESS',
                message: 'SUCCESS - Chưa apply job',
                data: false
            });
        }
    } catch (error) {
        res.status(400).json({
            result: 'FAIL',
            message: 'FAIL - Apply job không thành công',
            error: error.message
        });
    }
}

async function getAllAppliedJob(req, res) {
    try {
        const appliedJob = await ApplyJob.find({ status: 'PENDING' }).populate('userId').populate('postId').exec();

        res.status(200).json({
            result: 'SUCCESS',
            message: 'SUCCESS - Lấy danh sách apply job thành công',
            data: appliedJob
        });
    } catch (error) {
        res.status(400).json({
            result: 'FAIL',
            message: 'FAIL - Lấy danh sách apply job không thành công',
            error: error.message
        });
    }
}

async function getAllAppliedJobOfPost(req, res) {
    try {
        const { companyId } = req.params;
        const appliedJob = await ApplyJob.find({ companyId: companyId, status: 'APPROVED' }).exec();
        res.status(200).json({
            result: 'SUCCESS',
            message: 'SUCCESS - Lấy danh sách apply job thành công',
            data: appliedJob
        });
    } catch (error) {
        res.status(400).json({
            result: 'FAIL',
            message: 'FAIL - Lấy danh sách apply job không thành công',

        })
    }

}

async function changeApplieJobStatus(req, res) {
    const { id, status } = req.body;
    console.log(id, status);
    try {
        const appliedJob = await ApplyJob.findByIdAndUpdate(id, { status }).exec();
        if (appliedJob) {
            res.status(200).json({
                result: 'SUCCESS',
                message: 'SUCCESS - Đã thay đổi trạng thái apply job thành công',
            });
        } else {
            res.status(404).json({
                result: 'FAIL',
                message: 'FAIL - Không tìm thấy apply job',
            });
        }
    } catch (error) {
        res.status(400).json({
            result: 'FAIL',
            message: 'FAIL - Thay đổi trạng thái apply job không thành công',
            error: error.message
        });
    }
}
export default { applyJob, uploadCV, isAppliedJob, getAllAppliedJob, changeApplieJobStatus, getAllAppliedJobOfPost };
