import { mail } from "../MailService/MailService.js";
import { ApplyJob } from "../Model/ApplyJob.js";
import { User } from "../Model/User.js";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { Post } from "../Model/Post.js";
import { Company } from "../Model/Company.js";

/**
 * @description register user
 * @created 2024-01-18
 * @author Duong Thanh Luan
 * @param {*} req 
 * @param {*} res 
 */
const insertUser = async (req, res) => {
    try {
        const now = new Date();
        // check username is exist
        const user = await User.findOne({ email: req.body.email });
        // if username is not exist
        if (!user) {
            const { username, password, phone, email } = req.body;
            const newUser = new User({
                username,
                password,
                phone,
                email,
                created_at: now,
            });

            await newUser.save();
            res.status(201).json({
                result: 'SUCCESS',
                message: 'Đăng ký thành công',
                data: newUser,
            });
        } else {
            res.status(400).send({
                result: "FAIL",
                message: 'Tên đăng nhập đã tồn tại',
            });
        }


    } catch (error) {
        res.status(500).send({
            result: 'ERROR',
            message: 'Đã có lỗi xảy ra',
            err: error.message
        });
    }

};

async function isCompanyExist(user, companyId) {
    const companies = user.followCompany;
    for (let company of companies) {
        if (company.toString() === companyId.toString()) {
            return true;
        }
    }
    return false;
}

/**
 * @description Update user through id
 * @created 2024-01-18
 * @author Duong Thanh Luan
 * @param {*} req 
 * @param {*} res 
 */
const updateUser = async (req, res) => {
    const userID = req.params.id;
    try {
        let user = await User.findById(userID).select('-password');;
        if (!user) {
            res.status(404).send({
                result: 'FAIL',
                message: `FAIL - Không có người dùng với id ${userID}`,
            });
        } else {
            const { password, email, phone, avatar, bio } = req.body;

            await User.updateOne({ _id: userID }, { password, email, phone, avatar, bio }).exec();
            return res.status(200).json({
                data: user,
                message: 'SUCCESS - Đã cập nhật người dùng ' + userID + ' thành công',
            })

        }
    } catch (error) {
        res.status(500).send({
            result: 'ERROR',
            message: 'ERROR - Đã có lỗi xảy ra',
            err: error.message
        });
    }
};

/**
 * @des Gửi mã code cho người dùng thông qua email
 * @author Dương Thành Luân
 * @date 2024-01-26
 * @param {*} user 
 */
async function sendEmail(user) {
    const code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    mail(user, "BestCV - Cấp mã xác nhận", code);
    return code;
}

/**
 * @description Xử lí quên mật khẩu
 * @created 2024-01-18
 * @author Duong Thanh Luan
 * @param {*} req 
 * @param {*} res 
 */
const forgotPassword = async (req, res) => {
    const email = req.body.email;
    try {
        const findedUser = await User.findOne({ email });
        if (!findedUser) {
            res.status(404).send({
                result: 'FAIL',
                message: 'Email không tồn tại trong hệ thống',
            });
        } else {
            const code = await sendEmail(findedUser);
            if (code) {
                res.status(200).json({
                    result: 'SUCCESS',
                    code: code,
                    message: 'Đã gửi email với mã lấy lại mật khẩu. Vui lòng kiểm tra email của bạn'
                });
            } else {
                res.status(400).json({
                    result: 'FAIL',
                    message: 'Đã xảy ra lỗi trong quá trình gửi mã cập nhật mật khẩu'
                });
            }
        }
    } catch (error) {
        res.status(500).send({
            result: 'ERROR',
            message: 'ERROR - Đã có lỗi xảy ra',

        });
    }
};


/**
 * @description đăng nhập vào hệ thống 
 * @created 2024-01-18
 * @author Duong Thanh Luan
 * @param {*} req 
 * @param {*} res 
 */
const loginUser = async (req, res) => {
    const email = req.body.email;
    const uPassword = req.body.password;
    const user = await User.findOne({ email });

    if (user) {
        const authenticatedUser = await User.findOne({ email: email, password: uPassword });
        if (authenticatedUser) {
            const { password, ...otherProperties } = authenticatedUser.toObject();
            console.log(otherProperties);
            const returnUser = { ...otherProperties };

            const token = jwt.sign({
                result: 'SUCCESS',
                message: "Đăng nhập thành công",
                user: authenticatedUser,
            }, "ACCESS_TOKEN_SECRET", {
                expiresIn: "100 days",
            });
            res.status(200).json({
                result: 'SUCCESS',
                message: "Đăng nhập thành công",
                user: returnUser,
                accessToken: token
            });
        } else {
            res.status(400).json({
                result: 'FAIL',
                message: "Sai mật khẩu",
                user: null
            });
        }
    } else {
        return res.status(404).json({
            result: 'FAIL',
            message: "Sai tài khoản"
        });
    }
};


