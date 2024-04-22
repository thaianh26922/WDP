import React, { useState } from 'react';
import { ImCancelCircle } from "react-icons/im";
function SalaryModal() {
    const [showModal, setShowModal] = useState(true);
    return (
        <>
            <div className='mt-2'>
                <div onClick={() => setShowModal(true)}
                    className="flex cursor-pointer rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="text" className="cursor-pointer block flex-1 border-0 bg-transparent py-1.5 pl-1 outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-8" placeholder="Chọn hình thức" disabled />
                </div>
            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl transition-all ease-in-out">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-2xl font-semibold text-[#1F2F65]">
                                        Nhập Mức Lương Đề Xuất
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <ImCancelCircle size={25} color='#1F2F65' />
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className=''>
                                        <p className='ml-4 text-sm text-gray-500 hover:text-gray-700' htmlFor='luongthoathuan'> <i><b>Chú ý:</b> Lựa chọn 1 hình thức bạn muốn hiển thị mức lương</i></p>
                                    </div>
                                    <div className='border-l-4 border-orange-600'>
                                        <div className="flex items-center justify-between mt-3">
                                            <div><label className='ml-4 text-[0.9rem] text-gray-800 font-semibold hover:text-gray-700' htmlFor='luongthoathuan'>Lương thỏa thuận</label></div>
                                            <input id="luongthoathuan" name='salaryType' type="radio" value="" className="h-4 w-5 rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]" />
                                        </div>
                                        <div className="flex items-center mt-3 gap-x-10">
                                            <div className='ml-4'>
                                                <label className='text-[0.7rem] text-gray-600' htmlFor='khoangluong'>Khoảng lương:</label>
                                                <div className='flex justify-center gap-x-7 mt-2'>
                                                    <input type="number" placeholder='0.00' className='border-b-2 border-gray-400 outline-none' />
                                                    <p className='text-lg font-semibold'> ➖</p>
                                                    <input type="number" placeholder='0.00' className='border-b-2 border-gray-400 outline-none' />
                                                    <p className='mt-1'><b>VND</b> / Tháng</p>
                                                </div>
                                            </div>
                                            <div>
                                                <input id="khoangluong" name='salaryType' type="radio" value="" className="h-4 w-5 rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]" />
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-3 justify-between">
                                            <div className='ml-4'>
                                                <label className='text-[0.7rem] text-gray-600' htmlFor='nhapluong'>Nhập lương:</label>
                                                <div className='flex justify-center gap-x-7 mt-2'>
                                                    <input type="number" placeholder='0.00' className='border-b-2 border-gray-400 outline-none' />
                                                    <div><p className='mt-1'><b>VND</b> / Tháng</p></div>
                                                </div>
                                            </div>
                                            <input id="nhapluong" name='salaryType' type="radio" value="" className="h-4 w-5 rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]" />
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <div className='ml-4'>
                                                <label className='text-[0.7rem] text-gray-600' htmlFor='luongtrenduoi'>Lương trên dưới: </label>
                                                <div className='flex justify-center gap-x-3'>
                                                    <label class="inline-flex items-center me-5 cursor-pointer">
                                                        <input type="checkbox" value="" class="sr-only peer" />
                                                        <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-red-600 peer-focus:ring-4 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-5 after:transition-all dark:border-gray-400 peer-checked:bg-green-600"></div>
                                                        <span class="ms-3 text-sm font-medium text-gray-500">Trên</span>
                                                    </label>
                                                    <div className='flex justify-center gap-x-7 mt-2'>
                                                        <input type="number" placeholder='0.00' className='border-b-2 border-gray-400 outline-none' />
                                                        <div><p className='mt-1'><b>VND</b> / Tháng</p></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <input id="luongtrenduoi" name='salaryType' type="radio" value="" className="h-4 w-5 rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]" />
                                        </div>
                                    </div>

                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-orange-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="reset"
                                    >
                                        Quay Lại
                                    </button>
                                    <button
                                        className="bg-blue-900 text-white active:bg-blue-950 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Lưu Thay Đổi
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

export default SalaryModal;