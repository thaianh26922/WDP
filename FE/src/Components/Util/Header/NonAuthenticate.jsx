import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function NonAuthenticate(props) {
    return (
        <>
            <div className='btn-register md:px-5 md:py-3 bg-white text-orange-500 rounded-md mr-4 font-medium'>
                <Link to="/dang-ky">Đăng ký</Link>
            </div>
            <div className='btn-login md:px-5 md:py-3 hover:bg-orange-600  bg-orange-500 text-white rounded-md font-medium'>
                <NavLink to="/dang-nhap">Đăng nhập</NavLink>
            </div>
        </>
    );
}

export default NonAuthenticate;