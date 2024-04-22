import express from 'express'
import { getAllStaffs, getStaffsByCompanyId, insertStaff, updateStaff, loginForStaff } from '../Controller/StaffController.js';
const StaffRouter = express.Router();
// Lấy tất cả dữ liệu nhân viên
StaffRouter.get('/get-all-staffs', (req, res) => getAllStaffs(req, res));
StaffRouter.get('/get-staffs/:companyId', (req, res) => getStaffsByCompanyId(req, res));
StaffRouter.post('/insert-staff', (req, res) => insertStaff(req, res));   
StaffRouter.put('/update-staff/:id', (req, res) => updateStaff(req, res)); 
StaffRouter.post('/login', loginForStaff);

export default StaffRouter;