import multer from 'multer';
import { ApplyJob } from '../Model/ApplyJob.js';
import mongoose from 'mongoose';

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
async function getAllAppliedJobByUserId(req, res) {
    try {
        const { userId } = req.params;

        const appliedJobs = await ApplyJob.find({ userId: userId })
            .populate({
                path: 'companyId', // Trường companyId trong ApplyJob
                model: 'Company' // Tên mô hình của Company
            })
            .exec();

        res.status(200).json({
            result: 'SUCCESS',
            message: 'SUCCESS - Lấy danh sách apply job theo userId thành công',
            data: appliedJobs
        });
    } catch (error) {
        res.status(400).json({
            result: 'FAIL',
            message: 'FAIL - Lấy danh sách apply job theo userId không thành công',
            error: error.message
        });
    }
}
async function getAllAppliedJobOfPost(req, res) {
    try {
        const { companyId } = req.params;

        // Dùng aggregate để kết hợp dữ liệu từ hai bảng
        const appliedJobs = await ApplyJob.aggregate([
            { 
                $match: { 
                    companyId: mongoose.Types.ObjectId.createFromHexString(companyId) 
                } 
            }, // Chuyển companyId sang ObjectId
            {
                $lookup: {
                    from: 'cvapplies', // Tên của collection CvApply
                    let: { userId: '$userId' }, // Biến phụ để truyền userId từ ApplyJob vào CvApply
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: [ '$idUser', { $toString: '$$userId' }] } // Chuyển _id thành string để so sánh
                            }
                        }
                    ],
                    as: 'cvApplies' // Tên trường sẽ chứa kết quả lookup
                }
            },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    postId: 1,
                    companyId: 1,
                    status: 1,
                    cv: 1,
                    cvApplies: 1 // Giữ nguyên các tài liệu từ CvApply đã lấy được
                }
            }
        ]);

        res.status(200).json({
            result: 'SUCCESS',
            message: 'SUCCESS - Lấy danh sách apply job thành công',
            data: appliedJobs
        });
    } catch (error) {
        res.status(400).json({
            result: 'FAIL',
            message: 'FAIL - Lấy danh sách apply job không thành công',
            error: error.message // Thêm thông tin lỗi để dễ debug
        });
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
export default { applyJob, uploadCV, isAppliedJob, getAllAppliedJob, changeApplieJobStatus, getAllAppliedJobOfPost , getAllAppliedJobByUserId };
