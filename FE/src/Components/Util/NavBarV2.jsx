import React, { useState } from 'react';
import { ImProfile } from "react-icons/im";
import { GoFileDirectory } from "react-icons/go";
import { VscFileSymlinkDirectory } from "react-icons/vsc";
import { BsBuildingCheck } from "react-icons/bs";
import { FaRegChessQueen } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../../Image/logo-dragon-2.png";
import '../../Styles/navbar.css'
function NavBarV2({ roleCo3, setTogNavBar, togNavBar }) {
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setToggle(!toggle);
        if (setTogNavBar && togNavBar) {
            setTogNavBar(togNavBar === 'Open' ? 'Close' : 'Open');
        }
    }


    function handleSignOut(e) {
        e.preventDefault();
        sessionStorage.removeItem('staff');
        sessionStorage.removeItem('HRManager');
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
                            roleCo3 ?
                                <ul>
                                    <li>
                                        <NavLink className={({ isActive }) => (isActive ? "nav-link-active" : "")} to={'/danh-sach-cong-ty-mod'}>
                                            <RxAvatar size={20} />
                                            <span className="text">Danh sách công ty </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={({ isActive }) => (isActive ? "nav-link-active" : "")} to={'/danh-sach-bao-cao-mod'}>
                                            <ImProfile size={20} />
                                            <span className="text">Danh sách báo cáo</span>
                                        </NavLink>
                                    </li>
                                </ul>
                                :
                                <ul>
                                    <li>
                                        <NavLink to={'/danh-sach-ung-vien-hrmanager'} className={({ isActive }) => (isActive ? "nav-link-active" : "")}>
                                            <RxAvatar size={20} />
                                            <span className="text">Danh sách ứng viên </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/danh-sach-cong-viec-hrmanager'} className={({ isActive }) => (isActive ? "nav-link-active" : "")}>
                                            <ImProfile size={20} />
                                            <span className="text">Xem bài viết</span>
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

export default NavBarV2;