/**
 * @author Dương Thành Luân
 * @description Cho người dùng đăng kí công việc
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const applyJob = async (req, res) => {
    const { userId, postId } = req.body;
    try {
        if (userId && postId) {
            const apply = new ApplyJob({
                userId,
                postId
            });
            await apply.save();
            return res.status(200).json({
                result: 'SUCCESS',
                message: 'Đã apply thành công'
            });
        } else {
            return res.status(400).json({
                result: 'FAIL',
                message: 'Thiếu thông tin apply'
            });
        }
    } catch (error) {
        return res.status(500).json({
            result: 'ERROR',
            message: 'Đã có lỗi xảy ra ' + error.message
        });
    }
}

/**
 * @author LuanDT7
 * @date 2024-02-04
 * @description Hàm theo dõi công ty
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function unfollowPost(req, res) {
    const { savedPost } = req.body;
    const { userId } = req.params;
    console.log(savedPost);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                result: 'FAIL',
                message: 'FAIL - Không có người dùng với id ' + userId
            });
        }
        // Tìm vị trí của bài viết đã lưu trong mảng savedPost của người dùng
        const index = user.savedPost.indexOf(savedPost._id);
        if (index === -1) {
            return res.status(400).json({
                result: 'FAIL',
                message: 'FAIL - Bài viết không tồn tại trong danh sách đã lưu của người dùng'
            });
        }
        // Xóa bài viết đã lưu khỏi mảng savedPost của người dùng
        user.savedPost.splice(index, 1);
        // Lưu lại thông tin người dùng đã cập nhật
        await user.save();
        return res.status(200).json({
            result: 'SUCCESS',
            message: 'SUCCESS - Đã bỏ theo dõi bài viết thành công'
        });
    } catch (error) {
        return res.status(500).json({
            result: 'ERROR',
            message: 'ERROR - Đã có lỗi xảy ra ' + error.message
        });
    }
}


async function followPost(req, res) {
    const { savedPost } = req.body;
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                result: 'FAIL',
                message: 'FAIL - Không có người dùng với id ' + userId
            });
        }
        const newFollowPost = [...user.savedPost, savedPost];
        await User.updateOne({ _id: userId }, { savedPost: newFollowPost }).exec();
        return res.status(200).json({
            result: 'SUCCESS',
            message: 'SUCCESS - Đã theo dõi bài viết thành công'
        });
    } catch (error) {
        return res.status(500).json({
            result: 'ERROR',
            message: 'ERROR - Đã có lỗi xảy ra ' + error.message
        });
    }

}

async function unfollowCompany(req, res) {
    const { followCompany } = req.body;
    const { userId } = req.params;
    console.log(followCompany);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                result: 'FAIL',
                message: 'FAIL - Không có người dùng với id ' + userId
            });
        }
        // Tìm vị trí của bài viết đã lưu trong mảng savedPost của người dùng
        const index = user.followCompany.indexOf(followCompany._id);
        if (index === -1) {
            return res.status(400).json({
                result: 'FAIL',
                message: 'FAIL - Bài viêt về công ty không tồn tại trong danh sách đã lưu của người dùng'
            });
        }
        // Xóa bài viết đã lưu khỏi mảng savedPost của người dùng
        user.followCompany.splice(index, 1);
        // Lưu lại thông tin người dùng đã cập nhật
        await user.save();
        return res.status(200).json({
            result: 'SUCCESS',
            message: 'SUCCESS - Đã bỏ theo dõi Bài viêt về công ty thành công'
        });
    } catch (error) {
        return res.status(500).json({
            result: 'ERROR',
            message: 'ERROR - Đã có lỗi xảy ra ' + error.message
        });
    }
}

async function followCompany(req, res) {
    const { followCompany } = req.body;
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                result: 'FAIL',
                message: 'FAIL - Không có người dùng với id ' + userId
            });
        }
        const newFollowCompany = [...user.followCompany, followCompany];
        await User.updateOne({ _id: userId }, { followCompany: newFollowCompany }).exec();
        return res.status(200).json({
            result: 'SUCCESS',
            message: 'SUCCESS - Đã theo dõi Bài viêt về công ty thành công'
        });
    } catch (error) {
        return res.status(500).json({
            result: 'ERROR',
            message: 'ERROR - Đã có lỗi xảy ra ' + error.message
        });
    }
};

async function updatePasswordByUsername(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({
                result: 'FAIL',
                message: 'FAIL - Không có người dùng với email ' + email
            });
        } else {
            const newUser = await User.findOneAndUpdate({ email }, { password }, { new: true }).exec();
            return res.status(200).json({
                result: 'SUCCESS',
                message: 'SUCCESS - Đã cập nhật mật khẩu thành công',
                data: newUser
            });
        }
    } catch (error) {
        return res.status(500).json({
            result: 'ERROR',
            message: 'ERROR - Đã có lỗi xảy ra ' + error.message
        });
    }

}

async function getAllPostFollowed(req, res) {
    try {
        const { userId } = req.params;
        let postFound = [];
        const { savedPost } = await User.findOne({ _id: userId }).select('savedPost');
        if (savedPost && savedPost.length !== 0) {
            postFound = await Post.find({ _id: { $in: savedPost } }).populate('companyId').exec();
        }
        // console.log(postFound);

        res.status(200).json({
            result: "SUCCESS",
            message: "Danh sách bài viết bạn đã theo dõi của người dùng",
            data: postFound
        });

    } catch (error) {
        res.status(500).send({
            result: 'ERROR',
            message: 'Đã có lỗi xảy ra! Vui lòng thử lại sau!',
            err: error.message
        });
    }

}

async function getAllCompanyFollowed(req, res) {
    try {
        const { userId } = req.params;
        let postCompanyFound = [];
        const { followCompany } = await User.findOne({ _id: userId }).select('followCompany');
        if (followCompany && followCompany.length !== 0) {
            postCompanyFound = await Company.find({ _id: { $in: followCompany } });
        }
        // console.log(postCompanyFound);

        res.status(200).json({
            result: "SUCCESS",
            message: "Danh sách công ty bạn đã theo dõi của người dùng",
            data: postCompanyFound
        });

    } catch (error) {
        res.status(500).send({
            result: 'ERROR',
            message: 'Đã có lỗi xảy ra! Vui lòng thử lại sau!',
            err: error.message
        });
    }
}
export { insertUser, updateUser, forgotPassword, loginUser, applyJob, updatePasswordByUsername, followPost, unfollowPost, followCompany, unfollowCompany, getAllPostFollowed, getAllCompanyFollowed }