import React, { useEffect, useState } from "react";
import Default from "../Layouts/Default";
import Breadcrumb from "../Util/StaticUtil/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllCategory } from "../../Store/jobCategorySlice";
import { getPostDetail } from "../../Store/jobPostSlice";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import HTMLReactParser from "html-react-parser";
import Cookies from 'js-cookie';

function JobOpportunitiesDetail(props) {
  const [showReportModal, setShowReportModal] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
	const user = JSON.parse(Cookies.get("user-profile"))
  const [isApplied, setIsApplied] = useState(false);

  console.log('user: ', user);
  const handleReportClick = () => {
    setShowReportModal(true); 
  };

  const handleCloseModal = () => {
    setShowReportModal(false);
  };

  const categoryJob = useSelector((state) => state.jobCategory.categoryArr);
  const postdetail = useSelector((state) => state.jobPost.postDetail);
  const dispatch = useDispatch();
  const param = useParams();
  const post_id = param['tieu-de-cong-viec'].split('=')[1];

  // console.log(param['tieu-de-cong-viec'].split('=')[1]);
  // console.log('line 32', postdetail);

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getPostDetail(param['tieu-de-cong-viec'].split('=')[1]))
  }, [dispatch])

  useEffect(() => {
    async function isApplied() {
      try {
        const res = await axios.post(`http://localhost:9999/api/apply-job/is-applied`, {
          userId: user._id,
          postId: post_id
        }).catch(err => { console.log(err); });
        if (res.data.result === 'SUCCESS') {
          setIsApplied(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    isApplied();
  }, [post_id])

  function handleClick() {
    const CVOpener = document.getElementById('cv-opener');
    CVOpener.click();
  }

  const onUpload = async () => {
    console.log(pdfFile);
    if (!pdfFile) {
      toast.error('Vui lòng chọn file CV');
      console.log('Vui lòng chọn file CV');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', pdfFile);

    try {
      const response = await axios.post('http://localhost:9999/api/apply-job/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(`postdetail.companyId._id: ${postdetail.companyId._id}`);
      console.log(response.data);
      if (response.data.result === 'SUCCESS') {
        const res = await axios.post('http://localhost:9999/api/apply-job/apply', {
          cv: response.data.data.filePath,
          postId: param['tieu-de-cong-viec'].split('=')[1],
          userId: user._id,
          companyId: postdetail.companyId._id
        });
        console.log(res.data);
      }
      setPdfFile(null); // Clear file selection
      setOpenModal(false);
      toast.success('Ứng tuyển thành công');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Default>
      <section id="section-header" className=" bg-blue-900 text-gray-200">
        <div className="pl-[9em] py-16">
          <Breadcrumb text1={"Trang chủ"} text2={"Cơ hội nghề nghiệp"} />
          <h2 className="text-[2em] font-semibold leading-7 py-3">
            Cơ hội nghề nghiệp
          </h2>
          <p className="text-[0.8em] font-thin">
            Tại Nodejs, chúng tôi không chỉ cung cấp công việc, chúng tôi tạo ra
            cơ hội nghề nghiệp
          </p>
        </div>
      </section>
      <section
        id="list-feature-jobs"
        className="grid lg:grid-cols-3 gap-9 sm:w-[509px] lg:w-[1166px] mx-auto mt-5 mb-5"
      >
         <div className='groupFilter hidden bg-red-250 row-span-2 md:hidden lg:block'>
                    <form>
                        <div className="mt-2">
                            {/* <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <span className="flex select-none items-center pl-3 text-black sm:text-sm"><CiSearch /></span>
                                <input type="text" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-8" placeholder="Tìm kiếm bài tuyển dụng" disabled={true}/>
                            </div> */}
                        </div>
                        <div className='mt-3'>
                            {/* <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-blue-900"><IoFilterCircleOutline size={20} className='inline-block' /> <span>Lĩnh vực</span></legend>
                                <div className="mt-6 space-y-3">

                                    {
                                        categoryJob && categoryJob.length !== 0 &&
                                        categoryJob?.map((category, index) => (
                                            <div className="relative flex gap-x-3" key={index}>
                                                <div className="flex h-6 items-center">
                                                    <input id={category.name} name={category._id} type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                                </div>
                                                <div className="text-sm leading-6">
                                                    <label htmlFor={category.name} className="font-medium text-gray-900">{category.name}</label>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </fieldset> */}
                        </div>
                        <div className='mt-6'>
                            {/* <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-blue-900"><RiMapPinUserLine size={20} className='inline-block' /> <span>Vị trí tuyển dụng</span></legend>
                                <div className="mt-6 space-y-3">
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input id="staffOperate" name="staffOperate" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="staffOperate" className="font-medium text-gray-900">Vị trí lãnh đạo</label>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input id="realEstate" name="realEstate" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="candidates" className="font-medium text-gray-900">Cần có kinh nghiệm</label>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input id="faas" name="faas" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="faas" className="font-medium text-gray-900">Người mới tốt nghiệp</label>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input id="faas" name="faas" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="faas" className="font-medium text-gray-900">Tuyển thực tập sinh</label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset> */}
                        </div>
                        <div className='mt-6'>
                            {/* <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-blue-900"><WiTime12 size={20} className='inline-block' /> <span>Thời gian</span></legend>
                                <div className="mt-6 space-y-3">
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input id="staffOperate" name="staffOperate" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="staffOperate" className="font-medium text-gray-900">Chọn tất cả</label>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input id="realEstate" name="realEstate" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="candidates" className="font-medium text-gray-900">Toàn thời gian</label>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input id="faas" name="faas" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="faas" className="font-medium text-gray-900">Bán thời gian</label>
                                        </div>
                                    </div>
                                </div>
                            </fieldset> */}
                        </div>
                        <div className='mt-6'>
                            {/* <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-blue-900"><MdOutlinePlace size={20} className='inline-block' /> <span>Địa điểm</span></legend>
                                <div className="mt-6 space-y-3">
                                    <div className="relative flex gap-x-3">
                                        <select id="country" name="country" autocomplete="country-name" className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Mexico</option>
                                        </select>
                                    </div>
                                </div>
                            </fieldset> */}
                        </div>
                    </form>
                </div>

        <div className="col-span-2">
          <div className="flex items-center space-x-4 ">
            <h3 className="text-[1.5em] mb-3 mr-4 text-blue-900 font-bold">
              {postdetail.title}
            </h3>
            <svg
              className="h-8 w-8 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>

            <button className="bg-orange-500 text-white px-4 py-2 rounded">
              Ứng tuyển
            </button>
          </div>
          <p className="text-gray-300 text-[0.9rem] mb-3">
            {/* Công ty cổ phần TMDV HGD */}
            {postdetail.companyId?.name}
          </p>
          <div className="job-details flex items-center space-x-6 border-b border-b-gray-700 mb-4">
            <p className="text-[0.9rem] mb-3">
              Lương:{" "}
              <b className="text-[1.5em] text-orange-500">{postdetail.salary === '' ? 'Thỏa thuận' : postdetail.salary}</b>
            </p>
            <p className="text-[0.9rem] mb-3">
              Ngày đăng: <b>{moment(postdetail.updatedAt).format('MM/DD/YYYY')}</b>
            </p>
            <p className="text-[0.9rem] mb-3">
              Hạn ứng tuyển: <b>{moment(postdetail.deadline).format('MM/DD/YYYY')}</b>
            </p>
            <p className="text-[0.9rem] mb-3">
              Địa điểm: <b>{postdetail.location}</b>
            </p>
          </div>

          <div className="flex space-x-8 border-b border-b-gray-700 mb-4">
            <div className="flex-1 py-4 ">
              <h2 className="text-[1.1em] font-semibold text-blue-900 mb-2">
                Yêu cầu:
              </h2>
              <ul className="list-disc pl-5">
                <li>{postdetail.candidateReq}</li>
                <li>Có bằng cử nhân kinh tế</li> */
                {/* <li>Thông thạo tiếng Anh</li>
              </ul>
            </div>

            <div className="flex-1 py-4 ">
              <h2 className="text-[1.1em] font-semibold text-blue-900 mb-2">
                Quyền lợi:
              </h2>
              <ul className="list-disc pl-5">
                {/* <li>6 năm kinh nghiệm vị trí quản lý</li> */}
                {/* <li>Có bằng cử nhân kinh tế</li> */}
                {/* <li>Thông thạo tiếng Anh</li> */}
              </ul>
            </div>
          </div>
          <div className="custom-section mb-4">
            <h2 className="text-[1.1em] font-semibold text-blue-900 mb-2">
              Số lượng:
            </h2>
            <p>1 người</p>
          </div>
          <div className="custom-section mb-4">
            <h2 className="text-[1.1em] font-semibold text-blue-900 mb-2">
              Vị trí làm việc:
            </h2>
            <p>Chuyên Viên Quản Lý Dự Án - Phòng Phát Triển Dự Án</p>
          </div>
          <div className="custom-section mb-5">
            <h2 className="text-[1.1em] font-semibold text-blue-900 mb-2">
              Hình thức:
            </h2>
            <p>Làm việc toàn thời gian tại công ty</p>
          </div>
          <div className="custom-section mb-4">
            <h2 className="text-[1.5em] font-semibold text-blue-900 mb-2">
              Mô tả công việc:
            </h2>
            {postdetail.jobDescription && HTMLReactParser(postdetail.jobDescription)}
          </div>

          <div className="flex space-x-4">
            {isApplied ? <button className="bg-gray-500 text-white px-4 py-3 rounded">
              Bạn đã ứng tuyển công việc này
            </button> : <button className="bg-orange-500 text-white px-4 py-3 rounded" onClick={() => setOpenModal(true)}>
              Ứng tuyển công việc
            </button>}
            <button className="bg-blue-900 text-white px-4 py-3 rounded">
              Quan tâm
            </button>
          </div>
          <div className="mt-2">
            <p>
              Tin tuyển dụng có vấn đề?{" "}

              <span className="text-red-500 font-bold" onClick={handleReportClick}>
                Báo cáo tin
              </span>
            </p>
          </div>
        </div>
        {showReportModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 mx-auto w-3/4">
            <h2 className="font-semibold mb-4 text-[2em]">Báo cáo tin tuyển dụng</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="issue" className="mb-2">
                Hãy báo cáo với chúng tôi nếu bạn thấy tin tuyển dụng có nội dung không phù hợp với nội quy.
                </label>
                <textarea
                  id="issue"
                  rows="4"
                  className="w-full px-3 py-2 border rounded-md mt-2"
                  placeholder="Nhập nội dung"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-blue-900 text-white px-4 py-3 rounded"
                >
                  Hủy bỏ
                </button>
                <button type="submit" className="bg-orange-500 text-white px-4 py-3 rounded ml-2">
                  Báo cáo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </section>

      {openModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white w-[500px] rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Tải lên CV của bạn</h2>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              id="cv-opener"
              className="hidden"
            />
            <div className="flex justify-between mt-4">
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded"
                onClick={handleClick}
              >
                Chọn CV
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={onUpload}
              >
                Ứng tuyển
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setOpenModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer/>
    </Default>
  );
}

export default JobOpportunitiesDetail;
