import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

function NonAuthenticate(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div className='btn-register md:px-5 md:py-3 bg-white text-orange-500 rounded-md mr-4 font-medium'>
                <Link to="/dang-ky">Đăng ký</Link>
            </div>
            <div className='relative'>
            <div 
                className='btn-login md:px-5 md:py-3 hover:bg-orange-600 bg-orange-500 text-white rounded-md font-medium cursor-pointer'
                onClick={toggleDropdown}
            >
                Đăng nhập
            </div>
            {isOpen && (
                <div className='absolute mt-2 w-full rounded-md shadow-lg bg-white border border-gray-300 z-99999' style={{ zIndex: 1 }}>
                    <ul className='py-1'>
                        <li>
                            <NavLink 
                                to="/cong-ty/dang-nhap" 
                                className='block px-4 py-2 text-gray-800 hover:bg-orange-500 hover:text-white font-semibold'
                                onClick={() => setIsOpen(false)}
                            >
                                Đăng nhập tài khoản công ty
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/dang-nhap" 
                                className='block px-4 py-2 text-gray-800 hover:bg-orange-500 hover:text-white font-semibold'
                                onClick={() => setIsOpen(false)}
                            >
                                Đăng nhập
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/nhan-vien/dang-nhap" 
                                className='block px-4 py-2 text-gray-800 hover:bg-orange-500 hover:text-white font-semibold'
                                onClick={() => setIsOpen(false)}
                            >
                                Đăng nhập tài khoản nhân viên
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
        </div>        </>
    );
}

export default NonAuthenticate;