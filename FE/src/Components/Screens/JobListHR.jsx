import React, { useEffect, useState } from 'react';
import NoFooter from '../Layouts/NoFooter';
import Breadcrumb from '../Util/StaticUtil/Breadcrumb';
import { BiEdit } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoFilter } from "react-icons/io5"; // Thêm biểu tượng lọc
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function JobListHR(props) {
    const [posts, setPosts] = useState([]);
    const [staff, setStaff] = useState(JSON.parse(sessionStorage.getItem('staff')));
    const [search, setSearch] = useState('');
    const [filterByDate, setFilterByDate] = useState(false);
    const [filterByLocation, setFilterByLocation] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);
    const navigate = useNavigate();

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
    }, [staff]);

    function updatePost(id) {
        navigate(`/chinh-sua-bai-tuyen-dung/${id}`);
    }

    function deletePost(id) {
        axios.delete(`http://localhost:9999/api/post/delete-post-by-id/${id}`).then(res => {
            if (res.status === 200) {
                const newPosts = posts.filter(post => post._id !== id);
                setPosts(newPosts);
                setShowConfirmModal(false);
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

    function filterPosts() {
        return posts
            .filter(post => {
                const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
                const matchesDateFilter = filterByDate ? new Date(post.deadline) >= new Date() : true;
                const matchesLocationFilter = filterByLocation ? post.location.includes("Hà Nội") : true;
                return matchesSearch && matchesDateFilter && matchesLocationFilter;
            });
    }

    function handleLocationFilter() {
        setFilterByLocation(prevState => !prevState);
    }

    function handleDeleteClick(id) {
        setPostIdToDelete(id);
        setShowConfirmModal(true);
    }

    function handleConfirmDelete() {
        if (postIdToDelete) {
            deletePost(postIdToDelete);
        }
    }

    return (
        <NoFooter type={2}>
            <section id='section-header' className='bg-gradient-to-r from-[#4973CE] to-[#47BDE1] text-gray-200'>
                <div className='pl-[9em] py-16'>
                    <Breadcrumb text1={'Trang chủ'} text2={'Danh sách công việc'} />
                    <h2 className='text-[2em] font-semibold leading-7 py-3'>Danh sách công việc</h2>
                    <p className='text-[0.8em] font-thin'>Tại Nodejs, chúng tôi không chỉ cung cấp công việc, chúng tôi tạo ra cơ hội nghề nghiệp</p>
                </div>
            </section>
            <section id='list-feature-jobs' className='grid lg:grid-cols-1 gap-9 sm:w-[509px] lg:w-[1290px] mx-auto mt-5 mb-5'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className='flex justify-between mb-4'>
                        <Link to={'/tao-bai-tuyen-dung'}>
                            <button className='p-2 rounded-sm text-white bg-orange-600'>Tạo bài tuyển dụng</button>
                        </Link>
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên"
                            className="p-2 border border-gray-300 rounded"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-gradient-to-r from-[#4973CE] to-[#47BDE1]">
                            <tr>
                                <th scope="col" className="px-3 py-3 text-center">Tên</th>
                                <th scope='col' className='px-3 py-3'>
                                    <div className="flex items-center">
                                        Lương
                                    </div>
                                </th>
                                <th scope='col' className='px-3 py-3'>
                                    <div className="flex items-center">
                                        Trạng thái
                                    </div>
                                </th>
                                <th scope='col' className='px-3 py-3'>
                                    <div className="flex items-center">
                                        Hạn ứng tuyển
                                        <a href="#"><IoFilter size={20} color='#1c2551' className='inline' /></a>
                                    </div>
                                </th>
                                <th scope='col' className='px-3 py-3'>
                                    <div className="flex items-center">
                                        Địa điểm
                                        <a href="#" onClick={handleLocationFilter}>
                                            <IoFilter size={20} color='#1c2551' className='inline' />
                                        </a>
                                    </div>
                                </th>
                                <th scope="col" className="px-3 py-3 text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterPosts().map(post => (
                                <tr key={post._id} className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-3 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {post.title}
                                    </th>
                                    <td className="px-3 py-4">
                                        {post.salary ? post.salary + ' VND' : 'Thương lượng'}
                                    </td>
                                    <td className="px-3 py-4 text-red-500">
                                        {post.status}
                                    </td>
                                    <td className="px-3 py-4">
                                        {formatDate(new Date(post.deadline))}
                                    </td>
                                    <td className="px-3 py-4">
                                        {post.location}
                                    </td>
                                    <td className="px-3 py-4 flex gap-x-3 justify-center">
                                        <BiEdit size={20} color='#1c2551' className='cursor-pointer' onClick={() => updatePost(post._id)} />
                                        <HiOutlineTrash size={20} color='#d63434' className='cursor-pointer' onClick={() => handleDeleteClick(post._id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="flex items-center gap-4 justify-center">
                    <button disabled className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                        </svg>
                        Previous
                    </button>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(number => (
                            <button key={number} className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    {number}
                                </span>
                            </button>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                        </svg>
                    </button>
                </div>
            </section>

            {/* Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold">Xác nhận xóa</h3>
                        <p className="mt-2">Bạn có chắc chắn muốn xóa bài đăng này không?</p>
                        <div className="mt-4 flex justify-end">
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2" onClick={() => setShowConfirmModal(false)}>Hủy</button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleConfirmDelete}>Xóa</button>
                        </div>
                    </div>
                </div>
            )}
        </NoFooter>
    );
}

export default JobListHR;
