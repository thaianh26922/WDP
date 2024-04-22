import mongoose from "mongoose";
import { Staff } from "../Model/Staff.js";

async function getAllStaffs(req, res) {
    try {
        const staffs = await Staff.find({});
        // Kiểm tra trong mảng có dữ liệu về nhân viên
        if (staffs.length > 0) {
            return res.status(200).json({
                result: 'SUCCESS',
                message: 'SUCCESS - Đã trả về dữ liệu của nhân viên',
                data: staffs
            })
        } else {
            return res.status(404).json({
                result: 'FAIL',
                message: 'FAIL - Không có dữ liệu nhân viên trong cơ sở dữ liệu'
            })
        }
    } catch (error) {
        res.status(500).json({
            result: 'ERROR',
            message: 'ERROR - Đã có lỗi xảy ra',
            error: error
        })
    }
}


async function getStaffsByCompanyId(req, res) {
    const { companyId } = req.params;
    try {
        const companies = await Staff.find({ companyId });
        // Kiểm tra xem có dữ liệu công ty trong mảng không
        if (companies != null) {
            return res.status(200).json({
                result: 'SUCCESS',
                message: `SUCCESS - Đã lấy được nhân viên với id công ty ${companyId}`,
                data: companies
            });
        } else {
            return res.status(404).json({
                result: 'FAIL',
                message: `FAIL - Không có dữ liệu nhân viên với id công ty ${companyId}`,
            });
        }
    } catch (error) {
        res.status(500).json({
            result: 'ERROR',
            message: 'ERROR - Đã có lỗi xảy ra',
            error: error
        })
    }
}

/**
 * @des Thêm nhân viên vào công ty
 * @author Dương Thành Luân
 * @date 2024-01-26
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function insertStaff(req, res) {
    const { account, password, companyId, role, status, name } = req.body;
    try {
        const existedAccount = await Staff.findOne({account});
        if(!existedAccount){
            const newStaff = new Staff({ account, password, companyId, role, status, name });
            await newStaff.save();
            return res.status(200).json({
                result: 'SUCCESS',
                message: 'SUCCESS - Đã thêm nhân viên thành công',
                data: newStaff
            });
        } else {
            return res.status(500).json({
                result: 'FAIL',
                message: `FAIL - Tài khoản nhân viên ${account} đã tồn tại`,
            });
        }
       
    } catch (error) {
        res.status(500).json({
            result: 'ERROR',
            message: 'ERROR - Đã có lỗi xảy ra',
            error: error
        })
    }
}

async function updateStaff(req, res){
    const staffId = req.params.id;
    const { password, role, name, status } = req.body;    
    try {
        const staff = await Staff.findOneAndUpdate({_id: staffId}, {
            password,
            role,
            name,
            status
        }, { new: true }).exec();
        if(staff){
            return res.status(200).json({
                result: 'SUCCESS',
                message: 'SUCCESS - Đã cập nhật nhân viên thành công',
                data: staff
            });
        } else {
            return res.status(404).json({
                result: 'FAIL',
                message: `FAIL - ID ${staffId} không tồn tại`,
            });
        }
    } catch (error) {
        res.status(500).json({
            result: 'ERROR',
            message: 'ERROR - Đã có lỗi xảy ra',
            error: error
        })
    }
}

async function loginForStaff(req, res){
    const { account, password } = req.body;
    try {
        const staff = await Staff.findOne({account, password}).populate('companyId').exec();
        if(staff != null) {
            res.status(200).json({
                result: 'SUCCESS',
                message: 'SUCCESS - Đã lấy dữ liệu nhân viên',
                data: staff
            })
        } else {
            res.status(404).json({
                result: 'FAIL',
                message: 'FAIL - Tài khoản hoặc mật khẩu không chính xác'
            })
        
        }
    } catch (error) {
        console.log(error);
    }
}

export {getAllStaffs, getStaffsByCompanyId, insertStaff, updateStaff, loginForStaff}

