import { Report } from "../Model/Report.js";

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({}).exec();
    return res.status(200).json({
      result: 'SUCCESS',
      message: 'Đã lấy dữ liệu báo cáo thành công',
      data: reports
    });
  } catch (error) {
    res.status(500).send({
      result: "ERROR",
      message: `Lỗi server: ${error.message}`,
    });
  }
};

const getReportByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const reports = await Report.find({ id: userId });
    res.status(200).json({
      result: 'SUCCESS',
      message: `Đã lấy dữ liệu báo cáo với thành công`,
      data: reports
    });
  } catch (error) {
    res.status(500).send({
      result: "ERROR",
      message: `Lỗi server: ${error.message}`,
    });
  }
};

const insertReport = async (req, res) => {
  try {
    const { userId, postId, content } = req.body;
    const report = new Report({ userId, content, postId });
    await report.save();
    res.status(201).json({
      result: 'SUCCESS',
      message: 'Tạo báo cáo thành công',
      data: report
    });
  } catch (error) {
    res.status(500).send({
      result: "ERROR",
      message: `Lỗi server: ${error.message}`,
    });
  }
};

const updateReportStatus = async (req, res) => {
  try {
    const userId = req.params.rid;
    console.log(userId)
    const { status } = req.body;
    const report = await Report.findByIdAndUpdate(userId, { status }, { new: true });
    console.log(report)
    res.status(201).json({
      result: 'SUCCESS',
      message: 'Cập nhật báo cáo thành công',
      data: report
    });
  } catch (error) {
    res.status(500).send({
      result: "ERROR",
      message: `Lỗi server: ${error.message}`,
    });
  }
};

const deleteReportById = async (req, res) => {
  try {
    const reportId = req.params.reportId;
    await Report.deleteOne({ id: reportId });
    res.status(201).json({
      result: 'SUCCESS',
      message: `Xóa báo cáo thành công`,
    });
  } catch (error) {
    res.status(500).send({
      result: "ERROR",
      message: `Lỗi server: ${error.message}`,
    });
  }
};

async function getJobPostingsReport(req, res) {
    try {
        const totalJobPostings = await JobPosting.countDocuments();
        // Thêm các thống kê khác tùy theo yêu cầu
        res.json({ totalJobPostings });
    } catch (error) {
        console.error('Error generating job postings report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default {
    getJobPostingsReport,
    getAllReports, deleteReportById, insertReport, getReportByUserId, updateReportStatus
};

