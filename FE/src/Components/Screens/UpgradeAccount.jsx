import React, { useEffect, useState } from 'react';
import DashboardCustomer from '../Layouts/DashboardCustomer';
import HeaderV2 from '../Util/Header/HeaderV2';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPayment } from '../../Store/paymentSlice';
import Cookies from 'js-cookie';

function UpgradeAccount(props) {
    const [user, setUser] = useState(JSON.parse(Cookies.get("user-profile")))
    const dispatch = useDispatch();
    const getCurrentUser = useSelector((state) => state.users.currentUser);
    const statusPay = useSelector((state) => state.payments.statusPayment);
    const hrefReturn = useSelector((state) => state.payments.hrefPayment)
    const nav = useNavigate();
    const handleUpgrade = async () => {
        let data = {
            amount: '100000',
            bankCode: 'VNBANK',
            language: 'vn',
            returnUrl: 'http://localhost:3000/tai-khoan',
            userId: user._id
        }
        await dispatch(createPayment({data}));
    }

    useEffect(() => {
        if (statusPay === 'succeeded') {
               window.location.href = hrefReturn;
        }
    }, [statusPay])


    return (
        <DashboardCustomer>
            <HeaderV2 hrefType={'Đăng ký VIP'} />
            <main>
                <div className='pt-9 pb-6 pl-16'>
                    <h2 className="text-[2em] font-bold leading-7 text-gray-700">Đăng ký VIP</h2>
                    <p className="mt-3 text-[0.8em] leading-6 text-gray-600 w-[27%]">Đăng ký gói thành viên VIP của chúng tôi để được tận hưởng nhiều ưu đãi hấp dẫn hơn</p>
                </div>
                <div className='flex justify-center gap-x-10 items-stretch pb-9'>
                    <div className='text-center basis-[23em] bg-slate-300-100 shadow-lg shadow-cyan-500/50 px-5 py-2 rounded'>
                        <div className='first-content'>
                            <h4 className="title text-orange-600 font-bold p-3">Thường</h4>
                            <p className='text-sm tracking-wide p-2'>Thời hạn: <span><b>Vĩnh viễn</b></span></p>
                            <p className='text-sm tracking-wide p-2'>Số lượng CV: <span><b>6</b></span></p>
                            <p className='text-sm tracking-wide p-2'>Template giới hạn</p>
                        </div>
                        <div className='second-content p-3'>
                            <img src='/logo192.png' alt='logo 192.png' className='mx-auto' width={150} />
                        </div>
                        <div className='third-content'>
                            <h3 className='title text-lg text-orange-600 font-semibold p-3'>Miễn Phí</h3>
                        </div>
                        <div className='bg-gray-500 p-3  text-white rounded'>
                            <NavLink className="px-3 ">
                                Đang sử dụng
                            </NavLink>
                        </div>
                    </div>
                    <div className='text-center basis-[23em]  bg-slate-300-100 shadow-lg shadow-cyan-500/50 px-5 py-2  rounded'>
                        <div className='first-content'>
                            <h4 className="title text-orange-600 font-bold p-3">VIP</h4>
                            <p className='text-sm tracking-wide p-2'>Thời hạn: <span><b>1 năm</b></span></p>
                            <p className='text-sm tracking-wide p-2'>Số lượng CV: <span><b>12</b></span></p>
                            <p className='text-sm tracking-wide p-2'>Sử dụng template cao cấp</p>
                            <p className='text-sm tracking-wide p-2'>Liên hệ trực tiếp với HR</p>
                        </div>
                        <div className='second-content'>
                            <img src='/logo192.png' alt='logo 192.png' className='mx-auto' width={150} />
                        </div>
                        <div className='third-content'>
                            <h3 className='title text-lg text-orange-600 font-semibold p-3'>500.000 VNĐ</h3>
                        </div>
                        <div className='bg-orange-600 p-3  text-white rounded'>
                            <NavLink className="px-3 " onClick={handleUpgrade}>
                                Nâng cấp ngay
                            </NavLink>
                        </div>
                    </div>
                </div>
            </main>
        </DashboardCustomer>
    );
}

export default UpgradeAccount;