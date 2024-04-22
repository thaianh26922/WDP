import DefaultLogin from '../Layouts/DefaultLogin';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function LoginForCompany(props) {
    const navigate = useNavigate();
    const [resetEmail, setRestEmail] = useState('');
    const [buttonSendEmail, setButtonSendEmail] = useState(false);
    const dispatch = useDispatch();
    const statusLogin = useSelector((state) => state.users.statusLogin);
    const [buttonLogin, setButtonLogin] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const nav = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/trang-chu";
    const openConfirmationModal = () => {
        setButtonSendEmail(!buttonSendEmail);
    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };


    useEffect(() => {
        document.title = "Đăng Nhập Tài Khoản Doanh Nghiệp - BEST CV";


        //Xử lý đăng nhập
        const loginButton = document.getElementById('login-button');
        loginButton.addEventListener('click', async (e) => {
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            if (email.value && password.value) {
                const res = await axios.post('http://localhost:9999/api/company/login', {
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value
                }).catch((err) => {
                    console.log(err);
                })
                console.log(res);
                if (res && res.data.result === "SUCCESS") {
                    sessionStorage.setItem('company', JSON.stringify(res.data.data));
                    navigate('/ho-so-cong-ty');
                }
            } else {
                toast.error('Vui lòng nhập đầy đủ thông tin');
            }
        })
    }, []);


    return (
        <DefaultLogin isCompany={true} resetEmail={resetEmail} setRestEmail={setRestEmail}
            setButtonLogin={setButtonLogin} openConfirmationModal={openConfirmationModal}
            closeConfirmationModal={closeConfirmationModal} isConfirmationModalOpen={isConfirmationModalOpen} />
    );
}

export default LoginForCompany;