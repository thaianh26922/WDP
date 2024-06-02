import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import NonAuthenticate from './NonAuthenticate';
import Authenticated from './Authenticated';
import logo from "../../../Image/logo-dragon-2.png";
import { useSelector } from 'react-redux';
function Header({ type, role }) {
    const [nav, setNav] = useState(false);
    const getCurrentUser = useSelector((state) => state.users.currentUser);
    const acoountStaff = JSON.parse(sessionStorage.getItem('staff')) || '';
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setNav(false);
            }

        }
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        }
    }, []);

    const handleNav = () => {
        setNav(!nav);
    }


    // console.log('Header', getCurrentUser);
    console.log('Header', acoountStaff);



    return (
        <header className='flex  min-[414px]:justify-between  lg:justify-evenly items-center text-white h-20 mx-auto px-4 bg-blue-950'>
            <div>
                <img src={logo} alt='logo.png' width={50} height={50} />
            </div>
            <ul className='pl-2 pr-2 md:max-lg:text-sm  md:flex hidden'>
                {type === 2 ?
                    <>
                        <li className='p-[1.75rem] cursor-pointer hover:bg-orange-600 ease-linear duration-200'><NavLink to={'/danh-sach-cong-viec'} className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Danh sách công việc</NavLink></li>
                        <li className='p-[1.75rem] cursor-pointer hover:bg-orange-600 ease-linear duration-200'><NavLink to={'/danh-sach-ung-vien'} className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Danh sách ứng viên</NavLink></li>
                        <li className='p-[1.75rem] cursor-pointer hover:bg-orange-600 ease-linear duration-200'><NavLink to={'/lien-he'} className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Chat</NavLink></li>
                        <li className='p-[1.75rem] cursor-pointer hover:bg-orange-600 ease-linear duration-200'><NavLink className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Tư vấn</NavLink></li>
                    </>
                    :
                    <>
                        <li className='p-[1.75rem] cursor-pointer hover:bg-orange-600 ease-linear duration-200'><NavLink className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Tuyển dụng</NavLink></li>
                        <li className='p-[1.75rem] cursor-pointer hover:bg-orange-600 ease-linear duration-200'><NavLink to={'/cac-cong-ty-con'} className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Các công ty con</NavLink></li>
                        <li className='p-[1.75rem] cursor-pointer hover:bg-orange-600 ease-linear duration-200'><NavLink to={'/co-hoi-nghe-nghiep'} className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Cơ hội nghề nghiệp</NavLink></li>
                        <li className='p-[1.75rem] cursor-pointer hover:bg-orange-600 ease-linear duration-200'><NavLink className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Tư vấn</NavLink></li>
                        <li className='p-[1.75rem] cursor-pointer hover:bg-orange-600 ease-linear duration-200'><NavLink className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Liên hệ</NavLink></li>
                    </>
                }
            </ul>
            <div className=' hidden md:hidden lg:flex md:max-lg:text-sm'>
                {
                    getCurrentUser || acoountStaff ? <Authenticated /> : <NonAuthenticate />
                }
            </div>
            <div onClick={handleNav} ref={ref} className='abcdef block'>
                <AiOutlineMenu size={30} />
            </div>
            <div className={`${nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-50 text-white bg-[#141B46] ease-in-out duration-500' : 'fixed left-[-100%]'}`}>
                <div className='m-4'>
                    <img src={logo} alt='logo.png' width={50} height={50} />
                </div>
                <ul className='px-4'>
                    {
                        type === 2 ?
                            <>
                                <li className='p-4  border-b hover:text-gray-900 hover:bg-orange-600 ease-linear duration-200'><NavLink className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Danh sách công việc</NavLink></li>
                                <li className='p-4  border-b cursor-pointer hover:bg-orange-600 ease-linear duration-200'><NavLink className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Danh sách ứng viên</NavLink></li>
                                <li className='p-4  border-b cursor-pointer hover:bg-orange-600 ease-linear duration-200'><NavLink className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Chat</NavLink></li>
                                <li className='p-4  border-b cursor-pointer hover:bg-orange-600 ease-linear duration-200'><NavLink className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Tư vấn</NavLink></li>
                            </>
                            :
                            <>
                                <li className='p-4  border-b hover:text-gray-900 hover:bg-orange-600 ease-linear duration-200'><NavLink className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Tuyển dụng</NavLink></li>
                                <li className='p-4  border-b cursor-pointer hover:bg-orange-600 ease-linear duration-200'><NavLink to={'/cac-cong-ty-con'} className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Các công ty con</NavLink></li>
                                <li className='p-4  border-b cursor-pointer hover:bg-orange-600 ease-linear duration-200'><NavLink to={'/co-hoi-nghe-nghiep'} className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Cơ hội nghề nghiệp</NavLink></li>
                                <li className='p-4  border-b cursor-pointer hover:bg-orange-600 ease-linear duration-200'><NavLink className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Tư vấn</NavLink></li>
                                <li className='p-4  border-b cursor-pointer hover:bg-orange-600 ease-linear duration-200'><NavLink className={({ isActive }) => (isActive ? "border-b-4 border-orange-500" : "")}>Liên hệ</NavLink></li>
                            </>
                    }
                </ul>
                <div className='flex flex-col p-4'>
                    {
                        type !== 2 ?
                            <NonAuthenticate /> : <Authenticated />
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;