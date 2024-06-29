import React, { useEffect, useState } from 'react';
import DashboardCustomer from '../Layouts/DashboardCustomer';
import HeaderV2 from '../Util/Header/HeaderV2';
import { WiTime12 } from "react-icons/wi";
import { CiSearch } from "react-icons/ci";
import Cookies from 'js-cookie';
import axios from 'axios';

function MyApplyJob(props) {
    const [user, setUser] = useState(JSON.parse(Cookies.get("user-profile")))
    const [jobApply, setJopApply] = useState([])
    console.log(user._id);
    useEffect(() => {
        const getAllAppliedJobs = async () => {
            try {
                const res = await axios.get(`http://localhost:9999/api/apply-job/get-all-applied-jobs-by-userId/${user._id}`);
                if (res) {
                    await setJopApply(res.data.data);
                    console.log(jobApply);
                }
            } catch (error) {
                console.error('Lỗi lấy danh sách ứng viên đã apply', error);
            }
        }
        getAllAppliedJobs();
    }, []);
    console.log(jobApply);
    return (
        <DashboardCustomer>
            <HeaderV2 hrefType={'Việc làm đã ứng tuyển'} />
            <main>
                <div className='info-pageCurrent pt-16 pl-10'>
                    <h2 className="text-[2em] font-bold leading-7 text-gray-700">Việc làm đã ứng tuyển</h2>
                    <p class="mt-3 text-[0.8em] leading-6 text-gray-600 w-[27%]">Tại NodeJS, chúng tôi không chỉ cung cấp công việc, chúng tôi tạo ra cơ hội nghề nghiệp.</p>
                </div>
                <section id='list-feature-jobs' className='grid lg:grid-cols-3  gap-9 sm:w-[509px] lg:w-[1166px] mx-auto mt-5 mb-5'>
                    <div className='groupFilter hidden bg-red-250 row-span-6 md:hidden lg:block'>
                        <form action="">
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-black sm:text-sm"><CiSearch /></span>
                                    <input type="text" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-8" placeholder="Nhập vị trí chức danh" />
                                </div>
                            </div>
                            <div className='mt-3'>
                                <fieldset>
                                    <label className="text-sm font-semibold leading-6 text-blue-900"><WiTime12 size={20} className='inline-block' /> <span>Hình thức</span></label>
                                    <div className="mt-6 space-y-3">
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input id="staffOperate" name="staffOperate" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label for="staffOperate" className="font-medium text-gray-900">Chọn tất cả</label>
                                            </div>
                                        </div>
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input id="realEstate" name="realEstate" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label for="candidates" className="font-medium text-gray-900">Toàn thời gian</label>
                                            </div>
                                        </div>
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input id="faas" name="faas" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label for="faas" className="font-medium text-gray-900">Bán thời gian</label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div className='mt-6'>
                                <fieldset>
                                    <label className="text-sm font-semibold leading-6 text-blue-900"><WiTime12 size={20} className='inline-block' /> <span>Thời gian</span></label>
                                    <div className="mt-6 space-y-3">
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input id="realEstate" name="realEstate" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label for="candidates" className="font-medium text-gray-900">Gần đây nhất</label>
                                            </div>
                                        </div>
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input id="faas" name="faas" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label for="faas" className="font-medium text-gray-900">Cũ nhất</label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </form>
                    </div>
                    {jobApply.map((value) => {
                        let borderColorClass = '';
                        let statusText = '';
                        let backgronud = '';

                        if (value.status === 'PENDING') {
                            borderColorClass = 'border-red-300'; // Border màu vàng
                            backgronud = 'bg-red-100'
                            statusText = 'Đang duyệt';
                        } else if (value.status === 'APPROVED') {
                            borderColorClass = 'border-green-300'; // Border màu xanh lá cây
                            statusText = 'Đã được duyệt';
                            backgronud = 'bg-green-100'

                        }
                        return (
                            <div className={`mb-4 ${borderColorClass} border-solid border-3 rounded-md`}>
                                <div className= {`${backgronud} shadow-md rounded p-3`}>
                                    <div className='flex justify-between items-center'>
                                        <h2 className='text-[0.9em] text-blue-900 font-bold py-2'>{value.companyId.name}</h2>
                                    </div>
                                    <p className='tracking-wide mt-3'>{value.companyId.bio}</p>

                                    <div className='py-4 border-b border-b-gray-700'>
                                        <h2 className='text-[1.1em] font-semibold text-black mb-2'>Yêu cầu:</h2>
                                        <ul className='list-disc pl-5'>
                                            <li>6 năm kinh nghiệm vị trí quản lý</li>
                                            <li>Có bằng cử nhân kinh tế</li>
                                            <li>Thông thạo tiếng anh</li>
                                        </ul>
                                    </div>
                                    <div className='pt-3 pb-1'>
                                        <p>Hạn ứng tuyển: 30/12/2018</p>
                                    </div>
                                    <div className='pt-1 pb-1'>
                                        <p>Địa điểm: Hưng Yên</p>
                                    </div>
                                    <div className='pt-2 pb-1'>
                                         <button className='px-10 py-3 bg-blue-950 text-white rounded-md mr-4 font-thin'>Chi tiết</button>
                                       
                                    </div>
                                    <p className='text-sm text-gray-500'>{statusText}</p>
                                </div>
                            </div>
                        );
                    })}



                    <div className="flex items-center gap-4">
                        <button disabled
                            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                aria-hidden="true" className="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                            </svg>
                            Previous
                        </button>
                        <div className="flex items-center gap-2 w-[100%]">
                            <button
                                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-orange-600 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    1
                                </span>
                            </button>
                            <button
                                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    2
                                </span>
                            </button>
                            <button
                                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    3
                                </span>
                            </button>
                            <button
                                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    4
                                </span>
                            </button>
                            <button
                                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    5
                                </span>
                            </button>
                        </div>
                        <button
                            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                aria-hidden="true" className="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                            </svg>
                        </button>
                    </div>
                </section>
            </main>
        </DashboardCustomer>
    );
}

export default MyApplyJob;