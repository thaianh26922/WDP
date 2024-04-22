import axios from "axios";
import { Company } from "../Model/Company.js";

/**
 * @des Hàm lấy tất cả các công ty
 * @author Duong Thanh Luan
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function getAllCompanies(req, res) {
    try {
        const companies = await Company.find({});
        // Kiểm tra số lượng công ty lớn hơn 0
        if (companies.length > 0) {
            return res.status(200).json({
                result: 'SUCCESS',
                message: 'SUCCESS - Đã trả về hết dữ liệu công ty',
                data: companies,
            });
        } else {
            return res.status(404).json({
                message: "FAIL - Chưa có công ty đăng kí"
            });
        }
    } catch (error) {
        res.status(500).json({
            result: "ERROR",
            message: 'ERROR - Đã xảy ra lỗi'
        });
    }
}

/**
 * @des Hàm thêm tài khoản và dữ liệu công ty trong màn hình
 * @author Duong Thanh Luan
 * @day 2024-01-25
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function insertCompany(req, res) {
    let id;
    try {
        const taxCode = req.body.taxCode;
        console.log(taxCode);
        const findedCompany = await Company.findOne({ taxCode });
        // Kiểm tra xem đã có công ty tồn tại mã số thuế hay chưa
        if (findedCompany) {
            return res.json({
                result: 'FAIL',
                message: "FAIL - Đã tồn tại công ty đăng kí"
            });
        } else {
            await axios.get(`https://api.vietqr.io/v2/business/${taxCode}`).then(res => { id = res.data }).catch(err => res.status(500).json({
                result: "ERROR",
                message: 'ERROR - Có lỗi xảy ra',
                error: err
            }));
        }
        // Kiểm tra dữ liệu API lấy từ mã số thuế là hợp lệ
        if (id.data !== null) {
            const { account, password, email, phone } = req.body;
            const newCompany = new Company({ account, password, email, phone, taxCode, location: id.data.address, name: id.data.name });
            await newCompany.save();
            const com = await Company.findById(newCompany._id);
            res.status(200).json({
                result: "SUCCESS",
                message: "SUCCESS - Thành công",
                data: com
            })
        } else {
            return res.status(404).json({
                result: "FAIL",
                message: "FAIL - Mã số thuế không xác định"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            result: "ERROR",
            message: "ERROR - Đã có lỗi xảy ra",
            err: error
        });
    }
}

/**
 * @des Hàm lấy dữ liệu của công ty từ id
 * @author Duong Thanh Luan
 * @day 2024-01-25
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function getCompanyById(req, res) {
    const { id } = req.params;
    try {
        const company = await Company.findById(id);
        // Kiểm tra xem công ty truy vấn có dữ liệu không
        if (company != null) {
            return res.status(200).json({
                result: 'SUCCESS',
                message: `SUCCES - Lấy công ty có id ${id} thành công`,
                data: company
            })
        } else {
            return res.status(404).json({
                result: 'FAIL',
                message: `FAIL - Không tồn tại công ty với id ${id}`
            })
        }
    } catch (error) {
        return res.status(500).json({
            result: 'ERROR',
            message: `ERROR - Đã có lỗi xảy ra`,
            error: error
        })
    }
};



async function followCompany(req, res) {
    try {
        const { userId, companyId } = req.body;
        const existingFollower = await Company.findOne({ userId, companyId });
        if (existingFollower) {
            return res.status(400).json({ error: 'User already follows this company' });
        }
        const newFollower = new Company({ userId, companyId });
        await newFollower.save();
        res.status(201).json(newFollower);
    } catch (error) {
        console.error('Error following company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function unfollowCompany(req, res) {
    try {
        const { id } = req.params;
        await Company.findByIdAndDelete(id);
        res.json({ message: 'Unfollowed company successfully' });
    } catch (error) {
        console.error('Error unfollowing company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function checkFollowedCompany(req, res) {
    try {
        const { companyId } = req.params;
        // Kiểm tra xem công ty có tồn tại trong cơ sở dữ liệu không
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        // Xử lý logic kiểm tra công ty đã theo dõi hay chưa (ở đây là một ví dụ đơn giản)
        const isFollowed = company.followers.includes(req.user.id); // Giả sử req.user.id là id của người dùng hiện tại
        res.json({ followed: isFollowed });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const updateCompanyStatus = async (req, res) => {
    try {
        const { companyId } = req.params;
        const { isActive } = req.body;

        const company = await Company.findByIdAndUpdate(companyId, { isActive }, { new: true });

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.status(200).json({
            status: 'success',
            data: {
                company
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

async function updateCompany(req, res) {
    try {
        const { id } = req.params;
        const { bio, phone, email, taxCode, location } = req.body;
        await Company.updateOne({ _id: id }, { bio, phone, email, taxCode, location });
        res.status(200).json({ message: 'Đã cập nhật thông tin công ty thành công' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Đã có lỗi xảy ra' });
    }
}

async function companyLogin(req, res) {
    const { email, password } = req.body;
    try {
        const company = await Company.findOne({ email, password }).exec();
        if (company != null) {
            res.status(200).json({
                result: 'SUCCESS',
                message: 'Đăng nhập thành công',
                data: company
            });
        } else {
            res.status(404).json({
                result: 'FAIL',
                message: 'Email hoặc mật khẩu không chính xác'
            });
        }
    } catch (error) {
        res.status(500).json({
            result: 'ERROR',
            message: 'Đã có lỗi xảy ra'
        });
    }
}

async function registerCompanyVIP(req, res) {
    try {
        const { id, vip } = req.body;
        try {
            if (vip === "LUX") {
                await Company.updateOne({ _id: id }, { vip: vip });
                res.status(200).json({
                    result: "SUCCESS",
                    message: 'Đã mua gói VIP LUX thành công'
                });
            } else if (vip === "NORMAL") {
                await Company.updateOne({ _id: id }, { vip: vip });
                res.status(200).json({
                    result: "SUCCESS",
                    message: 'Đã mua gói VIP NORMAL thành công'
                });
            }
        } catch (error) {
            res.status(500).json({
                result: 'ERROR',
                message: 'Đã có lỗi xảy ra' + error
            });
        }

    } catch (error) {

    }
}

export default { updateCompanyStatus,followCompany, unfollowCompany, getAllCompanies, insertCompany, getCompanyById, checkFollowedCompany, updateCompany, companyLogin, registerCompanyVIP };

