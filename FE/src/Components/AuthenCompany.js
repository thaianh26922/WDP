import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function AuthenCompany(props) {
    const getCurrentCompany = sessionStorage.getItem('company');
    const location = useLocation();
    return (
        //tạm thời chưa có accessToken,roles cụ thể, user,psw nên check tạm có get ra data
        getCurrentCompany ?   <Outlet/> : <Navigate to="/cong-ty/dang-nhap" state={{from: location}} replace/> 
    );
}

export default AuthenCompany;