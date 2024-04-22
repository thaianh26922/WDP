import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../../Styles/breadcrumbStyle.css'
function Breadcrumb({ text1, text2, text3 }) {
    return (
        <ul className="breadcrumbb-list text-sm">
            <li className="breadcrumbb-item inline-block">
                <NavLink to="/trang-chu">{text1 || 'Trang chủ'}</NavLink>
            </li>
            {text3 ? <li className="breadcrumbb-item inline-block">
                <NavLink className="" to="/"><span className='font-bold text-gray-300'>{text3}</span>
                </NavLink>
            </li> : ''}
        </ul>

    );
}

export default Breadcrumb;