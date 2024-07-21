import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Util/StaticUtil/Breadcrumb';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import DashboardCustomer from '../Layouts/DashboardCustomer';
import HeaderV2 from '../Util/Header/HeaderV2';
import axios from 'axios';
import { toast } from 'react-toastify';

function HRManagerCandidatesList(props) {
    const [togNavBar, setTogNavBar] = useState('Open');
    const [candidate, setCandidate] = useState([]);
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const hrmanager = JSON.parse(sessionStorage.getItem("HRManager")) || '';

    useEffect(() => {
        async function getAllAppliedJobs() {
            try {
                const res = await axios.get(`http://localhost:9999/api/apply-job/get-all-applied-jobs-approved/${hrmanager.companyId._id}`);
                if (res) {
                    setCandidate(res.data.data);
                    setFilteredCandidates(res.data.data);
                }
            } catch (error) {
                console.error('Lỗi lấy danh sách ứng viên đã apply', error);
            }
        }
        getAllAppliedJobs();
    }, []);

    useEffect(() => {
        filterCandidates();
    }, [searchQuery, statusFilter, candidate]);

    const filterCandidates = () => {
        let filtered = candidate;

        if (statusFilter !== 'ALL') {
            filtered = filtered.filter(c => c.status === statusFilter);
        }

        if (searchQuery) {
            filtered = filtered.filter(c => c.cvApplies[0].email.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        setFilteredCandidates(filtered);
    };

    async function handleApproveCandidate(id, status) {
        const res = await axios.post('http://localhost:9999/api/apply-job/accept-candidate', {
            id: id,
            status: status
        }).catch(err => console.error(err));
        try {
            const data = res.data;
            if (data && data.result === 'SUCCESS') {
                toast.success('Duyệt ứng viên thành công');
                const newCandidate = candidate.filter(c => c._id !== id);
                setCandidate(newCandidate);
                setFilteredCandidates(newCandidate); // Update filtered candidates
            } else {
                toast.error('Duyệt ứng viên thất bại');
            }
        } catch (error) {
            toast.error('Lỗi duyệt ứng viên');
            console.log(error);
        }
    }

    return (
        <DashboardCustomer roleCo={'Danh sách công ty'} setTogNavBar={setTogNavBar} togNavBar={togNavBar} useNavBarV2={true} >
            <HeaderV2 hrefType={'Danh sách ưng viên'} />
            <section id='section-header' className=' bg-gradient-to-r from-[#4973CE] to-[#47BDE1] text-gray-200'>
                <div className='pl-[9em] py-16'>
                    <Breadcrumb text1={'Trang chủ'} text2={'Danh sách ứng viên'} />
                    <h2 className='text-[2em] font-semibold leading-7 py-3'>Danh sách ứng viên</h2>
                    <p className='text-[0.8em] font-thin'>Tại Nodejs, chúng tôi không chỉ cung cấp công việc, chúng tôi tạo ra cơ hội nghề nghiệp</p>
                </div>
            </section>
            <section id='search-filter' className='mx-auto my-5 px-4'>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                />
                <button
                    onClick={() => setStatusFilter('ALL')}
                    className={`px-3 py-1 rounded ml-2 ${statusFilter === 'ALL' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Tất cả
                </button>
                <button
                    onClick={() => setStatusFilter('APPROVED')}
                    className={`px-3 py-1 rounded ml-2 ${statusFilter === 'APPROVED' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                >
                    Đã duyệt
                </button>
                <button
                    onClick={() => setStatusFilter('REJECTED')}
                    className={`px-3 py-1 rounded ml-2 ${statusFilter === 'REJECTED' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                >
                    Đã từ chối
                </button>
            </section>
            <section id='list-feature-jobs' className='grid lg:grid-cols-1 gap-9 sm:w-[509px] lg:w-[1166px] mx-auto mt-5 mb-5'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-gradient-to-r from-[#4973CE] to-[#47BDE1]">
                            <tr>
                                <th scope="col" className="px-3 py-3 text-center">
                                    Email
                                </th>
                                <th scope='col' className='px-3 py-3'>
                                    <div className="flex items-center">
                                        Vị trí apply
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope='col' className='px-3 py-3'>
                                    <div className="flex items-center">
                                        Chi tiết CV
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope='col' className='px-1 py-1'>
                                    <div className="flex items-center">
                                        Accept/Denied
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCandidates.length > 0 ? filteredCandidates.map((c, index) => (
                                <tr className={`border-b ${c.status === 'REJECTED' ? 'bg-red-100' : 'bg-white'}`}>
                                    <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                        {c.cvApplies[0].email}
                                    </th>
                                    <td className="px-3 py-4">
                                        {c.cvApplies[0].chucvu}
                                    </td>
                                    <td className="px-3 py-4">
                                        <a href={`http://localhost:9999/api/apply-job/asset/${c.cv}/${c.cvApplies[0].email}`}>
                                            <MdOutlineRemoveRedEye size={20} className='cursor-pointer' />
                                        </a>
                                    </td>
                                    <td className="px-3 py-4 flex gap-x-3">
                                        {c.status === 'APPROVED' ? (
                                            <span className="text-green-500">Accepted</span>
                                        ) : c.status === 'REJECTED' ? (
                                            <span className="text-red-500">Denied</span>
                                        ) : (
                                            <>
                                                <button onClick={() => handleApproveCandidate(c._id, 'APPROVED')}>
                                                    <IoCheckmarkDoneCircle size={20} color='#219c1b' className='cursor-pointer' />
                                                </button>
                                                <button onClick={() => handleApproveCandidate(c._id, 'REJECTED')}>
                                                    <MdCancel size={20} color='#d63434' className='cursor-pointer' />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            )) : <tr className='text-center'><td colSpan="4">Không có dữ liệu</td></tr>}
                        </tbody>
                    </table>
                </div>
            </section>
        </DashboardCustomer >
    );
}

export default HRManagerCandidatesList;
