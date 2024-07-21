import React, { useEffect, useRef, useState } from 'react';
import NoFooter from '../Layouts/NoFooter';
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import DescriptionPost from '../Util/ReactQuills/DescriptionPost';
import CustomToolBarInline from '../Util/ReactQuills/RequirePost';
import '../../Styles/richEditorPost.css';
import 'react-calendar/dist/Calendar.css';
import TitlePost from '../Util/ReactQuills/TitlePost';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Breadcrumb from '../Util/StaticUtil/Breadcrumb';
import ProvinceDropdown from '../Util/Modal/ProvinceDropdown';
import { useNavigate } from "react-router-dom"

function EditPostHR(props) {
    const navigate = useNavigate();

    const { pid } = useParams();
    const [post, setPost] = useState({});
    const [desc, setDesc] = useState('');
    const [reqText, setReqText] = useState('<ul><li>Thêm dòng ...</li></ul>');
    const [benText, setBenText] = useState('<ul><li>Thêm dòng ...</li></ul>');
    const [candidateReq, setCandidateReq] = useState('');
    const [title, setTitle] = useState('');
    const [nameCo, setnameCo] = useState('');
    const [dateState, setDateState] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [salary, setSalary] = useState('');
    const [deadline, setDeadline] = useState('');
    const [jobCategory, setJobCategory] = useState('');
    const [category, setCategory] = useState([]);
    const staff = JSON.parse(sessionStorage.getItem('staff'));

    useEffect(() => {
        document.title = 'Chỉnh sửa công việc';
        async function getPostById() {
            try {
                const res = await axios.get('http://localhost:9999/api/post/get-post-by-id/' + pid);
                const postData = res.data.data;
                setPost(postData);
                setTitle(postData.title);
                setnameCo(postData.name);
                setSalary(postData.salary);
                setDeadline(postData.deadline);
                setSearchTerm(postData.location);
                setCandidateReq(postData.candidateReq);
                setDesc(postData.jobDescription);
            } catch (error) {
                console.log(error);
            }
        }
        getPostById();
    }, [pid]);

    useEffect(() => {
        async function fetchCategory() {
            try {
                const res = await axios.get('http://localhost:9999/api/job-category/get-all-categories');
                const categories = res.data.data;
                setCategory(categories);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategory();
    }, []);

    async function handlePost(e) {
        e.preventDefault();
        try {
            const updatedPost = {
                title,
                name: nameCo,
                salary,
                deadline,
                location: searchTerm,
                candidateReq,
                jobDescription: desc,
                category: jobCategory,
            };
            await axios.put(`http://localhost:9999/api/post/update/${pid}`, updatedPost);
            navigate('/danh-sach-cong-viec')
            toast.success('Cập nhật bài viết thành công');
        } catch (err) {
            toast.error('Đã có lỗi xảy ra khi cập nhật bài viết');
        }
    }
    

    return (
        <NoFooter type={2}>
            <section id='section-header' className=' bg-gradient-to-r from-[#4973CE] to-[#47BDE1] text-gray-200'>
                <div className='pl-[9em] py-16'>
                    <Breadcrumb text1={'Trang chủ'} text2={'Danh sách công việc'} text3={'Tạo mới công việc'} />
                    <h2 className='text-[2em] font-semibold leading-7 py-3'>Chỉnh sửa công việc</h2>
                    <p className='text-[0.8em] font-thin'>Tại Nodejs, chúng tôi không chỉ cung cấp công việc, chúng tôi tạo ra cơ hội nghề nghiệp</p>
                </div>
            </section>
            <section className='grid lg:grid-cols-3 gap-4 sm:w-[509px] lg:w-[1386px] mx-auto mt-5 mb-5'>
                <div className='col-span-2'>
                    <div className='tooltipABC flex justify-center gap-x-5'>
                        <div className="tooltipItem relative">
                            <input type="radio" name="toolEdit" id="edit" className="h-2 w-4 rounded-full border-2 border-solid border-neutral-300" checked />
                            <span className='absolute bg-[#1F2F65] text-white text-[0.7em] rounded-sm p-2 min-w-max top-[2.5em] left-[-4.9em]'>Trang tạo bài viết</span>
                        </div>
                        <div className='tooltipItem relative'>
                            <input type="radio" name="toolEdit" id="preview" className="h-2 w-4 rounded-full border-2 border-solid border-neutral-300" />
                            <span className='absolute bg-[#1F2F65] text-white text-[0.7em] rounded-sm p-2 min-w-max top-[2.5em] left-[-4.8em]'>Trang xem trước bài viết</span>
                        </div>
                    </div>
                    <form onSubmit={handlePost}>
                        <div className='titlePost text-[#1F2F65] font-semibold'>
                            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full h-[3rem] border-gray-300 text-2xl outline-none' placeholder='Nhập tiêu đề bài viết' id='title' />
                        </div>
                        <div className='nameCo text-[#A7ACB1] font-semibold'>
                            <input type='text' value={nameCo} onChange={(e) => setnameCo(e.target.value)} className='w-full h-[3rem] border-gray-300 text-2xl outline-none' placeholder='Nhập tên công ty' id='nameCo' />
                        </div>
                        <div className='grid lg:grid-cols-3 gap-4 py-3 border-b-2 border-gray-300'>
                            <div className='flex gap-x-4'>
                                <label htmlFor="salary" className='text-[#7b839b] leading-[3.5rem] cursor-pointer'>Lương: </label>
                                <div className='flex align-items-center'>
                                    <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className='w-[10rem] h-[2.5rem] border-b-2 border-solid border-gray-300 rounded-md pl-2' placeholder='Thỏa thuận' id='salary' />
                                </div>
                            </div>
                            <div className='flex gap-x-4'>
                                <label htmlFor="dealine" className='text-[#7b839b] leading-[3.5rem] cursor-pointer'>Hạn ứng tuyển: </label>
                                <div className='flex align-items-center'>
                                    <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className='w-[10rem] h-[2.5rem] border-b-2 border-solid border-gray-300 rounded-md pl-2' required placeholder='Hạn ứng tuyển' id='deadline' />
                                </div>
                            </div>
                            <div className='flex gap-x-4'>
                                <label htmlFor="location" className='text-[#7b839b] leading-[3.5rem] cursor-pointer'>Địa điểm: </label>
                                <div className="dropdown-content mt-2 relative">
                                    <ProvinceDropdown searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-x-4'>
                            <label htmlFor="location" className='text-[#7b839b] leading-[3.5rem] cursor-pointer'>Ngành: </label>
                            <div className="dropdown-content mt-3 relative flex align-items-center flex-col">
                                <select id='job-category' value={jobCategory} onChange={(e) => setJobCategory(e.target.value)}>
                                    {category && category.map((item, index) => (
                                        <option key={index} value={item._id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='reqPost pt-4'>
                            <h2 className='text-[#A7ACB1] font-semibold'>Yêu cầu ứng viên</h2>
                            <DescriptionPost content={candidateReq} setContent={setCandidateReq} />
                        </div>
                        <div className='descPost pt-4'>
                            <h2 className='text-[#A7ACB1] font-semibold'>Mô tả công việc</h2>
                            <DescriptionPost content={desc} setContent={setDesc} />
                        </div>
                        <div className='flex justify-end'>
                            <button type="submit" className='text-[#1F2F65] font-semibold text-lg px-6 py-3 bg-[#F2F2F2] rounded-md hover:bg-[#E0E0E0]'>Lưu</button>
                        </div>
                    </form>
                </div>
                
            </section>
        </NoFooter>
    );
}

export default EditPostHR;
