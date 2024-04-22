import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function AuthenHRManager(props) {
    const hrManager = sessionStorage.getItem('HRManager');
    const location = useLocation();
    return (
        //tạm thời chưa có accessToken,roles cụ thể, user,psw nên check tạm có get ra data
        hrManager ?   <Outlet/> : <Navigate to="/nhan-vien/dang-nhap" state={{from: location}} replace/> 
    );
}

export default AuthenHRManager;