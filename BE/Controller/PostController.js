import { searchByKeyword } from "../DAO/Search.js";
import { Company } from "../Model/Company.js";
import { Post } from "../Model/Post.js";
import { User } from "../Model/User.js";



async function getAllPosts(req, res) {
    try {
        const { userId } = req.body;
        const posts = await Post.find({status: 'Accepted'}).populate('jobCategory', '_id').populate('companyId').exec();
        if (posts) {
            const postsWithFollowInfo = await Promise.all(posts.map(async (post) => {
                const isFollowed = await User.exists({ _id: userId, savedPost: post._id }) ? true : false;
                return { ...post.toObject(), isFollowed };
            }));

            postsWithFollowInfo.sort((a, b) => {
                return b.priority - a.priority;
            });

            res.status(200).json({
                result: "SUCCESS",
                message: "Danh sách bài viết",
                data: postsWithFollowInfo
            });
        }
    } catch (error) {
        res.status(500).send({
            result: 'ERROR',
            message: 'Đã có lỗi xảy ra! Vui lòng thử lại sau!',
            err: error.message
        });
    }
}



async function insertPost(req, res) {
    try {
        const { HRId, companyId, title, jobDescription, jobCategory, salary, candidateReq, location, deadline } = req.body;
        let priority = false;
        const company = await Company.findById(companyId).exec();
        if(company && company.vip){
            priority = true;
        }
        const newPost = new Post(
            {
                HRId,
                companyId,
                title,
                jobCategory,
                jobDescription,
                salary,
                candidateReq,
                location,
                deadline,
                priority
            }
        );
        await newPost.save();
        res.status(201).json({
            result: 'SUCCESS',
            message: 'Bài viết được thêm vào thành công',
            data: newPost,
        });
    } catch (error) {
        res.status(500).send({
            result: 'ERROR',
            message: 'Đã có lỗi xảy ra! Vui lòng thử lại sau!',
            err: error.message
        });
    }
}




async function getPostById(req, res) {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        const post = await Post.findById(id).populate("companyId");
        if (!post) {
            res.status(404).json({
                message: "Post is not found!"
            });
        } else {
            const isFollowed = await User.exists({ _id: userId, savedPost: post._id });
            res.status(200).json({
                result: "SUCCESS",
                message: "Bài viết với tiêu đề '" + post.title + "' is available!",
                data: { ...post.toObject(), isFollowed }
            });
        }
    } catch (error) {
        res.status(500).send({
            result: 'ERROR',
            message: 'Đã có lỗi xảy ra! Vui lòng thử lại sau!',
            err: error.message
        });
    }
}

async function updatePost(req, res) {
    const postId = req.params.id;
    console.log(postId);
    console.log(req.body);
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Cannot find post with id '" + postId + "'",
            });
        }

        // Cập nhật thông tin bài viết
        post.title = req.body.title;
        post.jobDescription = req.body.jobDescription;
        post.salary = req.body.salary;
        post.candidateReq = req.body.candidateReq;
        post.location = req.body.location;
        post.deadline = req.body.deadline;

        // Lưu thay đổi vào cơ sở dữ liệu
        await post.save();

        // Trả về phản hồi thành công
        res.status(200).json({
            message: "Update Post Successfully!",
            data: post
        });
    } catch (error) {
        console.error('Error updating post:', error); // Log lỗi để dễ dàng phát hiện
        res.status(500).json({
            result: 'ERROR',
            message: 'Đã có lỗi xảy ra! Vui lòng thử lại sau!',
            err: error.message
        });
    }
}


async function getPostsByTitle(req, res) {
    const { title } = req.params;
    const { userId } = req.body;
    try {
        const posts = await Post.find().exec();
        if (posts) {
            const findedPost = posts.filter(post => post.title.toLowerCase().includes(title.toLowerCase()));
            const postsWithFollowInfo = await Promise.all(findedPost.map(async (post) => {
                const isFollowed = await User.exists({ _id: userId, savedPost: post._id }) ? true : false;
                return { ...post.toObject(), isFollowed };
            }));
            return res.status(200).json({
                result: "SUCCESS",
                message: "Đã tìm kiếm thành công bài viết có chứa từ khóa '" + title + "'",
                data: postsWithFollowInfo
            });
        }
    } catch (error) {
        res.status(500).send({
            result: 'ERROR',
            message: 'Đã có lỗi xảy ra! Vui lòng thử lại sau!',
            err: error.message
        });
    }
}

async function searchPostsByKeyword(req, res) {
    const { userId } = req.body;
    const keyword = req.params.keyword;
    let returnData = [];
    let sortedData = [];
    try {
        const listData = await searchByKeyword(keyword);
        if (listData.length === 0) {
            res.status(404).json({
                result: "NOT FOUND",
                message: "Không tìm thấy bài viết có từ khóa '" + keyword + "'"
            });
        }
        else {
            sortedData = listData.sort((a, b) => {
                return b.priority - a.priority;
            });

            sortedData.forEach(data => {
                if (data) {
                    returnData.push(data.post);
                }
            });

        }

        const postsWithFollowInfo = await Promise.all(returnData.map(async (post) => {
            const isFollowed = await User.exists({ _id: userId, savedPost: post._id }) ? true : false;
            return { ...post.toObject(), isFollowed };
        }));
        res.status(200).json({
            result: "SUCCESS",
            message: "Danh sách bài viết có từ khóa '" + keyword + "'",
            data: postsWithFollowInfo
        });
    } catch (error) {
        console.log(error);
    }
}

async function changePostStatus(req, res) {
    try {
        const { id, statusPost } = req.body;
        console.log(id, statusPost);
        const post = await Post.findOne({ _id: id }).exec();
        if (!post) {
            return res.status(404).json({
                message: "Không thể tìm được bài viết với id '" + id + "'",
            });
        }
        post.status = statusPost;
        await post.save();
        res.status(201).json({
            message: "Đã cập nhật trạng thái thành công cho bài viết!",
            data: post,
            status: statusPost
        });
    } catch (error) {
        res.status(500).json({
            result: 'ERROR',
            message: 'Đã có lỗi xảy ra! Vui lòng thử lại sau!',
            err: error.message
        });
    }
}


async function getPostsByCompanyId(req, res) {
    const { companyId } = req.params;
    try {
        const posts = await Post.find({ companyId: companyId }).populate("companyId").exec();
        if (posts) {
            res.status(200).json({
                result: "SUCCESS",
                message: "Danh sách bài viết của công ty có id '" + companyId + "'",
                data: posts
            });
        }
    } catch (error) {
        res.status(500).send({
            result: 'ERROR',
            message: 'Đã có lỗi xảy ra! Vui lòng thử lại sau!',
            err: error.message
        });
    }
}

async function deletePostById(req, res) {
    try {
        const { postId } = req.params;
        const post = await Post.findOneAndDelete({ _id: postId }).exec();
        if (post) {
            res.status(200).json({
                result: "SUCCESS",
                message: "Đã xóa bài viết thành công",
                data: post
            });
        } else {
            res.status(404).json({
                result: "FAIL",
                message: "Không tìm thấy bài viết có id '" + postId + "'"
            });
        }
    } catch (error) {
        res.status(500).json({
            result: "ERROR",
            message: "Đã có lỗi xảy ra",
            err: error.message
        });
    }
}

export default { getPostsByCompanyId, getAllPosts, getPostById, insertPost, updatePost, getPostsByTitle, searchPostsByKeyword, changePostStatus, deletePostById }