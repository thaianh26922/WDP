import React from 'react';
import DashboardCustomer from '../Layouts/DashboardCustomer';
import HeaderV2 from '../Util/Header/HeaderV2';
import imgTemplateCV from '../../Image/cv-template-1.png'
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiPlusOutline } from "react-icons/ti";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
function MyCv(props) {
    return (
        <DashboardCustomer>
            <HeaderV2 hrefType={'Hồ sơ của tôi'} />
            <main className='pb-5'>
                <div className='info-pageCurrent pt-14 pb-10 ml-24'>
                    <h2 className="text-[2em] font-semibold leading-7 text-gray-700">Hồ sơ của tôi</h2>
                    <p class="mt-3 text-[0.8em] leading-6 text-gray-600 w-[27%]">Tại Nodejs, chúng tôi không chỉ cung cấp công việc, chúng tôi tạo ra cơ hội nghề nghiệp.</p>
                </div>
                <div className='flex justify-center gap-5 items-center'>
                    <div className='shadow-lg rounded p-4 md:w-[58%] relative'>
                        <div className='pb-3'>
                            <p className=' inline-block pr-10 pb-2 font-semibold text-lg border-b-4 border-indigo-500'>Hồ sơ đã tạo</p>
                        </div>
                        <div className='btn-create text-white absolute right-6 top-6'>
                        <Link to="/tao-cv" className='px-3 py-2  bg-orange-600 text-white rounded-md font-thin hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-400'><span className='text-sm font-semibold'>Tạo hồ sơ mới</span></Link>
                        </div>
                        <div className='grid grid-cols-2 gap-9 mt-4'>
                            {
                                (function func() {
                                    const arr = [];
                                    for (let index = 0; index < 4; index++) {
                                        arr.push(<div className='relative'>
                                            <div className='bg-gradient-to-b from-slate-100 to-slate-800 rounded-b-lg h-96 w-full '>
                                                <img src={imgTemplateCV} alt="templateCV.png" className='w-full h-full object-cover mix-blend-multiply' />
                                            </div>
                                            <div className='absolute bottom-5 left-4 text-white'>
                                                <div className='title-cv mb-3'><h4 className='text-[1.3em] font-serif'>CV của My</h4></div>
                                                <div className='flex justify-start gap-3'>
                                                    <button type='button' className='bg-[#141b46] py-2 px-3 rounded'> <span className='text-[0.8em]'>Chỉnh sửa</span> <FiEdit size={18} className='inline-block' /></button>
                                                    <button type='button' className='bg-red-600 py-2 px-3 rounded'><RiDeleteBin6Line size={18} /></button>
                                                </div>
                                            </div>
                                        </div>)

                                    }
                                    return arr;
                                })()

                            }
                        </div>
                    </div>
                    <div className='md:w-[24em]'>
                        <div className='flex justify-between items-center px-1'>
                            <p className=' inline-block pr-10 pb-2 font-semibold text-sm border-b-4 border-gray-600 '>Công việc mới nhất</p>
                            <div><FaRegArrowAltCircleUp size={20} className='inline-block'/> <FaRegArrowAltCircleDown size={20} className='inline-block'/></div>
                        </div>
                        <div className='grid grid-cols-1 gap-y-8 mt-3 p-2'>
                            {
                                (function func() {
                                    const items = [];
                                    for (let index = 0; index < 2; index++) {
                                        const rnd = Math.ceil(Math.random() * 10);
                                        items.push(
                                            <div className=''>
                                                <div className=' bg-gray-200 shadow-md rounded p-3'>
                                                    <div className='flex justify-between items-center'>
                                                        <h2 className='text-[1em] text-blue-900 font-bold py-2'>Công ty cổ phần TMDV HGD </h2>
                                                        {
                                                            rnd % 2 === 0 ? <div className='rounded-full p-2 bg-red-500'>
                                                                <p className='text-[0.7em] text-white'>Tuyển gấp {rnd}</p>
                                                            </div> : <div className=''></div>
                                                        }

                                                    </div>
                                                    <p className='tracking-wide mt-3'>SHN Hưng Yên tuyển dụng vị trí giám đốc chi nhánh</p>

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
                                                    <div className='pt-2 pb-1 flex justify-start gap-1 items-center'>
                                                        <button className='px-4 py-2 bg-blue-950 text-white  rounded-md mr-4 font-thin'>Chi tiết</button>
                                                        <button className='px-4 py-2 bg-orange-600 text-white rounded-md mr-4 font-thin'>Ứng tuyển</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return items;
                                })()
                            }
                        </div>
                    </div>
                </div>

            </main>
        </DashboardCustomer>
    );
}

export default MyCv;