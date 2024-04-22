import React, { useState } from 'react';
import DashboardCustomer from '../Layouts/DashboardCustomer';
import HeaderV2 from '../Util/Header/HeaderV2';
function ListCompanyMod(props) {
    const [togNavBar, setTogNavBar] = useState('Open');
    return (
        <DashboardCustomer roleCo3={'Danh sách công ty'} setTogNavBar={setTogNavBar} togNavBar={togNavBar} useNavBarV2={true} >
            <HeaderV2 hrefType={'Danh sách công ty'} />
            <main>
                <div className='info-pageCurrent pt-16 pl-10'>
                    <h2 className="text-[2em] font-bold leading-7 text-gray-700">Danh sách công ty</h2>
                    <p class="mt-3 text-[0.8em] leading-6 text-gray-600 w-[27%]">Tại NodeJS, chúng tôi không chỉ cung cấp công việc, chúng tôi tạo ra cơ hội nghề nghiệp.</p>
                </div>
                <section id='list-feature-jobs' className={`grid gap-9 sm:w-[509px] mx-5 mt-5 mb-5 ease-in-out duration-500 ${togNavBar === 'Close' ? " lg:w-[1373px]" : "lg:w-[1166px]"}`}>
                    
                    <div className='col-span-3'>
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-white uppercase bg-blue-900">
                                <tr>
                                <th scope="col" class="px-3 py-3 text-center">
                                    Tên
                                </th>
                                <th scope='col' className='px-3 py-3 text-center'>
                                        Mã số thuế
                                </th>
                                <th scope='col' className='px-3 py-3 text-center'>
                                    Địa chỉ
                                </th>
                                <th scope='col' className='px-3 py-3 text-center'>
                                    Trạng thái
                                </th>
                                <th scope="col" class="px-3 py-3 text-center">
                                    Quản lý
                                </th>
                            </tr>
                                </thead>
                                <tbody>
                            {
                                (function func() {
                                    const items = [];
                                    for (let index = 0; index < 10; index++) {
                                        items.push(
                                            <tr class="bg-white border-b border-gray-200">
                                                <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                                    Công ty TNHH Wecan Group
                                                </th>
                                                <td class="px-3 py-4 text-gray-900 text-center">
                                                    0312171064-002
                                                </td>
                                                
                                                <td class="px-3 py-4 text-gray-900">
                                                Số 30 - TT1, KĐT Mỹ Đình - Mễ Trì - Phường Mễ Trì - Quận Nam Từ Liêm - Hà Nội.
                                                </td>
                                                <td class="px-3 py-4 text-green-600 font-medium text-center">
                                                    Đang hoạt động 
                                                </td>
                                                <td class="px-3 py-4 text-center text-red-600 font-medium">
                                                Cấm
                                                </td>
                                            </tr>
                                        )

                                    }
                                    return items;
                                })()
                            }
                        </tbody>
                            </table>
                        </div>
                    </div>
                    {/* //////////////////// */}
                    <div className="flex items-center">
                        <button disabled
                            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                aria-hidden="true" className="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                            </svg>
                            Previous
                        </button>
                        <div className="flex items-center gap-2">
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
        </DashboardCustomer >
    );
}

export default ListCompanyMod;
