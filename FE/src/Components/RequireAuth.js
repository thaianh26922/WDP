import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function RequireAuth(props) {
    const accessToken = Cookies.get("accessToken") || '';
    const getCurrentUser = useSelector((state) => state.users.currentUser);
    console.log(getCurrentUser);
    sessionStorage.setItem('user', JSON.stringify(getCurrentUser));
    const location = useLocation();
    return (
        accessToken && jwtDecode(accessToken)?.exp > Math.floor(Date.now() / 1000) ? <Outlet /> : <Navigate to="/dang-nhap" state={{ from: location }} replace />
    );
}

export default RequireAuth;