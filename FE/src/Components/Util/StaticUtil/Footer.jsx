import React from 'react';
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaFax } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { IoLogoWebComponent } from "react-icons/io5";
import { CiYoutube } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import logo from '../../../Image/logo-dragon-2.png'

function Footer(props) {
    return (
        <footer className='bg-[#F6F8FF] pt-14'>
            <div className='grid grid-rows-3 '>
                <div className='grid lg:grid-cols-5 sm:grid-cols-1 gap-3 m-auto'>
                    <div className='flex sm:justify-center items-center lg:mr-5'>
                        <img src={logo } alt='logo 192.png' width={100} height={100} />
                    </div>
                    <div className='reference_website flex flex-col justify-center'>
                        <p className='mb-3 text-[0.6em] font-bold text-left'>Các trang tuyển dụng khác</p>
                        <div className='group_website flex sm:justify-center lg:justify-start'>
                            <div className='bg-blue-400 rounded-full'><IoLogoWebComponent size={30} /></div>
                            <div className='bg-red-400 rounded-full mx-1'><IoLogoWebComponent size={30} /></div>
                            <div className='bg-purple-400 rounded-full'><IoLogoWebComponent size={30} /></div>
                            <div className='bg-yellow-400 rounded-full mx-1'><IoLogoWebComponent size={30} /></div>
                            <div className='bg-pink-400 rounded-full'><IoLogoWebComponent size={30} /></div>
                        </div>
                    </div>
                    <div className='linked flex flex-col justify-center text-[0.7em] text-left'>
                        <p className='font-bold'>Liên kết</p>
                        <ul className=''>
                            <li>Tuyển dụng</li>
                            <li>Các công ty con</li>
                            <li>Cơ hội nghề nghiệp</li>
                        </ul>
                    </div>
                    <div className='linked flex  flex-col justify-center text-[0.7em] text-left'>
                        <ul>
                            <li>Ý kiến khách hàng</li>
                            <li>Tư vấn</li>
                            <li>Liên hệ</li>
                        </ul>
                    </div>
                    <div className='social-media flex flex-col justify-center text-[0.7em] text-left'>
                        <p className='font-bold mt-3'>Social Media</p>
                        <p>Theo dõi chúng tôi trên các trang fanpage mạng xã hội</p>
                        <div className='group_sm mt-3 flex sm:justify-center lg:justify-start'>
                            <div className='bg-red-400 rounded-full'><CiYoutube size={30} /></div>
                            <div className='bg-bue-500 rounded-full mx-1'><CiFacebook size={30} /></div>
                            <div className='bg-pink-600 rounded-full'><FaInstagram size={30} /></div>
                        </div>
                    </div>
                </div>
                <div className='grid sm:gap-10  md:grid-cols-1  lg:grid-cols-4 row-span-2 lg:gap-16 m-auto'>
                    <div className='flex items-center'>
                        <div className='icon-phone p-2.5 mr-1 bg-orange-600 rounded-full text-white'>
                            <FiPhoneCall size={15} />
                        </div>
                        <div className='content_icon text-left text-[0.8em]'>
                            <p className=''>Điện thoại</p>
                            <p className='text-[1em] font-bold'>(84 - 24) 66526332</p>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='icon-email p-2.5 mr-1 bg-orange-600 rounded-full text-white'>
                            <MdOutlineEmail size={15} />
                        </div>
                        <div className='content_icon text-left text-[0.8em]'>
                            <p className=''>Email</p>
                            <p className='text-[1em] font-bold'>Info@nodejs301m.com</p>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='icon-fax p-2.5 mr-1 bg-orange-600 rounded-full text-white'>
                            <FaFax size={15} />
                        </div>
                        <div className='content_icon text-left text-[0.8em]'>
                            <p className=''>Fax</p>
                            <p className='text-[1em] font-bold'>(84-4) 3553.7168</p>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='icon-phone p-2.5 mr-1 bg-orange-600 rounded-full text-white'>
                            <CiLocationOn size={15} />
                        </div>
                        <div className='content_icon text-left text-[0.8em]'>
                            <p className=''>Địa chỉ</p>
                            <p className='text-[1em] font-bold'>FPT University - Hoa Lac</p>
                        </div>
                    </div>
                </div>
                <div className='text-white text-center flex flex-col justify-end'>
                    <div className=' bg-orange-600 p-3'>
                        <p className='tracking-wide'>©2024 WDP, All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;