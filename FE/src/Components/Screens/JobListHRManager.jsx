import React, { useEffect, useState } from 'react';
import NoFooter from '../Layouts/NoFooter';
import Breadcrumb from '../Util/StaticUtil/Breadcrumb';
import HeaderV2 from '../Util/Header/HeaderV2';
import DashboardCustomer from '../Layouts/DashboardCustomer';
import { BiEdit } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';


function JobListHRManager(props) {
    const [togNavBar, setTogNavBar] = useState('Open');
    const [posts, setPosts] = useState([]);
    const [staff, setStaff] = useState(JSON.parse(sessionStorage.getItem('HRManager')));
    const [editingIndex, setEditingIndex] = useState(null);
    const nativigation = useNavigate();
    useEffect(() => {
        document.title = 'Danh sách công việc';
        async function getAllJobs() {
            try {
                const res = await axios.get(`http://localhost:9999/api/post/get-posts-by-company-id/${staff.companyId._id}`).catch(err => console.log(err));
                const data = res.data.data;
                setPosts(data);
            } catch (error) {
                console.log(error);
            }
        }
        getAllJobs();
    }, [])

    function updatePost(id) {
        nativigation(`/chinh-sua-bai-tuyen-dung/${id}`);
    }

    function deletePost(id) {
        axios.delete(`http://localhost:9999/api/post/delete-post-by-id/${id}`).then(res => {
            if (res.status === 200) {
                const newPosts = posts.filter(post => post._id !== id);
                setPosts(newPosts);
            }
        }).catch(err => console.log(err));
    }

    function formatDate(date) {
        const year = date.getFullYear();
        let month = String(date.getMonth() + 1); // Months start at 0
        month = month.padStart(2, '0'); // Add leading zero for single-digit months
        const day = String(date.getDate());
        day.padStart(2, '0'); // Add leading zero for single-digit days (optional)

        return `${day}/${month}/${year}`;
    }

    const handleEdit = async (postId, value) => {
        try {
            const res = await axios.put(`http://localhost:9999/api/post/accept-post`, {
                id: postId,
                statusPost: value,
            });

            console.log(res.data.status);
            if (res.data.status === "accepted") {
                window.alert('Cập nhật trạng thái bài viết hiển thị');
            } else if (res.data.status = "Pending") {
                window.alert('Cập nhật trạng thái bài viết chờ');
            } else {
                window.alert('Cập nhật trạng thái bài viết loại');
            }

            const ress = await axios.get(`http://localhost:9999/api/post/get-posts-by-company-id/${staff.companyId._id}`).catch(err => console.log(err));
            const data = ress.data.data;
            setPosts(data);
        } catch (error) {
            toast.error('Đã có lỗi xảy ra trong quá trình thay đổi trạng thái bài viết');
            console.error(error);
        }
    };

    function getColorForStatus(status) {
        switch (status) {
            case 'accepted':
                return 'green';
            case 'Pending':
                return 'yellow';
            case 'rejected':
                return 'red';
            default:
                return 'black'; // Màu mặc định nếu không có trạng thái nào khớp
        }
    }

    return (
        <DashboardCustomer roleCo={'Danh sách công ty'} setTogNavBar={setTogNavBar} togNavBar={togNavBar} useNavBarV2={true} >
            <HeaderV2 hrefType={'Xem bài viết'} />
            <section id='section-header' className=' bg-gradient-to-r from-[#4973CE] to-[#47BDE1] text-gray-200'>
                <div className='pl-[9em] py-16'>
                    <Breadcrumb text1={'Trang chủ'} text2={'Danh sách công việc'} />
                    <h2 className='text-[2em] font-semibold leading-7 py-3'>Danh sách công việc</h2>
                    <p className='text-[0.8em] font-thin'>Tại Nodejs, chúng tôi không chỉ cung cấp công việc, chúng tôi tạo ra cơ hội nghề nghiệp</p>
                </div>
            </section>
            <section id='list-feature-jobs' className='grid lg:grid-cols-1 gap-9 sm:w-[509px] lg:w-[1290px] mx-auto mt-5 mb-5'>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {/* <Link to={'/tao-bai-tuyen-dung'}><div className='text-end my-2  '><button className='p-2 rounded-sm text-white bg-orange-600'>Tạo bài tuyển dụng</button></div></Link> */}
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-white uppercase bg-gradient-to-r from-[#4973CE] to-[#47BDE1]">
                            <tr>
                                <th scope="col" class="px-3 py-3 text-center">
                                    Tên
                                </th>
                                <th scope='col' className='px-3 py-3'>
                                    <div class="flex items-center">
                                        Lương
                                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope='col' className='px-3 py-3'>
                                    <div class="flex items-center">
                                        Trạng thái
                                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope='col' className='px-3 py-3'>
                                    Hạn ứng tuyển
                                </th>
                                <th scope='col' className='px-3 py-3'>
                                    Địa điểm
                                </th>
                                <th scope="col" class="px-3 py-3">
                                    Quản lý
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts && posts.map((post, index) => (
                                    <tr className="bg-white border-b border-gray-200" key={post._id}>
                                        <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {post.title}
                                        </th>
                                        <td className="px-3 py-4">
                                            {post.salary === '' ? 'Thỏa thuận' : post.salary}
                                        </td>
                                        <td className="px-3 py-4cursor-pointer" onClick={() => setEditingIndex(index)}
                                            style={{ color: getColorForStatus(post.status) }}>

                                            {editingIndex === index ? (
                                                <select
                                                    onChange={(e) => handleEdit(post._id, e.target.value)}
                                                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                                                >
                                                    <option value='accepted' style={{ color: "green" }} selected={post.status === 'accepted'}>Accepted</option>
                                                    <option value='Pending' style={{ color: "yellow" }} selected={post.status === 'Pending'}>Pending</option>
                                                    <option value="rejected" style={{ color: "red" }} selected={post.status === 'rejected'}>Rejected</option>
                                                </select>
                                            ) : (
                                                post.status
                                            )}
                                        </td>
                                        <td class="px-3 py-4">
                                            {formatDate(new Date(post.deadline))}
                                        </td>
                                        <td className="px-3 py-4">
                                            {post.location}
                                        </td>
                                        <td className="px-3 py-4 flex gap-x-3 justify-center">
                                            <MdOutlineRemoveRedEye size={20} color='#1c2551' className='cursor-pointer' onClick={() => updatePost(post._id)} />
                                            <IoCheckmarkDoneCircle size={20} color='#d63434' className='cursor-pointer posts' onClick={() => deletePost(post._id)} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </section>
        </DashboardCustomer>
    );
}

export default JobListHRManager;