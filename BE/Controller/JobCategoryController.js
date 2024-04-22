import JobCategory from "../Model/JobCategory.js";

async function insertJobCategory(req, res) {
    try {
        const { name, avatar } = req.body;
        const newJobCategory = new JobCategory({
            name,
            avatar
        });
        await newJobCategory.save();
        res.status(201).json({
            result: 'SUCCESS',
            message: 'Đã thêm danh mục công việc thành công',
            data: newJobCategory
        });
    } catch (error) {
        res.status(500).json({
            result: 'ERROR',
            message: 'Đã có lỗi xảy ra',
            error: error
        });
    }
}

async function getAllCategories(req, res){
    try {
        const jobCategories = await JobCategory.find().exec();
        res.status(200).json({
            result: 'SUCCESS',
            message: 'Lấy danh sách danh mục công việc thành công',
            data: jobCategories
        });
    } catch (error) {
        res.status(500).json({
            result: 'ERROR',
            message: 'Đã có lỗi xảy ra',
            error: error
        });
    }
}

//Thêm loại công việc
async function addJobType(req, res) {
    try {
      const { name, avatar, description } = req.body;
      const jobType = new JobCategory({ name, avatar,description });
      await jobType.save();
      res.status(201).json({ message: 'Loại công việc đã được thêm thành công' });
    } catch (error) {
      res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm loại công việc' });
    }
};

export default {insertJobCategory, getAllCategories, addJobType};