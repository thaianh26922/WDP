import React, { useEffect, useState } from 'react';
import DashboardCustomer from '../Layouts/DashboardCustomer';
import HeaderV2 from '../Util/Header/HeaderV2';
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaFax } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import BannerCo from '../../Image/banner-Co.png'
import AvtarCo from '../../Image/avatar-Co.png'
import axios from 'axios';
function CompanyProfile(props) {
    const [companyProfile, setCompanyProfile] = useState(JSON.parse(sessionStorage.getItem('company')));
    const [images, setImages] = useState('');
    useEffect(() => {



        const introContent = document.querySelectorAll('.intro-content');
        introContent.forEach((content) => {
            content.onclick = () => {
                const editContent = document.createElement('textarea');
                editContent.value = content.innerHTML;
                editContent.style.width = `${content.offsetWidth}px`;
                editContent.style.height = `${content.offsetHeight}px`;
                content.innerHTML = '';
                content.appendChild(editContent);
                editContent.focus();
                editContent.style.outline = 'none';
                editContent.oninput = () => {
                    editContent.style.width = `${parseInt(content.scrollWidth) + 5}px`;;
                }
                editContent.onblur = () => {
                    content.innerHTML = editContent.value;
                }
            }

            async function updateCompanyProfile() {
                const companyProfile = {
                    bio: introContent[0].innerHTML,
                    phone: introContent[1].innerHTML,
                    email: introContent[2].innerHTML,
                    taxCode: introContent[3].innerHTML,
                    location: introContent[4].innerHTML,
                    avatar: images
                }

                axios.post('')
            }
        });
    }, [])

    async function handleAvatar(e) {
        await e.target.nextElementSibling.click();
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imagesData = e.target.result;
                setImages(imagesData);
            };
            reader.readAsDataURL(file);
        }
    }
    return (
        <DashboardCustomer roleCo2={'Dashboard công ty'}>
            <HeaderV2 hrefType={'Quản lý tài khoản'} roleCo2={'Dashboard công ty'} />
            <main className='pt-4 px-5'>
                <div className='relative mb-3'>
                    <div className='bg-gradient-to-b from-slate-100 to-slate-400 h-96 w-full'>
                        <img src={BannerCo} alt="bannerCo.png" className='rounded w-full h-full object-cover mix-blend-multiply' />
                    </div>
                    <div className='absolute -bottom-24 left-16'>
                        <img src={images.length == 0 ? AvtarCo : images[0]} alt="avartarCo.png" className='rounded-full w-[90%]' onClick={e => handleAvatar(e)} />
                        <input type='file' className='mt-2' hidden />
                    </div>
                </div>

                <section className='grid lg:grid-cols-3 gap-4 mx-auto'>
                    <div className='col-span-2'>
                        <div className='bg-gradient-to-r from-[#EF6147] to-[#F5AF51] p-4 rounded'>
                            <div className='w-fit ml-72'>
                                <h3 className='text-white text-[1.6em] font-semibold mb-2'>{companyProfile?.name} 👑</h3>
                                <p className='text-white font-thin text-[1em]'>500 thành viên</p>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <h4 className=' text-white font-semibold bg-gradient-to-r from-[#EF6147] to-[#F5AF51] p-3 rounded-t-lg'>Giới thiệu</h4>
                            <div className='px-3 pt-3 pb-4 text-wrap bg-gray-100 rounded-b-lg'>
                                <p className='text-sm tracking-wider intro-content'>
                                    {companyProfile?.bio == '' ? 'Chưa có thông tin. Nhấn vào để cập nhật thông tin' : companyProfile?.bio}
                                </p>
                            </div>
                        </div>
                        <div className='mt-3 mb-3'>
                            <button type="button" className='md:px-10 md:py-3 bg-blue-950 text-white rounded-md mr-4 font-medium'>Chỉnh sửa</button>
                            <button type="submit" className=' md:px-16 md:py-3 bg-orange-600 text-white rounded-md mr-4 font-medium'>Lưu</button>
                        </div>
                    </div>
                    <div className=''>
                        <div>
                            <h4 className='text-center text-white font-semibold bg-gradient-to-r from-[#EF6147] to-[#F5AF51] p-3 rounded-t-lg'>Thông tin liên hệ</h4>
                            <div className='grid grid-cols-1 gap-y-4 p-4 mx-auto bg-gray-100'>
                                <div className='flex items-center'>
                                    <div className='icon-phone p-2.5 mr-1 bg-orange-600 rounded-full text-white'>
                                        <FiPhoneCall size={15} />
                                    </div>
                                    <div className='content_icon text-left text-[0.8em]'>
                                        <p className=''>Điện thoại</p>
                                        <p className='text-[1em] font-bold intro-content'>{companyProfile?.phone}</p>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='icon-email p-2.5 mr-1 bg-orange-600 rounded-full text-white'>
                                        <MdOutlineEmail size={15} />
                                    </div>
                                    <div className='content_icon text-left text-[0.8em]'>
                                        <p className=''>Email</p>
                                        <p className='text-[1em] font-bold intro-content'>{companyProfile?.email}</p>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='icon-fax p-2.5 mr-1 bg-orange-600 rounded-full text-white'>
                                        <FaFax size={15} />
                                    </div>
                                    <div className='content_icon text-left text-[0.8em]'>
                                        <p className=''>Mã số thuế</p>
                                        <p className='text-[1em] font-bold intro-content'>{companyProfile?.taxCode}</p>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='icon-phone p-2.5 mr-1 bg-orange-600 rounded-full text-white'>
                                        <CiLocationOn size={15} />
                                    </div>
                                    <div className='content_icon text-left text-[0.8em]'>
                                        <p className=''>Địa chỉ</p>
                                        <p className='text-[1em] font-bold intro-content'>{companyProfile?.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </DashboardCustomer>
    );
}

export default CompanyProfile;