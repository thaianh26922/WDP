import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Util/StaticUtil/Breadcrumb';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import DashboardCustomer from '../Layouts/DashboardCustomer';
import HeaderV2 from '../Util/Header/HeaderV2';
import axios from 'axios';
function HRManagerCandidatesList(props) {
    const [togNavBar, setTogNavBar] = useState('Open');
    const [candidate, setCandidate] = useState([]);
    const [status, setStatus] = useState('');
    const hrmanager = JSON.parse(sessionStorage.getItem("HRManager")) || '';
    useEffect(() => {
        async function getAllAppliedJobs() {
            try {
                const res = await axios.get(`http://localhost:9999/api/apply-job/get-all-applied-jobs-approved/${hrmanager.companyId._id}`);
                if (res) {
                    setCandidate(res.data.data);
                    console.log(candidate);
                }
            } catch (error) {
                console.error('Lỗi lấy danh sách ứng viên đã apply', error);
            }
        }
        getAllAppliedJobs();
    }, []);

    // async function handleApproveCandidate(id, status) {
    //     const res = await axios.post('http://localhost:9999/api/apply-job/accept-candidate', {
    //         id: id,
    //         status: status
    //     }).catch(err => console.error(err));
    //     try {
    //         const data = res.data;
    //         console.log(data);
    //         if (data && data.result === 'SUCCESS') {
    //             toast.success('Duyệt ứng viên thành công');
    //             const newCandidate = candidate.filter(c => c._id !== id);
    //             setCandidate(newCandidate);
    //         } else {
    //             toast.error('Duyệt ứng viên thất bại');
    //         }
    //     } catch (error) {
    //         toast.error('Lỗi duyệt ứng viên');
    //         console.log(error);
    //     }
    // }
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
            <section id='list-feature-jobs' className='grid lg:grid-cols-1 gap-9 sm:w-[509px] lg:w-[1166px] mx-auto mt-5 mb-5'>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-white uppercase bg-gradient-to-r from-[#4973CE] to-[#47BDE1]">
                            <tr>
                                <th scope="col" class="px-3 py-3 text-center">
                                    Email
                                </th>
                                <th scope='col' className='px-3 py-3'>
                                    <div class="flex items-center">
                                        Vị trí apply
                                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope='col' className='px-3 py-3'>
                                    <div class="flex items-center">
                                        Chi tiết CV
                                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidate.length > 0 ? candidate.map((c, index) => (
                                <tr class="bg-white border-b border-gray-200">
                                    <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                        {c.userId.name ? c.userId.name : c.userId.email}
                                    </th>
                                    <td class="px-3 py-4">
                                        {c.postId?.title}
                                    </td>

                                    <td class="px-3 py-4">
                                        <a href={`http://localhost:9999/api/apply-job/asset/${c.cv}/${c.userId.email}`}><MdOutlineRemoveRedEye size={20} className='cursor-pointer' /></a>
                                    </td>
                                    {/* <td class="px-3 py-4 flex gap-x-3">
                                        <button onClick={() => handleApproveCandidate(c._id, 'APPROVED')}><IoCheckmarkDoneCircle size={20} color='#219c1b' className='cursor-pointer' /></button>
                                        <button onClick={() => handleApproveCandidate(c._id, 'REJECTED')} ><MdCancel size={20} color='#d63434' className='cursor-pointer' /></button>
                                    </td> */}
                                </tr>
                            )) : <tr className='text-center'>Không có dữ liệu</tr>
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </DashboardCustomer >
    );
}

export default HRManagerCandidatesList;