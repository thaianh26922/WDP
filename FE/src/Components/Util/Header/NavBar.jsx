import React, { useState } from 'react';
import { ImProfile } from "react-icons/im";
import { GoFileDirectory } from "react-icons/go";
import { VscFileSymlinkDirectory } from "react-icons/vsc";
import { BsBuildingCheck } from "react-icons/bs";
import { FaRegChessQueen } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import Cookies from 'js-cookie';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../../../Image/logo-dragon-2.png";
import '../../../Styles/navbar.css'
import { useDispatch } from 'react-redux';
import { clearUser } from '../../../Store/userSlice';
function NavBar({ roleCo2, setTogNavBar, togNavBar }) {
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleToggle = () => {
        setToggle(!toggle);
        if (setTogNavBar && togNavBar) {
            setTogNavBar(togNavBar === 'Open' ? 'Close' : 'Open');
        }
    }


    function handleSignOut(e) {
        e.preventDefault();
        sessionStorage.removeItem('company');
        sessionStorage.removeItem('user');
         dispatch(clearUser());
        navigate('/');
    }
    return (
        <>
            <div className={toggle ? 'sidebar active' : 'sidebar'}>
                {/* className={({ isActive }) => (isActive ? "nav-link-active" : "")} */}
                {/* <div className='menu-btn' onClick={handleToggle} >
                    <AiOutlineMenu size={30} />
                </div> */}
                <div className="head">
                    <div className='user-img cursor-pointer' onClick={handleToggle}>
                        <img src={logo} alt='logo.png' width={50} height={50} />
                    </div>
                </div>
                <div className="nav">
                    <div className="menu h-screen">
                        {
                            roleCo2 ?
                                <ul>
                                    <li>
                                        <NavLink className={({ isActive }) => (isActive ? "nav-link-active" : "")} to={'/ho-so-cong-ty'}>
                                            <RxAvatar size={20} />
                                            <span className="text">Quản lý tài khoản </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) => (isActive ? "nav-link-active" : "")} to={'/danh-sach-nhan-vien'}>
                                            <ImProfile size={20} />
                                            <span className="text">Danh sách nhân viên</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) => (isActive ? "nav-link-active" : "")} to={'/dang-ky-vip'}>
                                            <FaRegChessQueen size={20} />
                                            <span className="text">Đăng ký thành viên VIP</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) => (isActive ? "nav-link-active" : "")} onClick={e => handleSignOut(e)}>
                                            <AiOutlineLogout size={20} />
                                            <span className="text">Đăng xuất</span>
                                        </NavLink>
                                    </li>
                                </ul>
                                :
                                <ul>
                                    <li>
                                        <NavLink to={'/tai-khoan'} className={({ isActive }) => (isActive ? "nav-link-active" : "")}>
                                            <RxAvatar size={20} />
                                            <span className="text">Quản lý tài khoản </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/ho-so-cua-toi'} className={({ isActive }) => (isActive ? "nav-link-active" : "")}>
                                            <ImProfile size={20} />
                                            <span className="text">Hồ sơ của tôi</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/viec-lam-da-luu'} className={({ isActive }) => (isActive ? "nav-link-active" : "")}>
                                            <GoFileDirectory size={20} />
                                            <span className="text">Việc làm đã lưu</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/viec-lam-da-ung-tuyen'} className={({ isActive }) => (isActive ? "nav-link-active" : "")}>
                                            <VscFileSymlinkDirectory size={20} />
                                            <span className="text">Việc làm đã ứng tuyển</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/cong-ty-dang-theo-doi'} className={({ isActive }) => (isActive ? "nav-link-active" : "")}>
                                            <BsBuildingCheck size={20} />
                                            <span className="text">Công ty đang theo dõi</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/nang-cap'} className={({ isActive }) => (isActive ? "nav-link-active" : "")}>
                                            <FaRegChessQueen size={20} />
                                            <span className="text">Đăng ký thành viên VIP</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dang-xuat'} className={({ isActive }) => (isActive ? "nav-link-active" : "")} onClick={e => handleSignOut(e)}>
                                            <AiOutlineLogout size={20} />
                                            <span className="text">Đăng xuất</span>
                                        </NavLink>
                                    </li>
                                </ul>
                        }

                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBar;