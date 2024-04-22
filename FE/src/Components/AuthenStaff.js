import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function AuthenStaff(props) {
    const getCurrentCompany = sessionStorage.getItem('staff');
    const location = useLocation();
    return (
        //tạm thời chưa có accessToken,roles cụ thể, user,psw nên check tạm có get ra data
        getCurrentCompany ?   <Outlet/> : <Navigate to="/nhan-vien/dang-nhap" state={{from: location}} replace/> 
    );
}

export default AuthenStaff;