import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../Image/wallpaperflare.com_wallpaper.jpg";
import backgroundCo from "../../Image/ImageCo.png"
import backgroundImage1 from "../../Image/logo-dragon-2.png";
import backgroundImage2 from "../../Image/mail-marketing.png";
import { ToastContainer, toast } from 'react-toastify'
import { emailRegex } from "../../Util/regex";
import axios from 'axios';
function DefaultLogin({ resetEmail, setRestEmail, setButtonLogin, openConfirmationModal, closeConfirmationModal, isConfirmationModalOpen, isCompany }) {
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    ///
    const handleEmailFocus = () => {
        if (!isEmailFocused) {
            setIsEmailFocused(true);
        }
    };


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    //xu ly login.
    const handlelogin = (e) => {
        setButtonLogin({ email: e.target.email.value, password: e.target.password.value })
        e.preventDefault();
    }

    return (
        <div className={`all ${isCompany ? 'flex-row-reverse' : ''}`}>
            <div className="full-screen-image">
                <img src={isCompany ? backgroundCo : backgroundImage} alt="img" />
            </div>
            <div className={`logo z-20 ${isCompany ? 'left-[77%]' : ''}`}>
                <img src={backgroundImage1} alt="img" />
                <Link to="/" className="flex items-center ">
                    <i className="fas fa-undo mr-2"></i> Quay lại trang chủ
                </Link>
            </div>

            <div className="login-container">
                <form onSubmit={(e) => handlelogin(e)}>
                    <h2 className="mb-4 text-dark  font-bold">Đăng Nhập</h2>
                    {
                        isCompany ?
                            <p>Bạn đang đăng nhập bằng tài khoản của công ty,
                                hãy nhập e-mail và mật khẩu để tiếp tục</p>
                            : <p>
                                Tại Nodejs, chúng tôi không chỉ cung cấp công việc, chúng tôi
                                tạo ra cơ hội nghề nghiệp.
                            </p>
                    }

                    <div className="form-group font-bold">
                        <label htmlFor="username" className="mb-3">
                            Email
                        </label>
                        <span className="text-red-500">*</span>
                        <input
                            type="text"
                            className="form-control p-3"
                            id="email"
                            name="email"
                            placeholder="Nhập email của bạn"
                            required
                        />
                    </div>
                    <div className="form-group  font-bold">
                        <label htmlFor="password" className="mb-3">
                            Mật Khẩu
                        </label>
                        <span className="text-red-500">*</span>
                        <input
                            type="password"
                            className="form-control p-3"
                            id="password"
                            name="password"
                            placeholder="Nhập mật khẩu của bạn"
                            required
                        />
                    </div>
                    <div className="mb-3 font-bold">
                        <Link href="#" onClick={openModal} className="forget text-orange-500">
                            Quên mật khẩu?
                        </Link>
                    </div>

                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={closeModal}>
                                    &times;
                                </span>
                                <h2 className="font-bold">Quên mật khẩu</h2>
                                <p>Nhập Email để thiết lập lại mật khẩu</p>
                                <div className="form-group font-bold">
                                    <label htmlFor="resetEmail">Email</label>
                                    <span className="text-red-500">* {isEmailFocused && !emailRegex.test(resetEmail.target?.value) ? "email nhập không chính xác" : ""}</span>
                                    <input
                                        type="email"
                                        className={`form-control p-3 ${isEmailFocused && !emailRegex.test(resetEmail.target?.value) ? 'border border-danger' : ''}`}
                                        id="resetEmail"
                                        name="resetEmail"
                                        placeholder="Enter your email"
                                        onChange={(e) => setRestEmail(e)}
                                        onFocus={handleEmailFocus}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={openConfirmationModal}
                                    className="bg-orange-500 text-white p-2 w-full rounded-md"
                                >
                                    Xác Nhận
                                </button>
                                {isConfirmationModalOpen && (
                                    <div className="confirmation-modal">
                                        <div className="confirmation-modal-content">
                                            <span className="close" onClick={closeConfirmationModal}>
                                                &times;
                                            </span>
                                            <h2 className="text-center font-bold">
                                                Yêu cầu xác nhận
                                            </h2>
                                            <p className="text-center">
                                                Chúng tôi gửi một mã xác nhận đến Email của bạn. Vui
                                                lòng kiểm tra để xác nhận đó là bạn
                                            </p>
                                            <img src={backgroundImage2} alt="img" />
                                            <div className="mt-2 text-center">
                                                <p>
                                                    <Link href="/dang-nhap" className="text-red-500 font-bold">
                                                        Quay lại đăng nhập
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <button
                        type="submit"
                        id='login-button'
                        className="bg-orange-500 text-white p-2 w-full rounded-md "
                    >
                        Đăng Nhập
                    </button>
                    <div className="mt-2 text-center">
                        <p>
                            Bạn chưa có tài khoản{" "}
                            <Link to="/dang-ky" className="text-red-500 font-bold">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default DefaultLogin;